import Link from "next/link"
import { Zap, ArrowRight } from "lucide-react"

const FREE_LIMIT = 3

export function UsageBanner({ count, plan }: { count: number; plan: string }) {
  if (plan === "pro") return null

  const remaining = FREE_LIMIT - count
  const isAtLimit = remaining <= 0
  const isNearLimit = remaining === 1

  if (isAtLimit) {
    return (
      <div className="rounded-2xl overflow-hidden border border-amber-200">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-brand to-brand-hover" />
        <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">You've used all 3 free analyses</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                Upgrade to Pro to score every listing, fix every gap, and generate content — no limits.
              </p>
            </div>
          </div>
          <Link
            href="/upgrade"
            className="shrink-0 flex items-center gap-2 bg-brand hover:bg-brand-hover text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            Upgrade to Pro
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl px-4 py-2.5 flex items-center gap-3 border w-fit ${
      isNearLimit
        ? "bg-amber-50 border-amber-200"
        : "bg-white border-warm-border"
    }`}>
      {/* Progress dots */}
      <div className="flex gap-1">
        {Array.from({ length: FREE_LIMIT }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < count
                ? isNearLimit ? "bg-amber-400" : "bg-brand"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${isNearLimit ? "text-amber-700" : "text-gray-600"}`}>
        <span className="font-semibold">{count}/{FREE_LIMIT}</span> free analyses used
        {isNearLimit && <span className="font-semibold"> · last one remaining</span>}
      </p>
      <span className="text-gray-200">·</span>
      <Link
        href="/upgrade"
        className={`text-xs font-medium transition-colors whitespace-nowrap ${
          isNearLimit ? "text-amber-600 hover:text-amber-800" : "text-brand hover:text-brand-hover"
        }`}
      >
        Upgrade for unlimited →
      </Link>
    </div>
  )
}
