import Link from "next/link"
import Image from "next/image"

interface Listing {
  id: string
  title: string
  imageUrls: string[]
  price: number
  score: number | null
}

function scoreMeta(score: number | null) {
  if (score === null) return { label: "Unscored", bg: "bg-gray-800/70", text: "text-white/70", dot: "" }
  if (score >= 75) return { label: "Good", bg: "bg-green-500", text: "text-white", dot: "" }
  if (score >= 50) return { label: "Fair", bg: "bg-yellow-400", text: "text-gray-900", dot: "" }
  return { label: "Poor", bg: "bg-red-500", text: "text-white", dot: "" }
}

export function ListingCard({ listing }: { listing: Listing }) {
  const thumb = listing.imageUrls[0]
  const meta = scoreMeta(listing.score)

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block bg-white rounded-2xl border border-warm-border overflow-hidden hover:shadow-lg hover:border-brand/25 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Image with score overlay */}
      <div className="relative h-48 bg-gray-50">
        {thumb ? (
          <Image
            src={thumb}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Score badge — top right */}
        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 ${meta.bg} ${meta.text} text-xs font-bold px-2 py-1 rounded-lg shadow-sm`}>
          {listing.score !== null ? (
            <>{listing.score}<span className="font-normal opacity-70 text-[10px]">/100</span></>
          ) : (
            <span className="font-medium text-[10px] tracking-wide uppercase">Score</span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 group-hover:text-brand line-clamp-2 text-sm leading-snug transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-sm font-bold text-gray-800">${listing.price.toFixed(2)}</span>
          <span className={`text-[11px] font-semibold tracking-wide ${
            listing.score === null ? "text-gray-400" :
            listing.score >= 75 ? "text-green-600" :
            listing.score >= 50 ? "text-yellow-600" :
            "text-red-600"
          }`}>
            {meta.label}
          </span>
        </div>
      </div>
    </Link>
  )
}
