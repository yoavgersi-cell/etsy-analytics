import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { updateEtsyListing, refreshAccessToken } from "@/lib/etsy"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const listing = await prisma.listing.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true, title: true, description: true, tags: true, price: true },
  })

  if (!listing) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(listing)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json() as { title?: string; description?: string; tags?: string[] }

  const [listing, user] = await Promise.all([
    prisma.listing.findFirst({ where: { id, userId: session.user.id } }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ])

  if (!listing) return Response.json({ error: "Listing not found" }, { status: 404 })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })
  if (!user.shopId) return Response.json({ error: "No shop connected — please sign out and sign back in" }, { status: 400 })

  // Refresh token if needed
  let accessToken = user.accessToken
  const tokenExpired = user.tokenExpiry ? user.tokenExpiry < new Date() : false
  if (tokenExpired && user.refreshToken) {
    try {
      const refreshed = await refreshAccessToken(user.refreshToken)
      accessToken = refreshed.access_token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          tokenExpiry: new Date(Date.now() + refreshed.expires_in * 1000),
        },
      })
    } catch {
      return Response.json({ error: "Session expired — please sign out and sign back in" }, { status: 401 })
    }
  }

  try {
    await updateEtsyListing(listing.etsyListingId, user.shopId, accessToken, body)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[update listing] etsy error", msg)

    return Response.json({ error: `Etsy error: ${msg}` }, { status: 500 })
  }

  // Persist locally
  const updated = await prisma.listing.update({
    where: { id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.tags && { tags: body.tags }),
    },
  })

  return Response.json({ success: true, listing: updated })
}
