import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generateListingContent } from "@/lib/claude"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  const isAdmin = process.env.ADMIN_USER_ID === user.id
  if (!isAdmin && user.plan !== "pro") {
    return Response.json({ error: "pro_required" }, { status: 402 })
  }

  const { productName, category, keywords, tone, listingId } = await request.json()

  let existingTitle: string | undefined
  let existingDescription: string | undefined

  if (listingId) {
    const listing = await prisma.listing.findFirst({
      where: { id: listingId, userId: session.user.id },
    })
    if (listing) {
      existingTitle = listing.title
      existingDescription = listing.description
    }
  }

  try {
    const result = await generateListingContent({
      productName,
      category,
      keywords,
      tone,
      existingTitle,
      existingDescription,
    })
    return Response.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[generate] error:", message)
    return Response.json({ error: "Content generation failed — please try again." }, { status: 500 })
  }
}
