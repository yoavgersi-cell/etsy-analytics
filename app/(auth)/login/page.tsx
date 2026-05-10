"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Star, Eye, ShieldCheck, Search, Tag, BarChart3, AlertCircle } from "lucide-react"

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
      <section className="relative overflow-hidden pt-20 pb-28 px-6">

        {/* Subtle top gradient */}
        <div className="absolute inset-x-0 top-0 h-[480px] pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.38 0.15 248 / 0.08) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Headline */}
          <h1 className="text-[3rem] sm:text-[4.2rem] font-bold text-gray-900 leading-[1.06] tracking-tight mb-5">
            Your Etsy listings are
            <br />
            <span className="text-brand">closer to the top</span> than you think.
          </h1>

          {/* Subheadline */}
          <p className="text-[18px] text-gray-500 max-w-[500px] mx-auto mb-10 leading-relaxed">
            Listifly finds what&apos;s holding each listing back and rewrites it — ready to push live in one click.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 mb-14">
            <CTA label="Analyze my listings free →" />
            <p className="text-sm text-gray-400">
              First 3 listings free · No credit card · You approve every change
            </p>
          </div>

          {/* ── Before / After visual ── */}
          <div className="max-w-2xl mx-auto bg-white border border-warm-border rounded-3xl shadow-[0_4px_32px_oklch(0_0_0/0.07)] overflow-hidden">

            {/* Card header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-warm-border bg-surface">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Listing score</p>
              <span className="text-[11px] font-semibold text-brand bg-brand-light border border-brand/20 px-3 py-1 rounded-full">
                Fixed in under a minute
              </span>
            </div>

            {/* Score columns */}
            <div className="grid grid-cols-2 divide-x divide-warm-border">

              {/* Before */}
              <div className="px-8 py-10 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Before optimization</p>
                <div className="text-[88px] font-bold text-gray-200 leading-none tracking-tight tabular-nums">42</div>
                <div className="mt-6 space-y-2">
                  {["Missing 6 tags", "Title too generic", "No buyer keywords"].map((item) => (
                    <div key={item} className="flex items-center justify-center gap-2 text-[12px] text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="px-8 py-10 text-center bg-brand-light/30">
                <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-4">After optimization</p>
                <div className="text-[88px] font-bold text-brand leading-none tracking-tight tabular-nums">89</div>
                <div className="mt-6 space-y-2">
                  {["All 13 tags filled", "Title rewritten", "Keywords added"].map((item) => (
                    <div key={item} className="flex items-center justify-center gap-2 text-[12px] text-brand-muted">
                      <CheckCircle2 className="w-3 h-3 text-brand shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social proof — below visual */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="flex -space-x-2">
              {["SK", "MT", "PR", "JL", "AK"].map((init, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-light border-2 border-white text-brand-muted text-[10px] font-bold flex items-center justify-center"
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-[14px] text-gray-600">
              Join <span className="font-bold text-gray-900">4,000+</span> Etsy sellers improving their listings
            </p>
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
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-3">Results</p>
              <h2 className="text-4xl font-bold text-gray-900">From sellers who&apos;ve used it</h2>
            </div>
            <p className="text-gray-500 text-[15px] hidden md:block">Real numbers. Real timeframes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Sarah K.",
                shop: "BloomCeramics",
                avatar: "SK",
                text: "My views went from about 12 a day to over 80 within a few weeks. I didn't change the products — just the titles and tags based on what Listifly flagged.",
                result: "12 → 80+ daily views · 3 weeks",
              },
              {
                name: "Marcus T.",
                shop: "WoodCraftByMarcus",
                avatar: "MT",
                text: "I'd been using the same tags for three years without realizing they weren't what buyers searched for. Fixed 8 listings and sales went up about 40% that first month.",
                result: "~40% more sales · first month",
              },
              {
                name: "Priya R.",
                shop: "ThreadAndSoul",
                avatar: "PR",
                text: "Writing a listing used to take me an hour. Now I review a draft in five minutes. The output is consistently better than what I would have written myself.",
                result: "40 listings optimized · one afternoon",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-warm-border rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand fill-brand" />
                  ))}
                </div>

                <p className="text-gray-700 text-[14px] leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

                <div className="text-[12px] font-bold text-brand-muted bg-brand-light border border-brand/20 px-3 py-1.5 rounded-full self-start tracking-tight">
                  {t.result}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-warm-border">
                  <div className="w-8 h-8 rounded-full bg-brand-light border border-brand/20 text-brand-muted text-xs font-bold flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-[13px]">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.shop}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">Your data</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              You stay in control.
              Always.
            </h2>
            <p className="text-gray-600 text-[16px] leading-relaxed">
              Connecting a tool to your Etsy shop is a real decision. Here&apos;s exactly
              what access we have — and what we don&apos;t.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Eye,
                title: "Read-only by default",
                desc: "We can read your listing data but have no ability to edit, delete, or change anything in your shop without you approving each update individually.",
              },
              {
                icon: ShieldCheck,
                title: "You approve every change",
                desc: "Every rewrite is shown to you first. Edit it, reject it, or approve it. Nothing is sent to Etsy until you explicitly confirm.",
              },
              {
                icon: CheckCircle2,
                title: "Your data is never shared",
                desc: "We don't sell your shop data or share it with third parties. Disconnect Listifly from Etsy at any time — one click, no friction.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 border border-warm-border bg-white rounded-2xl px-6 py-5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-brand-light border border-brand/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-[14px] mb-1">{title}</p>
                  <p className="text-gray-600 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="pricing" className="bg-ink py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
            See what&apos;s holding
            your listings back.
          </h2>
          <p className="text-gray-400 text-[17px] mb-10 leading-relaxed max-w-lg mx-auto">
            Your first 3 listings are free. No credit card required.
            You&apos;ll have scores and a full breakdown in under a minute.
          </p>
          <Button
            size="lg"
            onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
            className="bg-white hover:bg-gray-100 text-gray-900 text-[15px] px-9 py-6 rounded-full font-semibold shadow-sm"
          >
            Analyze my listings →
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Free to start · Cancel anytime · Nothing changes without your approval
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
