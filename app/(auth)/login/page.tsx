"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Star, ArrowRight, TrendingUp, Eye, ShieldCheck, Search, Tag, BarChart3, AlertCircle } from "lucide-react"

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
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <ListiflyLogo size={26} />
          <span className="font-bold text-gray-900 tracking-tight text-[15px]">Listifly</span>
        </div>
        <button
          onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Sign in
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-24 px-6">

        {/* Nordic gradient blob */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="w-[900px] h-[900px] rounded-full opacity-100"
            style={{ background: "radial-gradient(circle, oklch(0.38 0.15 248 / 0.10) 0%, oklch(0.38 0.15 248 / 0.04) 50%, transparent 72%)" }}
          />
        </div>

        {/* Floating card — left (score before/after) */}
        <div className="hidden lg:block absolute left-[4%] top-1/2 -translate-y-1/2 z-10">
          <div className="bg-white border border-warm-border rounded-2xl shadow-md p-5 w-52">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Listing score</p>
            <div className="flex items-end gap-3 mb-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-200">42</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Before</div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand mb-2 shrink-0" />
              <div className="text-center">
                <div className="text-3xl font-bold text-brand">89</div>
                <div className="text-[10px] text-brand-muted mt-0.5">After</div>
              </div>
            </div>
            <div className="space-y-1.5 border-t border-warm-border pt-3">
              {["Title rewritten", "All 13 tags filled", "Keywords added"].map((fix) => (
                <div key={fix} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <CheckCircle2 className="w-3 h-3 text-brand shrink-0" />
                  {fix}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating card — right (views stat) */}
        <div className="hidden lg:block absolute right-[4%] top-1/2 -translate-y-[60%] z-10">
          <div className="bg-white border border-warm-border rounded-2xl shadow-md p-5 w-48">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-brand-light border border-brand/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">+68%</div>
                <div className="text-[10px] text-gray-400">avg. more views</div>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 border-t border-warm-border pt-3 leading-snug">
              Sellers see results within 2–3 weeks of optimizing.
            </p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">

          <h1 className="text-[3rem] sm:text-[4rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-6">
            More buyers find
            <br />
            your Etsy listings.
            <br />
            <span className="text-brand">Starting this week.</span>
          </h1>

          <p className="text-[18px] text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Listifly scans your shop, finds what&apos;s limiting your search visibility,
            and rewrites your listings so buyers can actually find you.
          </p>

          {/* Social proof avatars */}
          <div className="flex items-center justify-center gap-3 mb-8">
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
            <p className="text-sm text-gray-600 font-medium">
              Trusted by <span className="font-bold text-gray-900">4,000+</span> Etsy sellers
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <CTA label="Analyze my listings free →" />
            <p className="text-sm text-gray-400">
              First 3 listings free · No credit card · Nothing changes without your approval
            </p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="bg-surface border-y border-warm-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">What goes wrong</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Small issues in your listings
              add up to real lost sales.
            </h2>
            <p className="text-gray-600 leading-relaxed text-[16px]">
              Etsy&apos;s search ranks listings based on specific signals — and most sellers miss
              several of them without knowing it. The result is fewer views and lower sales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Search,
                title: "Titles that don't match how buyers search",
                desc: "Buyers search by occasion, style, or use case — not your product name. A few wrong words and your listing disappears from results.",
              },
              {
                icon: Tag,
                title: "Tags that leave visibility on the table",
                desc: "Etsy gives you 13 tags. Most sellers use 7–8, and many are too broad to rank for anything. Each empty tag slot is a missed search opportunity.",
              },
              {
                icon: BarChart3,
                title: "Descriptions that don't help Etsy rank you",
                desc: "A good description converts. An optimized one also helps Etsy understand what your item is and who it's for — so it shows up in the right searches.",
              },
              {
                icon: AlertCircle,
                title: "Listings reaching the wrong audience",
                desc: "Missing attributes or miscategorization can cause Etsy to show your listings to people unlikely to buy — which quietly lowers your ranking over time.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-white border border-warm-border rounded-2xl px-6 py-5 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-brand-light border border-brand/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-[14px] mb-1.5 leading-snug">{title}</p>
                  <p className="text-gray-600 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">How it works</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Connect. See what&apos;s wrong.
              Fix it in one click.
            </h2>
            <p className="text-gray-600 leading-relaxed text-[16px]">
              No configuration. No SEO expertise. The whole process takes a few minutes
              and you stay in full control at every step.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                n: "01",
                title: "Connect your Etsy shop",
                desc: "Sign in with Etsy. We get read-only access — we can see your listings but can't change anything until you approve each update individually.",
              },
              {
                n: "02",
                title: "See which listings need attention",
                desc: "Each listing gets a score and a plain-English breakdown — what's working, what's hurting your ranking, and which fixes will have the most impact.",
              },
              {
                n: "03",
                title: "Review and push to Etsy",
                desc: "Listifly rewrites your title, description, and tags. You review every change. When you're happy, one click updates the listing live on Etsy.",
              },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-5 border border-warm-border bg-white rounded-2xl px-6 py-5 shadow-sm">
                <span className="text-[13px] font-bold text-brand/40 tracking-widest shrink-0 w-8 mt-0.5 font-mono">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-[14px] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-4 flex flex-col items-start gap-3">
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

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">Why Listifly</p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
                  Built for Etsy's search — not search in general.
                </h2>
                <p className="text-gray-600 leading-relaxed text-[16px] mb-4">
                  Etsy has its own algorithm, tag system, and buyer behavior patterns. Generic SEO tools
                  ignore all of that — they give advice optimized for Google, not for Etsy sellers.
                </p>
                <p className="text-gray-600 leading-relaxed text-[16px]">
                  Listifly was built specifically around Etsy&apos;s ranking signals. It identifies
                  problems, rewrites the listing, and lets you push it live — without leaving the app.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Scoring based on Etsy-specific ranking patterns",
                  "Rewrites listings — doesn't just flag problems",
                  "You review every change before anything goes live",
                  "No SEO knowledge required",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span className="text-[15px] text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-warm-border rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-4 border-b border-warm-border bg-surface">
                <span className="col-span-1" />
                <span className="text-center">Other tools</span>
                <span className="text-center text-brand">Listifly</span>
              </div>
              {[
                "Etsy-specific scoring",
                "Rewrites listings for you",
                "Pushes directly to Etsy",
                "Plain-English explanations",
                "No SEO knowledge needed",
              ].map((label) => (
                <div key={label} className="grid grid-cols-3 items-center px-5 py-3.5 border-b border-gray-50 last:border-0">
                  <span className="text-[13px] text-gray-700 font-medium col-span-1 leading-snug">{label}</span>
                  <span className="flex justify-center">
                    <span className="text-gray-200 font-light text-lg">—</span>
                  </span>
                  <span className="flex justify-center">
                    <CheckCircle2 className="w-4 h-4 text-brand" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-warm-border border border-warm-border rounded-2xl overflow-hidden bg-white shadow-sm">
          {[
            { value: "4,000+", label: "Etsy sellers", sub: "actively using Listifly" },
            { value: "2–3 wks", label: "Typical time", sub: "to see more views" },
            { value: "68%", label: "Avg. view increase", sub: "in the first month" },
            { value: "2.4M+", label: "Listings scored", sub: "across all categories" },
          ].map((s) => (
            <div key={s.label} className="px-8 py-8 space-y-1">
              <div className="text-[2.2rem] font-bold text-gray-900 tracking-tight leading-none">{s.value}</div>
              <div className="text-[13px] font-semibold text-gray-700 pt-1">{s.label}</div>
              <div className="text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
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
      <section className="bg-ink py-28">
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
