"use client"

import { useState, useMemo } from "react"
import { ListingCard } from "@/components/listing-card"

type Filter = "all" | "unanalyzed" | "needs_work" | "good"
type Sort = "analyzed-first" | "score-asc" | "score-desc" | "newest"

interface Listing {
  id: string
  title: string
  imageUrls: string[]
  price: number
  score: number | null
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unanalyzed", label: "Not analyzed" },
  { value: "needs_work", label: "Needs work" },
  { value: "good", label: "Good" },
]

function count(listings: Listing[], filter: Filter): number {
  if (filter === "all") return listings.length
  if (filter === "unanalyzed") return listings.filter((l) => l.score === null).length
  if (filter === "needs_work") return listings.filter((l) => l.score !== null && l.score < 75).length
  if (filter === "good") return listings.filter((l) => l.score !== null && l.score >= 75).length
  return 0
}

export function DashboardListings({ listings }: { listings: Listing[] }) {
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<Sort>("analyzed-first")

  const displayed = useMemo(() => {
    let result = [...listings]

    // Filter
    if (filter === "unanalyzed") result = result.filter((l) => l.score === null)
    else if (filter === "needs_work") result = result.filter((l) => l.score !== null && l.score < 75)
    else if (filter === "good") result = result.filter((l) => l.score !== null && l.score >= 75)

    // Sort
    if (sort === "analyzed-first") {
      result.sort((a, b) => {
        if (a.score !== null && b.score === null) return -1
        if (a.score === null && b.score !== null) return 1
        if (a.score !== null && b.score !== null) return a.score - b.score
        return 0
      })
    } else if (sort === "score-asc") {
      result.sort((a, b) => (a.score ?? 101) - (b.score ?? 101))
    } else if (sort === "score-desc") {
      result.sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
    }
    // "newest" = original order from server

    return result
  }, [listings, filter, sort])

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-brand text-white"
                  : "bg-white border border-warm-border text-gray-500 hover:border-brand/30 hover:text-gray-800"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 tabular-nums ${filter === f.value ? "text-white/60" : "text-gray-400"}`}>
                {count(listings, f.value)}
              </span>
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="text-xs text-gray-500 border border-warm-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-brand/40 cursor-pointer"
        >
          <option value="analyzed-first">Analyzed first</option>
          <option value="score-asc">Score: low → high</option>
          <option value="score-desc">Score: high → low</option>
          <option value="newest">Newest first</option>
        </select>
      </div>

      {displayed.length === 0 ? (
        <div className="bg-white rounded-2xl border border-warm-border py-16 text-center px-6">
          <p className="text-sm font-medium text-gray-400">No listings match this filter.</p>
          <button
            onClick={() => setFilter("all")}
            className="mt-3 text-xs text-brand hover:text-brand-hover transition-colors font-medium"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
