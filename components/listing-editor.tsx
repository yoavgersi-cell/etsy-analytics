"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Sparkles, X, ChevronLeft, Rocket, Pencil, Plus, Loader2 } from "lucide-react"

interface Props {
  listingId: string
  hasAnalysis: boolean
  initialTitle: string
  initialDescription: string
  initialTags: string[]
}

type Step = "idle" | "generating" | "review" | "editing"

interface Improved {
  title: string
  description: string
  tags: string[]
}

// ── Diff helpers ──────────────────────────────────────────

function DiffField({ label, before, after }: { label: string; before: string; after: string }) {
  const changed = before.trim() !== after.trim()
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</span>
        {!changed && <span className="text-[10px] text-gray-300">unchanged</span>}
      </div>
      {changed ? (
        <div className="space-y-1.5">
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-gray-500 whitespace-pre-wrap leading-relaxed line-through decoration-red-300">
            {before}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">
            {after}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
          {before}
        </div>
      )}
    </div>
  )
}

function TagDiff({ before, after }: { before: string[]; after: string[] }) {
  const added = after.filter((t) => !before.includes(t))
  const removed = before.filter((t) => !after.includes(t))
  const kept = after.filter((t) => before.includes(t))
  const changed = added.length > 0 || removed.length > 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Tags</span>
        {changed ? (
          <span className="text-[10px] text-gray-400">
            {added.length > 0 && `+${added.length} added`}
            {added.length > 0 && removed.length > 0 && " · "}
            {removed.length > 0 && `${removed.length} removed`}
          </span>
        ) : (
          <span className="text-[10px] text-gray-300">unchanged</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {kept.map((t) => (
          <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{t}</span>
        ))}
        {removed.map((t) => (
          <span key={t} className="text-xs bg-red-50 text-red-400 px-2.5 py-1 rounded-full line-through">{t}</span>
        ))}
        {added.map((t) => (
          <span key={t} className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full border border-green-200 font-medium">
            + {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────

export function ListingEditor({
  listingId,
  hasAnalysis,
  initialTitle,
  initialDescription,
  initialTags,
}: Props) {
  const [step, setStep] = useState<Step>("idle")
  const [improved, setImproved] = useState<Improved | null>(null)
  const [pushing, setPushing] = useState(false)

  // editable fields (only used in "editing" step)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTags, setEditTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const router = useRouter()

  async function generate() {
    setStep("generating")
    try {
      const res = await fetch("/api/apply-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Failed to generate improvements")
        setStep("idle")
        return
      }
      setImproved(data.improved)
      setStep("review")
    } catch {
      toast.error("Network error — please try again")
      setStep("idle")
    }
  }

  function openEditor() {
    if (!improved) return
    setEditTitle(improved.title)
    setEditDescription(improved.description)
    setEditTags(improved.tags)
    setStep("editing")
  }

  function saveEdits() {
    setImproved({ title: editTitle, description: editDescription, tags: editTags })
    setStep("review")
  }

  function removeTag(tag: string) {
    setEditTags((prev) => prev.filter((t) => t !== tag))
  }

  function addTag() {
    const t = newTag.trim().toLowerCase()
    if (!t || editTags.includes(t) || editTags.length >= 13) return
    setEditTags((prev) => [...prev, t])
    setNewTag("")
  }

  async function push() {
    if (!improved) return
    setPushing(true)
    try {
      const res = await fetch(`/api/etsy/listings/${listingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: improved.title,
          description: improved.description,
          tags: improved.tags,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Failed to push to Etsy", { duration: 10000 })
        return
      }
      toast.success("Listing updated on Etsy!")
      setStep("idle")
      setImproved(null)
      router.refresh()
    } catch {
      toast.error("Network error — please try again")
    } finally {
      setPushing(false)
    }
  }

  // ── Idle ──
  if (step === "idle") {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={!hasAnalysis}
        title={hasAnalysis ? undefined : "Analyze this listing first to get recommendations"}
        className="w-full text-xs gap-1.5 border-brand/30 text-brand hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={generate}
      >
        <Sparkles className="w-3.5 h-3.5" />
        Apply Listifly recommendations
      </Button>
    )
  }

  // ── Generating ──
  if (step === "generating") {
    return (
      <div className="bg-white rounded-2xl border border-warm-border p-6 text-center space-y-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand mx-auto" />
        <p className="text-sm font-medium text-gray-700">Generating improvements…</p>
        <p className="text-xs text-gray-400">Listifly is rewriting your listing based on the analysis.</p>
      </div>
    )
  }

  // ── Review (diff view) ──
  if (step === "review" && improved) {
    return (
      <div className="bg-white rounded-2xl border border-brand/30 p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Review changes</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Listifly improved your listing based on the analysis. Review and push to Etsy.
            </p>
          </div>
          <button onClick={() => { setStep("idle"); setImproved(null) }} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 divide-y divide-gray-50">
          <DiffField label="Title" before={initialTitle} after={improved.title} />
          <div className="pt-5">
            <DiffField label="Description" before={initialDescription} after={improved.description} />
          </div>
          <div className="pt-5">
            <TagDiff before={initialTags} after={improved.tags} />
          </div>
        </div>

        <div className="flex gap-2 pt-1 border-t border-gray-50">
          <Button
            onClick={push}
            disabled={pushing}
            className="flex-1 bg-brand hover:bg-brand-hover text-white gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            {pushing ? "Pushing to Etsy…" : "Push to Etsy"}
          </Button>
          <Button
            variant="outline"
            onClick={openEditor}
            disabled={pushing}
            className="border-gray-200 gap-1.5 text-xs"
          >
            <Pencil className="w-3 h-3" />
            Edit first
          </Button>
        </div>
      </div>
    )
  }

  // ── Manual editing ──
  if (step === "editing") {
    return (
      <div className="bg-white rounded-2xl border border-warm-border p-6 space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep("review")} className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Fine-tune</h2>
            <p className="text-xs text-gray-400 mt-0.5">Adjust Listifly&apos;s suggestions before pushing.</p>
          </div>
          <button onClick={() => setStep("review")} className="ml-auto text-gray-300 hover:text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
            Title <span className="font-normal normal-case text-gray-400">({editTitle.length}/140)</span>
          </label>
          <input
            type="text"
            value={editTitle}
            maxLength={140}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Description</label>
          <textarea
            value={editDescription}
            rows={8}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 resize-y"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
            Tags <span className="font-normal normal-case text-gray-400">({editTags.length}/13)</span>
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {editTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                {tag}
                <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          {editTags.length < 13 && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                placeholder="Add a tag…"
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
              />
              <button onClick={addTag} className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={saveEdits} className="flex-1 bg-brand hover:bg-brand-hover text-white">
            Preview changes
          </Button>
          <Button variant="outline" onClick={() => setStep("review")} className="border-gray-200">
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return null
}
