"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import { BarChart3, ScanSearch, PenLine, ShieldCheck, Zap, TrendingUp, CreditCard } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Performance Score Per Listing",
    desc: "Every listing is benchmarked across 20+ ranking signals — title structure, keyword coverage, tag variety, image count, and search relevance — distilled into a clear 0–100 score.",
  },
  {
    icon: ScanSearch,
    title: "Ranking Gap Analysis",
    desc: "See exactly which signals are hurting your position in Etsy search. Prioritized by impact so you know where to spend your time first.",
  },
  {
    icon: PenLine,
    title: "Optimized Content, Ready to Paste",
    desc: "Generate titles, descriptions, and all 13 tags built around what buyers actually search for. Copy directly into Etsy with one click.",
  },
]

const steps = [
  { n: "1", title: "Connect your shop", desc: "Sign in with Etsy in one click. Read-only access — we never modify your listings." },
  { n: "2", title: "Get your scores", desc: "Every listing is benchmarked against Etsy's search ranking factors. See what's working and what's holding you back." },
  { n: "3", title: "Fix what matters", desc: "Prioritized recommendations tell you exactly what to change. Update your listings and watch impressions climb." },
]

const testimonials = [
  {
    name: "Sarah K.",
    shop: "BloomCeramics",
    sales: "3,200+ sales",
    avatar: "SK",
    text: "I went from 12 views a day to over 80 after fixing the gaps Listifly flagged. My top listing jumped to page one in two weeks. Wish I had this when I started.",
  },
  {
    name: "Marcus T.",
    shop: "WoodCraftByMarcus",
    sales: "1,800+ sales",
    avatar: "MT",
    text: "The keyword analysis alone was worth it. I had no idea I was targeting the wrong search terms for three years. Sales up 40% in the first month.",
  },
  {
    name: "Priya R.",
    shop: "ThreadAndSoul",
    sales: "5,600+ sales",
    avatar: "PR",
    text: "Writing listings used to take me an hour each. Now I get a full optimized draft in five minutes and they actually convert better than what I wrote myself.",
  },
]

const stats = [
  { value: "4,200+", label: "Sellers on the platform" },
  { value: "68%", label: "Average increase in listing views" },
  { value: "2.4M+", label: "Listings scored" },
  { value: "4.9 ★", label: "Average seller rating" },
]

const trust = [
  { icon: ShieldCheck, title: "Read-only access", sub: "We can never edit or delete your listings" },
  { icon: CreditCard, title: "3 free analyses", sub: "Score your first 3 listings, no card needed" },
  { icon: Zap, title: "60-second setup", sub: "Connect your shop in one click" },
  { icon: TrendingUp, title: "Research-backed scoring", sub: "Built on patterns from millions of top-ranking Etsy listings" },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-warm-border px-6 py-4 flex items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <ListiflyLogo size={34} />
          <span className="font-bold text-gray-900 text-lg tracking-tight">Listifly</span>
        </div>
      </nav>

      {/* Hero — warm gradient background */}
      <section className="bg-gradient-to-b from-white to-surface">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-light text-brand-muted text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse inline-block" />
            Used by 4,200+ Etsy sellers worldwide
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Your listings have gaps.
            <br />
            <span className="text-brand">We find every one.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Listifly scores your shop against Etsy's search ranking signals,
            shows you exactly what's costing you visibility, and writes better content to fix it.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
              className="bg-brand hover:bg-brand-hover text-white text-lg px-12 py-6 rounded-full shadow-lg shadow-[oklch(0.58_0.19_42/0.25)]"
            >
              Connect store
            </Button>
            <p className="text-sm text-gray-400">3 listings free · No credit card · Read-only access</p>
          </div>
        </div>
      </section>

      {/* Stats bar — warm espresso, not cold gray */}
      <section className="bg-ink py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Know exactly why your listings aren't ranking</h2>
          <p className="text-gray-500 mt-3">Most sellers are guessing. Listifly shows you the data.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border border-warm-border bg-white rounded-2xl p-6 hover:shadow-md hover:border-brand/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — warm cream bg */}
      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">From connected to scored in 60 seconds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.n}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Real sellers. Real results.</h2>
          <p className="text-gray-500 mt-3">Shop owners who used the data to improve their rankings.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4 hover:border-brand/25 transition-colors">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-brand fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-warm-border">
                <div className="w-9 h-9 rounded-full bg-brand-light text-brand-muted text-xs font-bold flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.shop} · {t.sales}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-surface border-t border-warm-border py-14">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap justify-center gap-10 text-center">
          {trust.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="w-44">
              <div className="w-10 h-10 rounded-xl bg-white border border-warm-border flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="font-semibold text-gray-800 text-sm">{title}</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-snug">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-border bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

            {/* Brand */}
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <ListiflyLogo size={24} />
                <span className="font-bold text-gray-900 text-sm tracking-tight">Listifly</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Built for Etsy sellers who want to stop guessing and start growing. Listifly turns your shop's search data into a clear action plan.
              </p>
            </div>

            {/* Data & privacy */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your data</p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                Read-only access — we never edit or delete your listings
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                Your shop data is never sold or shared with third parties
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                You can disconnect your shop at any time from Etsy settings
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
              <a href="mailto:hello@listifly.app" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                hello@listifly.app
              </a>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Questions about pricing or the free trial? We reply within one business day.
              </p>
            </div>
          </div>

          <div className="border-t border-warm-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 Listifly. Not affiliated with or endorsed by Etsy, Inc.</p>
            <p className="text-xs text-gray-400">Made for independent makers and small shop owners.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
