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
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full mb-8 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-brand" />
              4,000+ Etsy sellers use Listifly
            </div>

            <h1 className="text-[2.6rem] sm:text-[3.2rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Your Etsy listings
              <br />
              could be reaching
              <br />
              <span className="text-brand">a lot more buyers.</span>
            </h1>

            <p className="text-[17px] text-gray-500 mb-9 leading-relaxed max-w-lg">
              Listifly scans your shop, finds what&apos;s limiting your search visibility,
              and rewrites your listings so more buyers can actually find you.
            </p>

            <div className="flex flex-col items-start gap-3">
              <CTA />
              <p className="text-sm text-gray-400">
                First 3 listings free · No credit card · Nothing changes without your approval
              </p>
            </div>
          </div>

          {/* Right: before/after card */}
          <div className="lg:pt-4">

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          {/* Listing label */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <p className="text-sm font-medium text-gray-700">Floral Baby Shower Invitation Template</p>
              <p className="text-xs text-gray-400 mt-0.5">Etsy listing · Digital download</p>
            </div>
            <div className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full">
              Real example
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* Before */}
            <div className="p-6 space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Before</p>
              <ScoreBadge score={42} label="Listing score" />
              <div className="space-y-2.5">
                {[
                  "Title not matching buyer searches",
                  "6 keywords missing",
                  "Only 7 of 13 tags used",
                ].map((issue) => (
                  <div key={issue} className="flex items-start gap-2 text-xs text-gray-400">
                    <AlertCircle className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
                    {issue}
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">After Listifly</p>
                <span className="text-[10px] text-brand font-semibold bg-brand-light px-2 py-0.5 rounded-full">~40 sec</span>
              </div>
              <ScoreBadge score={89} label="Listing score" />
              <div className="space-y-2.5">
                {[
                  "Title rewritten for Etsy search",
                  "High-traffic keywords added",
                  "All 13 tags filled in",
                ].map((fix) => (
                  <div key={fix} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                    {fix}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-center gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-brand" />
            <p className="text-xs text-gray-500 font-medium">Views increased from 14/day to 70+ within 3 weeks</p>
          </div>
        </div>
          </div>
        </div>
      </section>
      <div className="pb-20" />

      {/* ── PROBLEM ── */}
      <section className="bg-[#f9f9f8] border-y border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">What goes wrong</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              The problems are usually
              small. The impact isn&apos;t.
            </h2>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Etsy&apos;s search algorithm weighs a handful of specific signals. When listings miss even a few,
              they quietly drop in rankings — and most sellers only notice when sales slow down.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: Search,
                title: "Titles that don't match how buyers search",
                desc: "Buyers rarely search using the product name. They search by occasion, style, or use case. Small differences in wording change whether your listing shows up.",
              },
              {
                icon: Tag,
                title: "Tags that don't cover enough ground",
                desc: "Etsy gives you 13 tags. Most sellers use fewer than 10, and many are too broad. Each unused tag is a missed opportunity to appear in a search.",
              },
              {
                icon: BarChart3,
                title: "Descriptions written for browsers, not search",
                desc: "A well-written description helps buyers decide. An optimized one does both. Most listings are missing the keywords Etsy needs to categorize them correctly.",
              },
              {
                icon: AlertCircle,
                title: "Listings shown to the wrong audience",
                desc: "Miscategorized listings or missing attributes can cause Etsy to show your product to people who would never buy it — lowering your conversion rate over time.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5">
                <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-[13px] mb-1 leading-snug">{title}</p>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="max-w-lg mb-14">
          <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            Three steps. A few minutes.
            You stay in control.
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px]">
            No settings to configure. No SEO knowledge needed. Just connect and see what&apos;s happening with your listings.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              n: "01",
              title: "Connect your Etsy shop",
              desc: "Sign in with your Etsy account. We get read-only access — we can see your listings, but we can't change anything in your shop until you explicitly approve each update. Takes about 30 seconds.",
            },
            {
              n: "02",
              title: "See which listings need attention",
              desc: "Each listing gets a score and a breakdown — what's working, what's hurting your ranking, and what would have the most impact. Written in plain language, no jargon.",
            },
            {
              n: "03",
              title: "Review and apply improvements",
              desc: "Listifly generates an improved version of your title, description, and tags. You review every change before it goes live. When you're satisfied, one click sends it to Etsy.",
            },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-6 border border-gray-100 rounded-2xl px-7 py-6 hover:border-gray-200 transition-colors">
              <span className="text-[13px] font-bold text-gray-200 tracking-widest shrink-0 w-8 mt-0.5">{s.n}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{s.title}</h3>
                <p className="text-gray-400 text-[14px] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-3">
          <CTA />
          <p className="text-xs text-gray-400 pl-1">Free for your first 3 listings · No card required</p>
        </div>
      </section>

      {/* ── WHY DIFFERENT ── */}
      <section className="bg-[#f9f9f8] border-y border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-4">Why Listifly</p>
                <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                  Built for how Etsy search actually works.
                </h2>
                <p className="text-gray-500 leading-relaxed text-[15px] mb-4">
                  Etsy has its own search algorithm, its own tag structure, and its own buyer behavior patterns.
                  Generic SEO tools don&apos;t account for any of that. They give you advice that&apos;s accurate for
                  Google but irrelevant for Etsy.
                </p>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  Listifly was built specifically around Etsy&apos;s ranking signals. It doesn&apos;t just identify
                  problems — it writes the improved version, explains the reasoning, and lets you push it
                  live without switching tabs.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Scoring built on Etsy-specific ranking patterns",
                  "Rewrites listings, not just flags issues",
                  "Full review before anything goes live",
                  "Works without any SEO knowledge",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span className="text-[14px] text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-[11px] font-bold text-gray-300 uppercase tracking-widest px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
                <span className="col-span-1" />
                <span className="text-center">Others</span>
                <span className="text-center text-brand">Listifly</span>
              </div>
              {[
                { label: "Etsy-specific scoring", other: false },
                { label: "Rewrites for you", other: false },
                { label: "Push to Etsy directly", other: false },
                { label: "Plain-English explanations", other: false },
                { label: "No SEO knowledge needed", other: false },
              ].map(({ label, other }) => (
                <div key={label} className="grid grid-cols-3 items-center px-5 py-3 border-b border-gray-50 last:border-0">
                  <span className="text-[13px] text-gray-600 col-span-1 leading-snug">{label}</span>
                  <span className="flex justify-center">
                    {other
                      ? <CheckCircle2 className="w-4 h-4 text-green-300" />
                      : <span className="text-gray-100 font-light text-xl">—</span>}
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
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "4,000+", label: "Etsy sellers", sub: "actively using Listifly" },
            { value: "2–3 wks", label: "Typical time", sub: "to see a change in views" },
            { value: "68%", label: "Avg. view increase", sub: "in the first month" },
            { value: "2.4M+", label: "Listings scored", sub: "across all categories" },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="text-[2rem] font-bold text-gray-900 tracking-tight">{s.value}</div>
              <div className="text-[13px] font-semibold text-gray-700">{s.label}</div>
              <div className="text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#f9f9f8] border-y border-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">From sellers who&apos;ve used it</h2>
            <p className="text-gray-400 text-[15px]">Real results, with context.</p>
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
                text: "I'd been using the same tags for three years without realizing they weren't matching what buyers searched for. Fixed 8 listings and sales went up about 40% that first month.",
                result: "~40% more sales · first month",
              },
              {
                name: "Priya R.",
                shop: "ThreadAndSoul",
                avatar: "PR",
                text: "Writing a listing used to take me an hour. Now I review a draft in five minutes. The output is better than what I would have written anyway.",
                result: "40 listings optimized · one afternoon",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand fill-brand" />
                  ))}
                </div>

                <p className="text-gray-600 text-[14px] leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

                <div className="text-[12px] font-semibold text-brand bg-brand-light px-3 py-1.5 rounded-full self-start tracking-tight">
                  {t.result}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-[13px]">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.shop}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="max-w-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You stay in control</h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Connecting a tool to your Etsy shop is a meaningful step.
            Here&apos;s exactly what that means — and what it doesn&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Eye,
              title: "Read-only by default",
              desc: "We can see your listings but we have no ability to edit, delete, or publish anything in your shop without you approving each update individually.",
            },
            {
              icon: ShieldCheck,
              title: "You approve every change",
              desc: "Every rewrite is shown to you before it goes anywhere. You can edit it, reject it, or approve it. Nothing is sent to Etsy until you say so.",
            },
            {
              icon: CheckCircle2,
              title: "Your data isn't shared",
              desc: "We don't sell your shop data or share it with third parties. You can disconnect Listifly from Etsy at any time — no process, just one click.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-gray-100 rounded-2xl p-6">
              <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-brand" />
              </div>
              <p className="font-semibold text-gray-800 text-[13px] mb-1.5">{title}</p>
              <p className="text-gray-400 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#f9f9f8] border-t border-gray-100 py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Find out what&apos;s holding
            your listings back.
          </h2>
          <p className="text-gray-500 text-[17px] mb-10 leading-relaxed max-w-md mx-auto">
            Your first 3 listings are free. No credit card.
            You&apos;ll have scores and a clear action plan in under a minute.
          </p>
          <CTA label="Analyze my listings →" />
          <p className="text-sm text-gray-400 mt-4">
            Free to start · Cancel anytime · Nothing changes without your approval
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <ListiflyLogo size={20} />
                <span className="font-bold text-gray-900 text-sm tracking-tight">Listifly</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
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
                <p key={item} className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/60 inline-block shrink-0" />
                  {item}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Contact</p>
              <a href="mailto:hello@listifly.app" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                hello@listifly.app
              </a>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">We reply within one business day.</p>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 Listifly. Not affiliated with or endorsed by Etsy, Inc.</p>
            <p className="text-xs text-gray-400">Built for independent makers and small shop owners.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
