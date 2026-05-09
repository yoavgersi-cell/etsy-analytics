import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { AnalyzeButton } from "@/components/analyze-button"
import { ListingEditor } from "@/components/listing-editor"
import { FileText, Tag, ImageIcon, Search, AlignLeft } from "lucide-react"

interface ScoreBreakdown {
  title: number
  description: number
  tags: number
  images: number
  seo: number
}

interface Suggestion {
  category: string
  issue: string
  fix: string
  severity: "high" | "medium" | "low"
}

const categoryIcon: Record<string, React.ElementType> = {
  title: FileText,
  description: AlignLeft,
  tags: Tag,
  images: ImageIcon,
  seo: Search,
}

const categoryLabel: Record<string, string> = {
  title: "Title",
  description: "Description",
  tags: "Tags",
  images: "Images",
  seo: "SEO",
}

function scoreColor(val: number) {
  if (val >= 75) return "#4ade80"  // green-400
  if (val >= 50) return "#fbbf24"  // amber-400
  return "#f87171"                  // red-400
}


const severityConfig = {
  high: { label: "High priority", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", text: "text-red-600" },
  medium: { label: "Medium priority", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-400", text: "text-amber-600" },
  low: { label: "Low priority", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-400", text: "text-blue-600" },
} as const

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const listing = await prisma.listing.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!listing) notFound()

  const breakdown = listing.scoreBreakdown as ScoreBreakdown | null
  const suggestions = listing.suggestions as Suggestion[] | null

  const sortedSuggestions = suggestions
    ? [...suggestions].sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.severity] ?? 3) - (order[b.severity] ?? 3)
      })
    : null

  // sort worst → best
  const sortedBreakdown = breakdown
    ? (Object.entries(breakdown) as [string, number][]).sort((a, b) => a[1] - b[1])
    : null

  const highCount = suggestions?.filter((s) => s.severity === "high").length ?? 0
  const score = listing.score ?? 0

  const scoreLabel =
    listing.score === null ? null
    : score >= 75 ? "Great — a few tweaks could push it higher."
    : score >= 50 ? "Good start — key areas need attention."
    : "Several improvements needed to rank well."

  const thumb = listing.imageUrls[0]
  const extraImages = listing.imageUrls.slice(1, 5)

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/dashboard" className="hover:text-gray-700 transition-colors">Dashboard</Link>
        <span>›</span>
        <span className="text-gray-700 truncate max-w-sm">{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left column ── */}
        <div className="space-y-4">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-warm-border bg-gray-50">
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              {thumb ? (
                <Image src={thumb} alt={listing.title} fill className="object-cover absolute inset-0" unoptimized />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-200" />
                </div>
              )}
            </div>
            {extraImages.length > 0 && (
              <div className="flex gap-1.5 p-2 bg-white border-t border-warm-border">
                {extraImages.map((url, i) => (
                  <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Listing info */}
          <div className="bg-white rounded-2xl border border-warm-border p-5 space-y-3">
            <h1 className="font-semibold text-gray-900 leading-snug text-sm">{listing.title}</h1>
            <p className="text-xl font-bold text-brand">${listing.price.toFixed(2)}</p>

            {listing.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {listing.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs rounded-full bg-gray-100 text-gray-600 border-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <AnalyzeButton listingId={listing.id} hasScore={listing.score !== null} />
          </div>

          {/* Content Writer CTA */}
          <Link
            href={`/tools/writer?listingId=${listing.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-brand-light border border-brand/30 text-brand hover:bg-brand/10 text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Rewrite with AI
          </Link>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 space-y-4">
          {listing.score !== null ? (
            <>
              {/* Score hero */}
              <div className="bg-ink rounded-2xl p-6">
                {/* Score number row */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="shrink-0 text-center">
                    <span
                      className="text-7xl font-extrabold leading-none tabular-nums"
                      style={{ color: scoreColor(score) }}
                    >
                      {listing.score}
                    </span>
                    <div className="text-white/30 text-xs mt-1">/ 100</div>
                  </div>
                  <div className="pt-2 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">Listing Score</div>
                    <p className="text-white/70 text-sm leading-snug">{scoreLabel}</p>
                    {highCount > 0 && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        {highCount} high-priority fix{highCount > 1 ? "es" : ""}
                      </div>
                    )}
                  </div>
                </div>

                {/* Breakdown bars */}
                {sortedBreakdown && (
                  <div className="space-y-3 pt-5 border-t border-white/10">
                    {sortedBreakdown.map(([key, val]) => {
                      const numVal = Number(val) || 0
                      const Icon = categoryIcon[key]
                      const color = scoreColor(numVal)
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-white/50 flex items-center gap-1.5">
                              {Icon && <Icon className="w-3 h-3" />}
                              {categoryLabel[key] ?? key}
                            </span>
                            <span className="font-bold tabular-nums" style={{ color }}>{numVal}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${numVal}%`, backgroundColor: color }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {sortedSuggestions && sortedSuggestions.length === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">This listing looks great!</p>
                    <p className="text-xs text-green-600 mt-0.5">No major improvements needed — keep maintaining quality content.</p>
                  </div>
                </div>
              )}
              {sortedSuggestions && sortedSuggestions.length > 0 && (
                <div className="bg-white rounded-2xl border border-warm-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-900">What to fix</h2>
                    <span className="text-xs text-gray-400">{sortedSuggestions.length} suggestions</span>
                  </div>
                  <div className="space-y-3">
                    {sortedSuggestions.map((s, i) => {
                      const cfg = severityConfig[s.severity] ?? severityConfig.low
                      const Icon = categoryIcon[s.category]
                      return (
                        <div key={i} className={`p-4 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            {Icon && <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {categoryLabel[s.category] ?? s.category}
                            </span>
                            <span className={`ml-auto flex items-center gap-1.5 text-xs font-medium ${cfg.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-800">{s.issue}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium text-gray-600">Fix: </span>
                            {s.fix}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-warm-border p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-base font-semibold text-gray-800 mb-1">Not analyzed yet</p>
              <p className="text-sm text-gray-400 mb-5 max-w-xs mx-auto">
                Get a score, category breakdown, and specific fixes to improve this listing&apos;s ranking.
              </p>
              <div className="flex justify-center">
                <AnalyzeButton listingId={listing.id} hasScore={false} />
              </div>
            </div>
          )}

          {/* Apply recommendations & push to Etsy */}
          <ListingEditor
            listingId={listing.id}
            hasAnalysis={listing.score !== null}
            initialTitle={listing.title}
            initialDescription={listing.description}
            initialTags={listing.tags}
          />

          {/* Description */}
          <div className="bg-white rounded-2xl border border-warm-border p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
