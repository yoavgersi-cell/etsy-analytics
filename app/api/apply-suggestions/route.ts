import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { applyListingImprovements } from "@/lib/claude"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { listingId } = await request.json()

  const listing = await prisma.listing.findFirst({
    where: { id: listingId, userId: session.user.id },
  })

  if (!listing) return Response.json({ error: "Listing not found" }, { status: 404 })
  if (!listing.suggestions) return Response.json({ error: "No suggestions yet — analyze the listing first" }, { status: 400 })

  const suggestions = listing.suggestions as { category: string; issue: string; fix: string; severity: "high" | "medium" | "low" }[]

  try {
    const improved = await applyListingImprovements({
      title: listing.title,
      description: listing.description,
      tags: listing.tags,
      suggestions,
    })
    return Response.json({ improved })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error("[apply-suggestions] error", msg)
    return Response.json({ error: "Failed to generate improvements — please try again" }, { status: 500 })
  }
}
