"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SyncButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function sync() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/etsy/listings", { method: "POST" })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? `Error ${res.status}`)
        return
      }
      router.refresh()
    } catch (e) {
      setError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={sync} disabled={loading} className="bg-brand hover:bg-brand-hover text-white">
        {loading ? "Syncing…" : "Sync Listings"}
      </Button>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
