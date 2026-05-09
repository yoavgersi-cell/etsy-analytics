"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Sparkles, Copy, Check, ClipboardList, Lock } from "lucide-react"
import Link from "next/link"

interface GeneratedContent {
  titles: string[]
  description: string
  tags: string[]
}

function CopyButton({ text, size = "sm" }: { text: string; size?: "sm" | "icon" }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied!")
    setTimeout(() => setCopied(false), 1500)
  }
  if (size === "icon") {
    return (
      <button onClick={copy} className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-brand-light transition-colors">
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    )
  }
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${
        copied ? "text-green-600 bg-green-50" : "text-brand hover:bg-brand-light"
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export default function WriterPage() {
  const searchParams = useSearchParams()
  const listingId = searchParams.get("listingId")
  const router = useRouter()

  const [form, setForm] = useState({
    productName: "",
    category: "",
    keywords: "",
    tone: "professional",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [selectedTitle, setSelectedTitle] = useState(0)

  useEffect(() => {
    if (!listingId) return
    fetch(`/api/etsy/listings/${listingId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.title) setForm((f) => ({ ...f, productName: data.title }))
      })
      .catch(() => {})
  }, [listingId])

  async function generate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setSelectedTitle(0)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, listingId }),
      })
      const data = await res.json()
      if (res.status === 402) {
        toast.error("Content Writer is a Pro feature.", {
          description: "Upgrade to generate unlimited titles, descriptions, and tags.",
          action: { label: "Upgrade →", onClick: () => router.push("/upgrade") },
          duration: 8000,
        })
        return
      }
      if (!res.ok) throw new Error(data.error ?? "Generation failed")
      setResult(data)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function copyAll() {
    if (!result) return
    const text = [
      "TITLE:",
      result.titles[selectedTitle],
      "",
      "DESCRIPTION:",
      result.description,
      "",
      "TAGS:",
      result.tags.join(", "),
    ].join("\n")
    navigator.clipboard.writeText(text)
    toast.success("All content copied!")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Content Writer</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Generate SEO-optimized titles, descriptions, and all 13 tags for your Etsy listing.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-warm-border p-6">
        <form onSubmit={generate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="productName" className="text-sm font-medium text-gray-700">
                Product name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="productName"
                placeholder="e.g. Hand-painted ceramic mug"
                value={form.productName}
                onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                className="rounded-xl"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category <span className="text-red-400">*</span>
              </Label>
              <Input
                id="category"
                placeholder="e.g. Kitchen & Dining"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">
              Target keywords
              <span className="text-gray-400 font-normal ml-1">· optional but recommended</span>
            </Label>
            <Input
              id="keywords"
              placeholder="e.g. handmade mug, pottery gift, ceramic coffee cup"
              value={form.keywords}
              onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Tone</Label>
            <Select
              value={form.tone}
              onValueChange={(v: string | null) => setForm((f) => ({ ...f, tone: v ?? f.tone }))}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional — clear and trustworthy</SelectItem>
                <SelectItem value="casual">Casual — friendly and approachable</SelectItem>
                <SelectItem value="playful">Playful — fun and energetic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-hover text-white rounded-xl h-11 text-sm font-semibold gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate content
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Generated content</h2>
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 text-sm text-brand hover:text-brand-hover font-medium border border-brand/30 hover:border-brand/60 hover:bg-brand-light px-3 py-1.5 rounded-lg transition-colors"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Copy selected
            </button>
          </div>

          {/* Titles */}
          <div className="bg-white rounded-2xl border border-warm-border p-5 space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-800">Title options</h3>
              <span className="text-xs text-gray-400">Click to select · then copy selected</span>
            </div>
            {result.titles.map((title, i) => (
              <div
                key={i}
                onClick={() => setSelectedTitle(i)}
                className={`flex items-start justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedTitle === i
                    ? "border-brand/40 bg-brand-light ring-1 ring-brand/20"
                    : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    selectedTitle === i ? "border-brand bg-brand" : "border-gray-300"
                  }`}>
                    {selectedTitle === i && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />}
                  </span>
                  <p className="text-sm text-gray-800 leading-snug">
                    {title}
                    <span className="ml-2 text-[10px] text-gray-400">{title.length}/140</span>
                  </p>
                </div>
                <CopyButton text={title} size="icon" />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Description</h3>
              <CopyButton text={result.description} />
            </div>
            <Textarea
              value={result.description}
              readOnly
              className="min-h-44 text-sm resize-none rounded-xl bg-gray-50 border-warm-border"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-800">Tags</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  result.tags.length === 13 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {result.tags.length}/13
                </span>
              </div>
              <CopyButton text={result.tags.join(", ")} />
            </div>
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag) => (
                <span key={tag} className="text-xs bg-surface border border-warm-border text-gray-700 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
