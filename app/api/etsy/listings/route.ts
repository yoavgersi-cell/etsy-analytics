import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getListings, getEtsyUser, getEtsyShop, refreshAccessToken } from "@/lib/etsy"

async function getFreshToken(user: {
  id: string
  accessToken: string
  refreshToken: string | null
  tokenExpiry: Date | null
}): Promise<string> {
  const isExpired = user.tokenExpiry ? user.tokenExpiry < new Date() : true
  if (!isExpired) return user.accessToken

  if (!user.refreshToken) throw new Error("Token expired and no refresh token available")

  console.log(`[sync] refreshing expired token for userId=${user.id}`)
  const refreshed = await refreshAccessToken(user.refreshToken)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token,
      tokenExpiry: new Date(Date.now() + refreshed.expires_in * 1000),
    },
  })

  return refreshed.access_token
}

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  let user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  // Refresh token if expired
  let accessToken: string
  try {
    accessToken = await getFreshToken(user)
  } catch (e) {
    console.error("[sync] token refresh failed", e)
    return Response.json({ error: "Session expired — please sign out and sign in again" }, { status: 401 })
  }

  // Fix missing etsyUserId or shopId by fetching from Etsy
  if (!user.shopId || !user.etsyUserId) {
    try {
      const etsyUser = await getEtsyUser(accessToken)
      const etsyUserId = String(etsyUser.user_id)
      console.log(`[sync] fetched etsyUserId=${etsyUserId} shopId=${etsyUser.shop_id}`)

      let shopName: string | null = null
      if (etsyUser.shop_id) {
        const shop = await getEtsyShop(String(etsyUser.shop_id), accessToken)
        shopName = shop.shop_name
      }

      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          etsyUserId,
          ...(etsyUser.shop_id && {
            shopId: String(etsyUser.shop_id),
            shopName,
          }),
        },
      })
    } catch (e) {
      console.error("[sync] failed to fetch user/shop info", e)
    }
  }

  if (!user.shopId) {
    return Response.json({ error: "No shop connected — please sign out and sign in again" }, { status: 400 })
  }

  try {
    const etsyListings = await getListings(user.shopId, accessToken)
    console.log(`[sync] fetched ${etsyListings.length} listings for shopId=${user.shopId}`)

    const results = await Promise.allSettled(
      etsyListings.map((l) =>
        prisma.listing.upsert({
          where: { userId_etsyListingId: { userId: user.id, etsyListingId: String(l.listing_id) } },
          update: {
            title: l.title,
            description: l.description,
            tags: l.tags,
            imageUrls: l.images?.map((i) => i.url_fullxfull) ?? [],
            price: l.price.amount / l.price.divisor,
          },
          create: {
            userId: user.id,
            etsyListingId: String(l.listing_id),
            title: l.title,
            description: l.description,
            tags: l.tags,
            imageUrls: l.images?.map((i) => i.url_fullxfull) ?? [],
            price: l.price.amount / l.price.divisor,
          },
        })
      )
    )

    const succeeded = results.filter((r) => r.status === "fulfilled").length
    const failed = results.filter((r) => r.status === "rejected").length
    if (failed > 0) console.error(`[sync] ${failed} listings failed to upsert`)

    return Response.json({ count: succeeded })
  } catch (e) {
    console.error("[sync] failed to fetch/save listings", e)
    return Response.json({ error: "Failed to sync listings — please try again" }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const listings = await prisma.listing.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return Response.json(listings)
}
