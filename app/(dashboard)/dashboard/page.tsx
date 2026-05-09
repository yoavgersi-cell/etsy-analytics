import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { SyncButton } from "@/components/sync-button"
import { DashboardListings } from "@/components/dashboard-listings"
import { UsageBanner } from "@/components/usage-banner"

interface Suggestion {
  category: string
  issue: string
  severity: "high" | "medium" | "low"
}

function ScoreDistributionBar({
  poor, fair, good, unanalyzed, total,
}: { poor: number; fair: number; good: number; unanalyzed: number; total: number }) {
  if (total === 0) return null
  const pct = (n: number) => `${Math.round((n / total) * 100)}%`
  return (
    <div className="space-y-2">
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        {poor > 0 && <div className="bg-red-400 rounded-l-full" style={{ width: pct(poor) }} />}
        {fair > 0 && <div className="bg-yellow-400" style={{ width: pct(fair) }} />}
        {good > 0 && <div className="bg-green-400" style={{ width: pct(good) }} />}
        {unanalyzed > 0 && <div className="bg-white/20 rounded-r-full flex-1" />}
      </div>
      <div className="flex gap-4 text-xs text-white/50">
        {poor > 0 && <span><span className="text-red-400 font-medium">{poor}</span> poor</span>}
        {fair > 0 && <span><span className="text-yellow-400 font-medium">{fair}</span> fair</span>}
        {good > 0 && <span><span className="text-green-400 font-medium">{good}</span> good</span>}
        {unanalyzed > 0 && <span><span className="text-white/60 font-medium">{unanalyzed}</span> not scored</span>}
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await auth()
  const [listings, user] = await Promise.all([
    prisma.listing.findMany({
      where: { userId: session!.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({ where: { id: session!.user.id } }),
  ])

  const analyzed = listings.filter((l) => l.score !== null)
  const avgScore = analyzed.length
    ? Math.round(analyzed.reduce((sum, l) => sum + (l.score ?? 0), 0) / analyzed.length)
    : null

  const poor = analyzed.filter((l) => (l.score ?? 0) < 60)
  const fair = analyzed.filter((l) => (l.score ?? 0) >= 60 && (l.score ?? 0) < 75)
  const good = analyzed.filter((l) => (l.score ?? 0) >= 75)
  const unanalyzed = listings.filter((l) => l.score === null)

  // Priority: poor listings sorted by score ascending, or lowest of analyzed if none poor
  const priorityListings = poor.length > 0
    ? poor.sort((a, b) => (a.score ?? 0) - (b.score ?? 0)).slice(0, 3)
    : []

  return (
    <div className="space-y-6">

      {/* Usage banner */}
      <UsageBanner count={user?.analysisCount ?? 0} plan={user?.plan ?? "free"} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {session!.user.shopName ?? "Your Shop"}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {listings.length} listings synced
            {analyzed.length > 0 && ` · ${analyzed.length} of ${listings.length} analyzed`}
          </p>
        </div>
        <SyncButton />
      </div>

      {/* Empty state */}
      {listings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-warm-border py-20 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Import your listings</h2>
          <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
            Connect your Etsy shop and we'll pull in all your active listings — ready to score, rank, and improve.
          </p>
          <SyncButton />
          <p className="text-xs text-gray-300 mt-4">Takes about 10 seconds · Read-only access</p>
        </div>
      ) : (
        <>
          {/* Shop health card — dark, prominent */}
          <div className="bg-ink rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8">

              {/* Score */}
              <div className="shrink-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
                  Shop score
                </div>
                {avgScore !== null ? (
                  <div className="flex items-end gap-2">
                    <span className={`text-6xl font-extrabold leading-none ${
                      avgScore >= 75 ? "text-green-400"
                      : avgScore >= 50 ? "text-yellow-400"
                      : "text-red-400"
                    }`}>
                      {avgScore}
                    </span>
                    <span className="text-white/30 text-xl mb-1">/100</span>
                  </div>
                ) : (
                  <div className="text-5xl font-extrabold text-white/20 leading-none">—</div>
                )}
                <p className="text-xs text-white/40 mt-2">
                  {avgScore === null
                    ? "Analyze listings to get your score"
                    : avgScore >= 75
                    ? "Your shop is ranking well"
                    : avgScore >= 50
                    ? "Room to improve — check priorities"
                    : "Several listings need urgent fixes"}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-white/10 self-stretch" />

              {/* Distribution + progress */}
              <div className="flex-1 space-y-5">
                <ScoreDistributionBar
                  poor={poor.length}
                  fair={fair.length}
                  good={good.length}
                  unanalyzed={unanalyzed.length}
                  total={listings.length}
                />

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs text-white/40 mb-1.5">
                    <span>Analysis progress</span>
                    <span>{analyzed.length} / {listings.length} listings</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full transition-all"
                      style={{ width: `${listings.length ? (analyzed.length / listings.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority queue */}
          {priorityListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Fix these first</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Lowest-scoring listings — highest impact on your rankings</p>
                </div>
                <span className="text-xs text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full font-medium">
                  {poor.length} need{poor.length === 1 ? "s" : ""} attention
                </span>
              </div>

              <div className="space-y-2">
                {priorityListings.map((listing) => {
                  const suggestions = listing.suggestions as Suggestion[] | null
                  const topIssue = suggestions?.find((s) => s.severity === "high") ?? suggestions?.[0]
                  const thumb = listing.imageUrls[0]

                  return (
                    <Link
                      key={listing.id}
                      href={`/listings/${listing.id}`}
                      className="flex items-center gap-4 bg-white border border-warm-border rounded-2xl p-4 hover:border-brand/30 hover:shadow-sm transition-all group"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {thumb ? (
                          <Image src={thumb} alt={listing.title} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-brand transition-colors">
                          {listing.title}
                        </p>
                        {topIssue && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {topIssue.issue}
                          </p>
                        )}
                      </div>

                      {/* Score */}
                      <div className="shrink-0 flex items-center gap-3">
                        <span className="text-sm font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                          {listing.score}
                        </span>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* All listings */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">All listings</h2>
            <DashboardListings
              listings={listings.map((l) => ({
                id: l.id,
                title: l.title,
                imageUrls: l.imageUrls,
                price: l.price,
                score: l.score,
              }))}
            />
          </div>
        </>
      )}
    </div>
  )
}
