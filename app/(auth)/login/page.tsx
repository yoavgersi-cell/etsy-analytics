"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Star, TrendingUp, Eye, ShieldCheck, Search, Tag, BarChart3, AlertCircle } from "lucide-react"

function CTA({ label = "See how my listings are doing →" }: { label?: string }) {
  return (
    <Button
      size="lg"
      onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
      className="bg-brand hover:bg-brand-hover text-white text-[15px] px-8 py-6 rounded-full font-semibold tracking-tight shadow-sm"
    >
      {label}
    </Button>
  )
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const isGood = score >= 70
  return (
    <div className={`text-center py-5 rounded-2xl border ${isGood ? "bg-brand-light border-brand/20" : "bg-gray-50 border-gray-100"}`}>
      <span className={`text-5xl font-bold tracking-tight ${isGood ? "text-brand" : "text-gray-300"}`}>{score}</span>
      <p className={`text-xs mt-1 font-medium ${isGood ? "text-brand-muted" : "text-gray-400"}`}>{label}</p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-border">
        <nav className="px-6 h-16 flex items-center justify-between max-w-6xl mx-auto">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ListiflyLogo size={26} />
            <span className="font-bold text-gray-900 tracking-tight text-[15px]">Listifly</span>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
              { label: "Results", href: "#results" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right: sign in + CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
              className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
              className="bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Start free →
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6">

        {/* Background: soft radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, oklch(0.38 0.15 248 / 0.09) 0%, transparent 65%)" }} />
        </div>

        {/* Full-width container */}
        <div className="relative z-10 max-w-[1280px] mx-auto">

          {/* Single unified row: left float | center | right float */}
          <div className="flex items-center gap-6 xl:gap-10">

            {/* ── Left float column ── */}
            <div className="hidden lg:flex flex-col gap-4 w-56 xl:w-60 shrink-0">

              {/* Score card */}
              <div className="bg-white border border-warm-border rounded-2xl shadow-md p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Listing score</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-200 leading-none">42</div>
                    <div className="text-[10px] text-gray-400 mt-1">Before</div>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-200 to-brand rounded-full" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand leading-none">89</div>
                    <div className="text-[10px] text-brand-muted mt-1">After</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-warm-border space-y-1.5">
                  {["Title rewritten", "13/13 tags filled", "Keywords added"].map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <CheckCircle2 className="w-3 h-3 text-brand shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>

              {/* +68% badge */}
              <div className="bg-white border border-warm-border rounded-2xl shadow-md p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 leading-none">+68%</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">more views / mo</div>
                </div>
              </div>
            </div>

            {/* ── Center: headline + CTA + preview card ── */}
            <div className="flex-1 flex flex-col items-center text-center min-w-0">
              <h1 className="text-[2.6rem] sm:text-[3.4rem] xl:text-[3.8rem] font-bold text-gray-900 leading-[1.07] tracking-tight mb-5">
                Your listings are losing sales
                <br className="hidden sm:block" />
                <span className="text-brand"> to fixable problems.</span>
              </h1>
              <p className="text-[17px] text-gray-500 max-w-[420px] mx-auto mb-8 leading-relaxed">
                Listifly scores every listing, shows exactly what&apos;s wrong, and rewrites it — ready to push live in one click.
              </p>
              <div className="flex flex-col items-center gap-3 mb-10">
                <CTA label="Find my listing problems free →" />
                <p className="text-sm text-gray-400">First 3 free · No credit card · You approve every change</p>
              </div>

              {/* Before/after preview card — below CTA */}
              <div className="w-full max-w-lg bg-white border border-warm-border rounded-3xl shadow-[0_8px_40px_oklch(0_0_0/0.08)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-warm-border bg-surface">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score preview</p>
                  <span className="text-[10px] font-semibold text-brand bg-brand-light border border-brand/20 px-2.5 py-1 rounded-full">Fixed in under a minute</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-warm-border">
                  <div className="px-5 py-7 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Before</p>
                    <div className="text-[64px] font-bold text-gray-200 leading-none tracking-tight tabular-nums">42</div>
                    <div className="mt-3 space-y-1">
                      {["Missing 6 tags", "Title too generic", "No buyer keywords"].map(item => (
                        <div key={item} className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 shrink-0" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-7 text-center bg-brand-light/30">
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2">After</p>
                    <div className="text-[64px] font-bold text-brand leading-none tracking-tight tabular-nums">89</div>
                    <div className="mt-3 space-y-1">
                      {["All 13 tags filled", "Title rewritten", "Keywords added"].map(item => (
                        <div key={item} className="flex items-center justify-center gap-1.5 text-[11px] text-brand-muted">
                          <CheckCircle2 className="w-3 h-3 text-brand shrink-0" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right float column ── */}
            <div className="hidden lg:flex flex-col gap-4 w-56 xl:w-60 shrink-0">

              {/* Keyword card */}
              <div className="bg-white border border-warm-border rounded-2xl shadow-md p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Top keywords</p>
                <div className="space-y-2">
                  {[
                    { kw: "gift for her",   vol: "High" },
                    { kw: "birthday gift",  vol: "High" },
                    { kw: "custom mug",     vol: "Med"  },
                  ].map(({ kw, vol }) => (
                    <div key={kw} className="flex items-center justify-between text-[12px]">
                      <span className="text-gray-700 font-medium">{kw}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${vol === "High" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{vol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social proof */}
              <div className="bg-white border border-warm-border rounded-2xl shadow-md p-4">
                <div className="flex -space-x-2 mb-3">
                  {["SK", "MT", "PR", "JL", "AK"].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-brand-light border-2 border-white text-brand-muted text-[9px] font-bold flex items-center justify-center">{init}</div>
                  ))}
                </div>
                <p className="text-[12px] text-gray-600 leading-snug">
                  <span className="font-bold text-gray-900">4,000+ sellers</span><br />improving their listings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="features" className="bg-surface border-y border-warm-border py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">What goes wrong</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Buyers can&apos;t find you.<br />Here&apos;s why.
            </h2>
            <p className="text-gray-600 leading-relaxed text-[16px]">
              Most Etsy listings have the same fixable problems. They don&apos;t show up in search — not because the product is wrong, but because the listing is.
            </p>
          </div>

          {/* Top row: 2 dominant cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

            {/* Card 1 — Title problem with before/after */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <p className="font-bold text-gray-900 text-[16px] mb-2 leading-snug">
                Your title describes the product.<br />Buyers don&apos;t search that way.
              </p>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                Buyers search by occasion, feeling, or use — not by what the item is. If your title says what it is instead of what it&apos;s for, you&apos;re invisible.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-semibold text-red-400 w-14 shrink-0">✕ Before</span>
                  <span className="bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-lg font-mono text-[12px]">Ceramic mug handmade</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-semibold text-brand w-14 shrink-0">✓ After</span>
                  <span className="bg-brand-light border border-brand/20 text-brand-muted px-3 py-1.5 rounded-lg font-mono text-[12px]">Gift for coffee lover birthday</span>
                </div>
              </div>
            </div>

            {/* Card 2 — Tags with visual proof */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <p className="font-bold text-gray-900 text-[16px] mb-2 leading-snug">
                You have 13 tag slots.<br />Most sellers waste 5 or 6 of them.
              </p>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                Every empty slot is a search you can&apos;t rank for. And the tags you do use are often too broad — &quot;handmade&quot; and &quot;gift&quot; don&apos;t match how buyers actually search.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["personalized gift", "wedding favor", "custom mug", "coffee lover"].map((tag) => (
                  <span key={tag} className="text-[11px] bg-brand-light border border-brand/20 text-brand-muted px-2.5 py-1 rounded-full font-medium">{tag}</span>
                ))}
                {["handmade", "gift", "mug"].map((tag) => (
                  <span key={tag} className="text-[11px] bg-gray-100 border border-gray-200 text-gray-400 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-[11px] bg-gray-50 border border-dashed border-gray-200 text-gray-300 px-2.5 py-1 rounded-full">empty</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: 2 secondary cards — less emphasis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="font-semibold text-gray-800 text-[14px] mb-1.5 leading-snug">Your description doesn&apos;t help Etsy rank you</p>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                Etsy reads your description to understand what the listing is for. Vague copy means Etsy guesses — and it usually guesses wrong.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
              <p className="font-semibold text-gray-800 text-[14px] mb-1.5 leading-snug">Your listing shows up for the wrong searches</p>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                When buyers who aren&apos;t a match see your listing and don&apos;t click, your ranking quietly drops. Bad impressions compound over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: headline */}
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">How it works</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Connect. See what&apos;s wrong.<br />Fix it in one click.
            </h2>
            <p className="text-gray-500 leading-relaxed text-[16px]">
              No setup. No SEO knowledge. The whole process takes a few minutes — and you stay in control at every step.
            </p>
          </div>

          {/* Right: visual steps */}
          <div className="space-y-3">

            {/* Step 1 — Connect (neutral) */}
            <div className="border border-gray-200 bg-white rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <span className="text-[11px] font-bold text-gray-400 tracking-widest font-mono">01</span>
                <span className="font-semibold text-gray-900 text-[14px]">Connect your Etsy shop</span>
              </div>
              {/* Mock UI: auth button */}
              <div className="px-5 py-4 flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50">
                  <div className="w-5 h-5 rounded bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-orange-500">E</span>
                  </div>
                  <span className="text-[13px] text-gray-600 font-medium">Sign in with Etsy</span>
                </div>
                <div className="text-[11px] text-gray-400 shrink-0">Read-only access</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-gray-300 text-lg leading-none select-none">↓</div>

            {/* Step 2 — Analyze (brand blue) */}
            <div className="border border-brand/20 bg-brand-light/40 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-brand/10 flex items-center gap-3">
                <span className="text-[11px] font-bold text-brand/50 tracking-widest font-mono">02</span>
                <span className="font-semibold text-gray-900 text-[14px]">See your score and what&apos;s wrong</span>
              </div>
              {/* Mock UI: listing score card */}
              <div className="px-5 py-4 flex items-start gap-4">
                <div className="shrink-0 text-center">
                  <div className="text-[2rem] font-bold text-brand leading-none">42</div>
                  <div className="text-[10px] text-brand-muted mt-0.5 font-medium">Score</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[
                    "Missing 6 tags",
                    "Title too generic",
                    "No buyer keywords",
                  ].map((issue) => (
                    <div key={issue} className="flex items-center gap-2 text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand/40 shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-gray-300 text-lg leading-none select-none">↓</div>

            {/* Step 3 — Push live (green) */}
            <div className="border border-green-200 bg-green-50/60 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-green-100 flex items-center gap-3">
                <span className="text-[11px] font-bold text-green-400 tracking-widest font-mono">03</span>
                <span className="font-semibold text-gray-900 text-[14px]">Review the rewrite, push live</span>
              </div>
              {/* Mock UI: diff + button */}
              <div className="px-5 py-4 space-y-2">
                <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-2">Title</div>
                <div className="text-[12px] text-gray-400 line-through bg-red-50 border border-red-100 rounded-lg px-3 py-1.5 leading-snug">
                  Ceramic mug handmade stoneware
                </div>
                <div className="text-[12px] text-gray-800 font-medium bg-green-100 border border-green-200 rounded-lg px-3 py-1.5 leading-snug">
                  Gift for coffee lover unique birthday handmade mug
                </div>
                <div className="pt-1">
                  <div className="inline-flex items-center gap-1.5 bg-green-600 text-white text-[12px] font-semibold px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Push to Etsy
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-col items-start gap-2">
              <CTA />
              <p className="text-xs text-gray-500 pl-1">Free for your first 3 listings · No card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT ── */}
      <section className="bg-surface border-y border-warm-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">Why Listifly</p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
                  Other tools are built for Google.<br />Etsy is different.
                </h2>
                <p className="text-gray-500 text-[16px] leading-relaxed">
                  Generic SEO tools give you Google advice. Etsy has its own algorithm, its own tag system, its own buyer patterns. That advice makes things worse — not better.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Scores your listing against Etsy's actual ranking signals",
                  "Rewrites your title, tags, and description — you just approve",
                  "Pushes directly to Etsy in one click — no copy-pasting",
                  "Works even if you've never heard of SEO",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-[15px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Proof stat */}
              <div className="flex items-center gap-5 border border-warm-border bg-white rounded-2xl px-6 py-5">
                <div className="text-[2.4rem] font-bold text-brand leading-none tracking-tight">+68%</div>
                <div>
                  <p className="font-semibold text-gray-900 text-[14px]">more views on average</p>
                  <p className="text-gray-500 text-[13px]">after optimizing with Listifly · first month</p>
                </div>
              </div>
            </div>

            {/* Right: comparison table with emotional contrast */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-4 border-b border-gray-100 bg-surface">
                <span className="col-span-1" />
                <span className="text-center">Other tools</span>
                <span className="text-center text-brand">Listifly</span>
              </div>
              {[
                {
                  label: "Built for",
                  them: "Google SEO",
                  us: "Etsy's algorithm",
                },
                {
                  label: "How they help",
                  them: "Flag what's wrong",
                  us: "Rewrite it for you",
                },
                {
                  label: "Knowledge needed",
                  them: "SEO expertise",
                  us: "None",
                },
                {
                  label: "End result",
                  them: "A list of tasks",
                  us: "A fixed listing",
                },
                {
                  label: "Push to Etsy",
                  them: "Manual copy-paste",
                  us: "One click",
                },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-3 items-center px-5 py-3.5 border-b border-gray-50 last:border-0">
                  <span className="text-[12px] text-gray-500 font-medium">{row.label}</span>
                  <span className="flex justify-center text-[12px] text-gray-400 text-center px-2">{row.them}</span>
                  <span className="flex justify-center text-[12px] text-brand font-semibold text-center px-2">{row.us}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="results" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Hero stat — main outcome */}
          <div className="md:col-span-1 bg-brand rounded-2xl px-8 py-9 flex flex-col justify-between">
            <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-4">The result</p>
            <div>
              <div className="text-[3.6rem] font-bold text-white leading-none tracking-tight mb-2">+68%</div>
              <p className="text-white/90 text-[15px] font-medium leading-snug">more views within the first month of optimizing</p>
            </div>
            <p className="text-white/40 text-[11px] mt-6">Based on real user data</p>
          </div>

          {/* Supporting stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="bg-white border border-warm-border rounded-2xl px-8 py-8 flex flex-col justify-between">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Community</p>
              <div>
                <div className="text-[3rem] font-bold text-gray-900 leading-none tracking-tight mb-2">4,000+</div>
                <p className="text-gray-600 text-[14px]">Etsy sellers already improving their listings</p>
              </div>
            </div>

            <div className="bg-white border border-warm-border rounded-2xl px-8 py-8 flex flex-col justify-between">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Time to results</p>
              <div>
                <div className="text-[3rem] font-bold text-gray-900 leading-none tracking-tight mb-2">2–3 wks</div>
                <p className="text-gray-600 text-[14px]">Most sellers see more views within 2–3 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-surface border-y border-warm-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Real sellers. Real numbers.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Dominant card — Sarah K. with visual proof */}
            <div className="lg:col-span-3 bg-white border border-warm-border rounded-2xl p-7 flex flex-col gap-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-brand fill-brand" />)}
              </div>

              <p className="text-gray-800 text-[16px] leading-relaxed flex-1">
                &ldquo;I didn&apos;t change the products at all. Just updated the titles and tags based on what Listifly flagged. Three weeks later my views had gone from 12 a day to over 80. I was kind of shocked honestly.&rdquo;
              </p>

              {/* Visual before/after */}
              <div className="bg-surface border border-warm-border rounded-xl p-4 flex items-center gap-6">
                <div className="text-center">
                  <div className="text-[2rem] font-bold text-gray-300 leading-none">12</div>
                  <div className="text-[11px] text-gray-400 mt-1">daily views before</div>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  {[2, 3, 2, 4, 3, 5, 6, 7, 8, 9, 10, 9, 11].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h * 4}px`,
                        background: i < 5
                          ? "oklch(0.88 0.012 248)"
                          : `oklch(${0.55 + i * 0.02} 0.13 248)`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-[2rem] font-bold text-brand leading-none">80+</div>
                  <div className="text-[11px] text-brand-muted mt-1">daily views after</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-warm-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-light border border-brand/20 text-brand-muted text-xs font-bold flex items-center justify-center shrink-0">SK</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-[13px]">Sarah K.</div>
                    <div className="text-xs text-gray-500">BloomCeramics · handmade ceramics shop</div>
                  </div>
                </div>
                <div className="text-[12px] font-semibold text-brand bg-brand-light border border-brand/20 px-3 py-1.5 rounded-full shrink-0">
                  3 weeks
                </div>
              </div>
            </div>

            {/* Supporting cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              <div className="bg-white border border-warm-border rounded-2xl p-6 flex flex-col gap-4 flex-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-brand fill-brand" />)}
                </div>
                <p className="text-gray-700 text-[14px] leading-relaxed flex-1">
                  &ldquo;Same tags for three years. Didn&apos;t realize none of them matched what buyers actually search. Fixed 8 listings and sales went up 40% that month.&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-warm-border pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-light border border-brand/20 text-brand-muted text-[10px] font-bold flex items-center justify-center shrink-0">MT</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-[12px]">Marcus T.</div>
                      <div className="text-[11px] text-gray-500">WoodCraft · woodworking shop</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-brand bg-brand-light border border-brand/20 px-2.5 py-1 rounded-full shrink-0">+40% sales</span>
                </div>
              </div>

              <div className="bg-white border border-warm-border rounded-2xl p-6 flex flex-col gap-4 flex-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-brand fill-brand" />)}
                </div>
                <p className="text-gray-700 text-[14px] leading-relaxed flex-1">
                  &ldquo;Writing one listing used to take me an hour. Now I go through Listifly&apos;s draft in five minutes and it&apos;s better than what I would&apos;ve written.&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-warm-border pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-light border border-brand/20 text-brand-muted text-[10px] font-bold flex items-center justify-center shrink-0">PR</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-[12px]">Priya R.</div>
                      <div className="text-[11px] text-gray-500">ThreadAndSoul · textile seller</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-brand bg-brand-light border border-brand/20 px-2.5 py-1 rounded-full shrink-0">40 listings fixed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: headline + permission list */}
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">Your data</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
              We can&apos;t touch your shop<br />without your approval.
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-8">
              Here&apos;s exactly what Listifly can and can&apos;t do when connected to your Etsy shop.
            </p>

            <div className="space-y-0 border border-gray-200 rounded-2xl overflow-hidden bg-white">
              {[
                { can: true,  text: "Read your listing titles, tags, and descriptions" },
                { can: true,  text: "Suggest rewrites for you to review" },
                { can: true,  text: "Push changes only after you explicitly approve" },
                { can: false, text: "Edit or delete anything without your confirmation" },
                { can: false, text: "Access your orders, payments, or messages" },
                { can: false, text: "Share or sell your shop data" },
              ].map(({ can, text }) => (
                <div key={text} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
                  <span className={`text-[13px] font-bold shrink-0 w-4 text-center ${can ? "text-brand" : "text-gray-300"}`}>
                    {can ? "✓" : "✕"}
                  </span>
                  <span className={`text-[13px] ${can ? "text-gray-700" : "text-gray-400"}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock approval UI */}
          <div className="bg-surface border border-warm-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-warm-border bg-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <span className="ml-2 text-[11px] text-gray-400">Review changes</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Title</p>
                <div className="text-[12px] text-gray-400 line-through bg-red-50 border border-red-100 rounded-lg px-3 py-2 leading-snug mb-1.5">
                  Ceramic mug handmade stoneware blue
                </div>
                <div className="text-[12px] text-gray-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2 leading-snug font-medium">
                  Gift for coffee lover unique birthday handmade mug
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tags added</p>
                <div className="flex flex-wrap gap-1.5">
                  {["coffee lover gift", "birthday mug", "unique gift idea", "handmade ceramic"].map(t => (
                    <span key={t} className="text-[11px] bg-brand-light border border-brand/20 text-brand-muted px-2.5 py-1 rounded-full">+ {t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 bg-brand text-white text-[12px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve &amp; push to Etsy
                </button>
                <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-[12px] text-gray-500 font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="pricing" className="bg-ink py-28 relative overflow-hidden">
        {/* Subtle glow behind CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.38 0.15 248 / 0.18) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-[3.2rem] font-bold text-white leading-[1.08] mb-5 tracking-tight">
            Every day your tags are wrong,<br />someone else gets the sale.
          </h2>
          <p className="text-gray-400 text-[17px] mb-10 leading-relaxed">
            Connect your shop and see exactly which listings have problems — and what to fix. Takes under 60 seconds.
          </p>
          <Button
            size="lg"
            onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
            className="bg-white hover:bg-gray-100 text-gray-900 text-[15px] px-9 py-6 rounded-full font-semibold shadow-lg"
          >
            Find what&apos;s costing me sales →
          </Button>
          <p className="text-[13px] text-gray-500 mt-5">
            Under 60 seconds · Free for 3 listings · Nothing changes without your approval · Joined by 4,000+ sellers
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-warm-border bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <ListiflyLogo size={20} />
                <span className="font-bold text-gray-900 text-sm tracking-tight">Listifly</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Etsy listing optimization for sellers who want more visibility without learning SEO.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Your data</p>
              {[
                "Read-only access — nothing changes without your approval",
                "Your data is never sold or shared",
                "Disconnect anytime from Etsy settings",
              ].map((item) => (
                <p key={item} className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block shrink-0" />
                  {item}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Contact</p>
              <a href="mailto:hello@listifly.app" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                hello@listifly.app
              </a>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">We reply within one business day.</p>
            </div>
          </div>

          <div className="border-t border-warm-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 Listifly. Not affiliated with or endorsed by Etsy, Inc.</p>
            <p className="text-xs text-gray-400">Built for independent makers and small shop owners.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
