"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Tag,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  AlertCircle,
  Sparkles,
} from "lucide-react"

function ConnectButton({ label = "See What's Hurting Your Sales →" }: { label?: string }) {
  return (
    <Button
      size="lg"
      onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
      className="bg-brand hover:bg-brand-hover text-white text-base px-10 py-6 rounded-full shadow-lg shadow-[oklch(0.58_0.19_42/0.3)] font-semibold"
    >
      {label}
    </Button>
  )
}

// ── Before / After mock ────────────────────────────────────
function BeforeAfterMock() {
  return (
    <div className="relative max-w-2xl mx-auto mt-14">
      {/* Glow */}
      <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-3xl" />

      <div className="relative grid grid-cols-2 gap-3 bg-white border border-warm-border rounded-3xl shadow-xl overflow-hidden p-5">

        {/* BEFORE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Before</span>
          </div>
          {/* Score */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
            <div className="text-4xl font-extrabold text-red-400">42</div>
            <div className="text-xs text-red-400 mt-0.5">Listing score</div>
          </div>
          {/* Issues */}
          <div className="space-y-1.5">
            {[
              "Title too short",
              "Missing 6 keywords",
              "Only 7/13 tags used",
            ].map((issue) => (
              <div key={issue} className="flex items-center gap-2 bg-red-50 rounded-xl px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-xs text-red-500">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-brand rounded-full w-8 h-8 flex items-center justify-center shadow-md">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>

        {/* AFTER */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">After Listifly</span>
          </div>
          {/* Score */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <div className="text-4xl font-extrabold text-green-500">89</div>
            <div className="text-xs text-green-500 mt-0.5">Listing score</div>
          </div>
          {/* Fixed */}
          <div className="space-y-1.5">
            {[
              "Title optimized for search",
              "High-traffic keywords added",
              "All 13 tags filled",
            ].map((fix) => (
              <div key={fix} className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <span className="text-xs text-green-700 font-medium">{fix}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">Real result from a Listifly user — fixed in under 60 seconds</p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Nav ── */}
      <nav className="border-b border-warm-border px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <ListiflyLogo size={30} />
          <span className="font-bold text-gray-900 text-lg tracking-tight">Listifly</span>
        </div>
        <button
          onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
          className="text-sm font-semibold text-brand hover:underline"
        >
          Sign in
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-white to-surface">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-center">

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-brand-light text-brand-muted text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse inline-block" />
            Trusted by 4,000+ Etsy sellers worldwide
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-5">
            Your listings are
            <br />
            <span className="text-brand">invisible to buyers.</span>
            <br />
            We fix that.
          </h1>

          <p className="text-xl text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
            Listifly scans your Etsy shop, finds exactly what's killing your rankings,
            and rewrites your listings — automatically.
          </p>

          <ConnectButton />

          <p className="text-sm text-gray-400 mt-3">
            Free for your first 3 listings · No credit card · Read-only access
          </p>
        </div>

        <BeforeAfterMock />

        <div className="pb-20" />
      </section>

      {/* ── PROBLEM ── */}
      <section className="bg-ink py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-4">The hard truth</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Most Etsy sellers are invisible<br className="hidden sm:block" /> — and don&apos;t know it.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-12 text-base leading-relaxed">
            If buyers can&apos;t find your listings, it doesn&apos;t matter how beautiful your products are.
            The problem isn&apos;t your product — it&apos;s your SEO.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              { icon: Search, text: "Your titles are missing the keywords buyers actually search for" },
              { icon: Tag, text: "You're using only 7 of your 13 tags — giving up free search real estate" },
              { icon: BarChart3, text: "Your listings aren't showing on page 1 — or even page 5" },
              { icon: AlertCircle, text: "You're targeting the wrong audience without realizing it" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <div className="w-8 h-8 rounded-xl bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-brand" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Find it. Fix it. Done.
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">No guessing. No SEO degree needed. Just connect your shop and let Listifly do the work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Search,
              title: "Find what's killing your rankings",
              desc: "Listifly scans every listing and scores it across the signals Etsy uses to rank search results — title, tags, keywords, and more.",
              badge: "Step 1",
            },
            {
              icon: BarChart3,
              title: "See exactly what to fix — and why",
              desc: "Every issue is explained in plain English, ranked by impact. No jargon. Just: 'Fix this → get more views.'",
              badge: "Step 2",
            },
            {
              icon: Sparkles,
              title: "Fix everything in one click",
              desc: "Listifly rewrites your titles, description, and all 13 tags using high-traffic Etsy keywords — and pushes the update live. Done.",
              badge: "Step 3",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-warm-border rounded-2xl p-7 hover:shadow-lg hover:border-brand/30 transition-all group">
              <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand bg-brand-light px-2.5 py-1 rounded-full mb-5">
                {card.badge}
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                <card.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (visual steps) ── */}
      <section className="bg-surface py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">From zero to optimized in 60 seconds</h2>
          <p className="text-gray-500 mb-12">No setup. No learning curve. Just results.</p>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gray-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              {[
                { n: "1", title: "Connect your shop", desc: "One click. Read-only. We never touch your listings without your approval." },
                { n: "2", title: "See your ranking gaps", desc: "Every listing gets scored. Every problem gets explained." },
                { n: "3", title: "One click to fix it all", desc: "Approve the changes and Listifly updates your listing on Etsy instantly." },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand text-white text-xl font-extrabold flex items-center justify-center mb-4 shadow-md shadow-[oklch(0.58_0.19_42/0.25)]">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <ConnectButton />
            <p className="text-xs text-gray-400 mt-3">Free to start · No card needed</p>
          </div>
        </div>
      </section>

      {/* ── WHY LISTIFLY ── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Why Listifly</p>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-5">
              Not just another AI tool.<br />Built specifically for Etsy.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Generic AI tools don&apos;t know how Etsy search works. Generic SEO tools give you data without fixes.
              Listifly was built from the ground up to understand Etsy&apos;s ranking signals — and act on them automatically.
            </p>
            <div className="space-y-4">
              {[
                { title: "Etsy-native intelligence", desc: "Trained on ranking patterns from millions of top-performing Etsy listings — not generic e-commerce." },
                { title: "Automation, not suggestions", desc: "We don't just tell you what's wrong. We fix it, then let you approve before anything goes live." },
                { title: "No SEO knowledge needed", desc: "Plain English recommendations. One-click fixes. Built for makers, not marketers." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-white border border-warm-border rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wide text-gray-400 px-6 py-3 border-b border-warm-border bg-surface">
              <span>Feature</span>
              <span className="text-center">Generic AI</span>
              <span className="text-center text-brand">Listifly</span>
            </div>
            {[
              { label: "Etsy-specific analysis", generic: false, us: true },
              { label: "1-click listing fix", generic: false, us: true },
              { label: "Push to Etsy directly", generic: false, us: true },
              { label: "Explains why in plain English", generic: false, us: true },
              { label: "Works without SEO knowledge", generic: false, us: true },
            ].map(({ label, generic, us }) => (
              <div key={label} className="grid grid-cols-3 items-center px-6 py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{label}</span>
                <span className="flex justify-center">
                  {generic
                    ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                    : <span className="text-gray-200 font-bold text-lg">—</span>}
                </span>
                <span className="flex justify-center">
                  {us && <CheckCircle2 className="w-4 h-4 text-brand" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="bg-ink py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "4,000+", label: "Etsy sellers optimized", sub: "and growing daily" },
            { value: "2–3 weeks", label: "Avg. time to see more views", sub: "after first optimization" },
            { value: "68%", label: "Average increase in views", sub: "within the first month" },
            { value: "2.4M+", label: "Listings scored", sub: "across all categories" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm text-gray-300 mt-1 font-medium">{s.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Real sellers. Real results.</h2>
          <p className="text-gray-500 mt-2">No paid reviews. No made-up numbers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah K.",
              shop: "BloomCeramics",
              avatar: "SK",
              stars: 5,
              text: "I went from 12 views a day to 80+ within 3 weeks of using Listifly. My top listing jumped to page one. I had no idea my titles were so bad.",
              highlight: "12 → 80+ daily views in 3 weeks",
            },
            {
              name: "Marcus T.",
              shop: "WoodCraftByMarcus",
              avatar: "MT",
              stars: 5,
              text: "I had no idea I was targeting the wrong keywords for 3 years. Sales went up 40% in the first month after fixing 8 listings. Wish I found this earlier.",
              highlight: "+40% sales in the first month",
            },
            {
              name: "Priya R.",
              shop: "ThreadAndSoul",
              avatar: "PR",
              stars: 5,
              text: "Writing listings used to take me an hour each. Now I get a full optimized draft in 60 seconds and they convert better than what I wrote myself.",
              highlight: "60 seconds to a fully optimized listing",
            },
          ].map((t) => (
            <div key={t.name} className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4 hover:border-brand/25 hover:shadow-md transition-all">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand fill-brand" />
                ))}
              </div>

              {/* Highlight */}
              <div className="bg-brand-light text-brand text-xs font-bold px-3 py-1.5 rounded-full inline-block self-start">
                {t.highlight}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-2 border-t border-warm-border">
                <div className="w-9 h-9 rounded-full bg-brand-light text-brand-muted text-xs font-bold flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="bg-surface border-t border-warm-border py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Your shop is safe with us</h2>
          <p className="text-gray-500 text-sm mb-10">We built Listifly with Etsy sellers&apos; trust as the #1 priority.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Read-only by default",
                desc: "We can only read your listing data. We cannot edit or delete anything without your explicit approval.",
              },
              {
                icon: Zap,
                title: "You approve every change",
                desc: "Review every rewrite before it goes live. Nothing is pushed to Etsy without your say.",
              },
              {
                icon: TrendingUp,
                title: "Your data stays yours",
                desc: "We never sell your shop data. We never share it. You can disconnect at any time from Etsy.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-warm-border rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-500" />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Stop guessing.<br />
            <span className="text-brand">Start ranking.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Your first 3 listings are free. No credit card. No setup.
            See your scores and exactly what to fix in under 60 seconds.
          </p>
          <ConnectButton label="Analyze My Listings Free →" />
          <p className="text-sm text-gray-400 mt-4">
            3 listings free · Cancel anytime · Read-only access
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-warm-border bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <ListiflyLogo size={22} />
                <span className="font-bold text-gray-900 text-sm tracking-tight">Listifly</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                AI-powered Etsy listing optimizer. Built for makers who want more sales, not more work.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your data</p>
              {[
                "Read-only access — we never edit or delete your listings",
                "Your shop data is never sold or shared",
                "Disconnect anytime from Etsy settings",
              ].map((item) => (
                <p key={item} className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                  {item}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Contact</p>
              <a href="mailto:hello@listifly.app" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                hello@listifly.app
              </a>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Questions? We reply within one business day.
              </p>
            </div>
          </div>

          <div className="border-t border-warm-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 Listifly. Not affiliated with or endorsed by Etsy, Inc.</p>
            <p className="text-xs text-gray-400">Made for independent makers and small shop owners.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
