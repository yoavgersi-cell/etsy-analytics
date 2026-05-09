import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface ScoreBreakdown {
  title: number
  description: number
  tags: number
  images: number
  seo: number
}

export interface Suggestion {
  category: string
  issue: string
  fix: string
  severity: "high" | "medium" | "low"
}

export interface AnalysisResult {
  score: number
  breakdown: ScoreBreakdown
  suggestions: Suggestion[]
}

export interface GeneratedContent {
  titles: string[]
  description: string
  tags: string[]
}

export interface ImprovedListing {
  title: string
  description: string
  tags: string[]
}

export async function applyListingImprovements(listing: {
  title: string
  description: string
  tags: string[]
  suggestions: Suggestion[]
}): Promise<ImprovedListing> {
  const suggestionText = listing.suggestions
    .map((s) => `- [${s.severity.toUpperCase()}] ${s.category}: ${s.issue} → Fix: ${s.fix}`)
    .join("\n")

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    tools: [
      {
        name: "submit_improved_listing",
        description: "Submit the improved listing content",
        input_schema: {
          type: "object" as const,
          properties: {
            title: { type: "string", description: "Improved title, max 140 chars" },
            description: { type: "string", description: "Improved description" },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "Exactly 13 tags, each max 20 chars",
            },
          },
          required: ["title", "description", "tags"],
        },
      },
    ],
    tool_choice: { type: "tool" as const, name: "submit_improved_listing" },
    messages: [
      {
        role: "user",
        content: `You are an Etsy SEO expert. Rewrite this listing to fix the identified issues. Keep the product the same — only improve the copy, keywords, and structure.

CURRENT TITLE:
${listing.title}

CURRENT DESCRIPTION:
${listing.description}

CURRENT TAGS:
${listing.tags.join(", ")}

ISSUES TO FIX:
${suggestionText}

Rules:
- Title: max 140 chars, front-load the best keywords
- Description: keep the same product info but improve structure, keywords, and clarity
- Tags: exactly 13 tags, each max 20 chars, use high-search-volume Etsy keywords
- Do NOT change the product name, price, or factual details`,
      },
    ],
  })

  const toolBlock = response.content.find((b) => b.type === "tool_use")
  if (!toolBlock || toolBlock.type !== "tool_use") throw new Error("No tool use in Claude response")
  return toolBlock.input as ImprovedListing
}

async function fetchImageAsBase64(url: string): Promise<{ data: string; mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" } | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const contentType = res.headers.get("content-type") ?? "image/jpeg"
    const mediaType = (["image/jpeg", "image/png", "image/gif", "image/webp"].includes(contentType)
      ? contentType
      : "image/jpeg") as "image/jpeg" | "image/png" | "image/gif" | "image/webp"
    const buffer = await res.arrayBuffer()
    const data = Buffer.from(buffer).toString("base64")
    return { data, mediaType }
  } catch {
    return null
  }
}

export async function analyzeListing(listing: {
  title: string
  description: string
  tags: string[]
  price: number
  imageUrls: string[]
}): Promise<AnalysisResult> {
  const images = await Promise.all(listing.imageUrls.slice(0, 1).map(fetchImageAsBase64))
  const imageContent: Anthropic.ContentBlockParam[] = images
    .filter((img): img is NonNullable<typeof img> => img !== null)
    .map((img) => ({
      type: "image" as const,
      source: { type: "base64" as const, media_type: img.mediaType, data: img.data },
    }))

  const textContent = {
    type: "text" as const,
    text: `Analyze this Etsy listing for SEO and conversion quality. Score each category 0-100 and provide specific, actionable suggestions. Call the submit_analysis tool with your results.

Title: ${listing.title}
Description: ${listing.description}
Tags: ${listing.tags.join(", ")}
Price: $${listing.price}`,
  }

  const content: Anthropic.ContentBlockParam[] = [
    ...imageContent,
    textContent,
  ]

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8096,
    tools: [
      {
        name: "submit_analysis",
        description: "Submit the structured listing analysis result",
        input_schema: {
          type: "object" as const,
          properties: {
            score: { type: "number", description: "Overall score 0-100" },
            breakdown: {
              type: "object",
              properties: {
                title: { type: "number" },
                description: { type: "number" },
                tags: { type: "number" },
                images: { type: "number" },
                seo: { type: "number" },
              },
              required: ["title", "description", "tags", "images", "seo"],
            },
            suggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string", enum: ["title", "description", "tags", "images", "seo"] },
                  issue: { type: "string" },
                  fix: { type: "string" },
                  severity: { type: "string", enum: ["high", "medium", "low"] },
                },
                required: ["category", "issue", "fix", "severity"],
              },
            },
          },
          required: ["score", "breakdown", "suggestions"],
        },
      },
    ],
    tool_choice: { type: "tool" as const, name: "submit_analysis" },
    messages: [{ role: "user", content }],
  })

  const toolBlock = response.content.find((b) => b.type === "tool_use")
  if (!toolBlock || toolBlock.type !== "tool_use") throw new Error("No tool use in Claude response")
  return toolBlock.input as AnalysisResult
}

export async function generateListingContent(params: {
  productName: string
  category: string
  keywords: string
  tone: string
  existingTitle?: string
  existingDescription?: string
}): Promise<GeneratedContent> {
  const context = params.existingTitle
    ? `\nBase on this existing listing:\nTitle: ${params.existingTitle}\nDescription: ${params.existingDescription}`
    : ""

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate optimized Etsy listing content for:
Product: ${params.productName}
Category: ${params.category}
Target Keywords: ${params.keywords}
Tone: ${params.tone}${context}

Return ONLY valid JSON:
{
  "titles": ["<title 1>", "<title 2>", "<title 3>"],
  "description": "<full description with SEO, 150-300 words>",
  "tags": ["<tag1>", "<tag2>", ...<exactly 13 tags>]
}

Rules:
- Titles: max 140 chars, include keywords naturally
- Description: engaging, keyword-rich, clear benefits
- Tags: exactly 13, single words or short phrases, Etsy-searchable`,
      },
    ],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("No JSON in Claude response")
  return JSON.parse(jsonMatch[0])
}
