import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { analyzeListing } from "@/lib/claude"

const FREE_LIMIT = 3

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { listingId } = await request.json()

  const [listing, user] = await Promise.all([
    prisma.listing.findFirst({ where: { id: listingId, userId: session.user.id } }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ])

  if (!listing) return Response.json({ error: "Listing not found" }, { status: 404 })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  // Enforce free tier — only first-time analyses count toward the limit
  const isAdmin = process.env.ADMIN_USER_ID === user.id
  const isFirstAnalysis = listing.score === null
  if (!isAdmin && user.plan === "free" && isFirstAnalysis && user.analysisCount >= FREE_LIMIT) {
    console.log(`[analyze] limit_reached userId=${user.id} count=${user.analysisCount}`)
    return Response.json({ error: "limit_reached" }, { status: 402 })
  }

  console.log(`[analyze] start listingId=${listingId} userId=${user.id} plan=${user.plan}`)

  try {
    const result = await analyzeListing({
      title: listing.title,
      description: listing.description,
      tags: listing.tags,
      price: listing.price,
      imageUrls: listing.imageUrls,
    })

    await Promise.all([
      prisma.listing.update({
        where: { id: listingId },
        data: {
          score: result.score,
          scoreBreakdown: result.breakdown as object,
          suggestions: result.suggestions as object[],
          analyzedAt: new Date(),
        },
      }),
      isFirstAnalysis
        ? prisma.user.update({
            where: { id: session.user.id },
            data: { analysisCount: { increment: 1 } },
          })
        : Promise.resolve(),
    ])

    console.log(`[analyze] done listingId=${listingId} score=${result.score}`)
    return Response.json({ success: true, score: result.score })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[analyze] error listingId=${listingId}: ${message}`, err)
    return Response.json({ error: "Analysis failed. Please try again.", detail: message }, { status: 500 })
  }
}
