"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function AnalyzeButton({ listingId, hasScore }: { listingId: string; hasScore: boolean }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function analyze() {
    setLoading(true)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      })

      if (res.status === 402) {
        toast.error("You've used all 3 free analyses.", {
          description: "Upgrade to Pro to analyze unlimited listings.",
          action: { label: "Upgrade →", onClick: () => router.push("/upgrade") },
          duration: 6000,
        })
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? "Analysis failed")
      }

      toast.success("Analysis complete — your score is ready.")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full text-xs border-gray-200 hover:border-brand/40 hover:text-brand hover:bg-brand-light transition-colors"
      onClick={analyze}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin inline-block" />
          Analyzing…
        </span>
      ) : hasScore ? (
        "Re-analyze"
      ) : (
        "Analyze listing"
      )}
    </Button>
  )
}
