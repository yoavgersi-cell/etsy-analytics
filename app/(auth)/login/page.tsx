"use client"

import { signIn } from "next-auth/react"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Eye, CheckCircle2, Star, AlertCircle, Search, Tag, BarChart3 } from "lucide-react"

function ConnectButton({ label = "Check my listings →" }: { label?: string }) {
  return (
    <Button
      size="lg"
      onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
      className="bg-brand hover:bg-brand-hover text-white text-base px-9 py-6 rounded-full font-semibold shadow-sm"
    >
      {label}
    </Button>
  )
}

function BeforeAfterMock() {
  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Floral Baby Shower Invitation Template</span>
          <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">Etsy listing</span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* Before */}
          <div className="p-5 space-y-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Before</p>
            <div className="text-center py-4">
              <span className="text-5xl font-bold text-gray-300">42</span>
              <p className="text-xs text-gray-400 mt-1">out of 100</p>
            </div>
            <div className="space-y-2">
              {[
                "Title too short",
                "6 keywords missing",
                "Only 7 of 13 tags used",
              ].map((issue) => (
                <div key={issue} className="flex items-center gap-2 text-xs text-gray-400">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                  {issue}
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-5 space-y-3 bg-[#fafaf9]">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">After Listifly</p>
            <div className="text-center py-4">
              <span className="text-5xl font-bold text-brand">89</span>
              <p className="text-xs text-gray-400 mt-1">out of 100</p>
            </div>
            <div className="space-y-2">
              {[
                "Title rewritten for search",
                "High-traffic keywords added",
                "All 13 tags filled in",
              ].map((fix) => (
                <div key={fix} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                  {fix}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 bg-[#fafaf9]">
          <p className="text-xs text-gray-400 text-center">Fixed in about 40 seconds</p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Nav ── */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <ListiflyLogo size={28} />
          <span className="font-bold text-gray-900 tracking-tight">Listifly</span>
        </div>
        <button
          onClick={() => signIn("etsy", { callbackUrl: "/dashboard" })}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign in
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
          Used by 4,000+ Etsy sellers
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.12] tracking-tight mb-5">
          Some of your listings probably
          <br />
          aren&apos;t showing in search.
          <br />
          <span className="text-brand">We&apos;ll show you why.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-lg mx-auto mb-9 leading-relaxed">
          Listifly scans your Etsy shop, finds what&apos;s affecting your rankings,
          and rewrites your listings so buyers can actually find you.
        </p>

        <ConnectButton />

        <p className="text-sm text-gray-400 mt-3">
          First 3 listings are free · No credit card · We never edit anything without your approval
        </p>
      </section>

      <BeforeAfterMock />

      {/* ── PROBLEM ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="max-w-xl mb-12">
          <p className="text-sm text-brand font-semibold uppercase tracking-widest mb-3">What usually goes wrong</p>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            Most listing problems are small
            things that add up over time.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Etsy&apos;s search algorithm looks at a handful of specific signals. When a listing misses even a few,
            it can quietly slip out of search results — and most sellers don&apos;t notice until sales slow down.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Search,
              title: "Titles that don&apos;t match how buyers search",
              desc: "Buyers type things like \"personalized baby shower gift\" — not the product name you&apos;ve used. Small wording differences affect whether your listing appears.",
            },
            {
              icon: Tag,
              title: "Tags that aren&apos;t pulling in traffic",
              desc: "Etsy gives you 13 tags. Most sellers use 7 or 8, and many of them are too generic to rank for anything specific.",
            },
            {
              icon: BarChart3,
              title: "Descriptions written for buyers, not search",
              desc: "A well-written description helps buyers. An optimized one helps both. Most listings are missing the keywords that tell Etsy what the item is.",
            },
            {
              icon: AlertCircle,
              title: "Competing with the wrong listings",
              desc: "If your listing is miscategorized or missing the right attributes, Etsy may be showing it to the wrong audience — or not at all.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5">
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1" dangerouslySetInnerHTML={{ __html: title }} />
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#fafaf9] border-y border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-lg mb-14">
            <p className="text-sm text-brand font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
              Connect your shop. See what&apos;s happening. Fix it.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              The whole process takes a few minutes. You stay in control at every step.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "Connect your Etsy shop",
                desc: "Sign in with your Etsy account. We get read-only access — we can see your listings, but we can't change anything until you say so. Takes about 30 seconds.",
              },
              {
                n: "2",
                title: "See what's affecting your rankings",
                desc: "Each listing gets a score and a breakdown — what's working, what isn't, and what would help the most. No jargon, just clear explanations.",
              },
              {
                n: "3",
                title: "Review and apply the improvements",
                desc: "Listifly rewrites your title, description, and tags. You review the changes before anything goes live. When you're happy, one click pushes it to Etsy.",
              },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-6 bg-white border border-gray-100 rounded-2xl px-7 py-6">
                <div className="w-9 h-9 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ConnectButton />
            <p className="text-xs text-gray-400 mt-3">Free to start · No card needed</p>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATION ── */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm text-brand font-semibold uppercase tracking-widest mb-3">Why Listifly</p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-5">
              Built for Etsy, not for e-commerce in general.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              A lot of tools will give you generic SEO advice that doesn&apos;t apply to how Etsy actually works.
              Etsy has its own search algorithm, its own tag system, its own buyer behavior patterns.
              Listifly was built specifically around those patterns.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              It also does more than tell you what to fix. It writes the improved version for you, shows you
              exactly what changed and why, and lets you push it live in one click — without ever leaving Listifly.
            </p>
            <div className="space-y-3">
              {[
                "Scoring built on Etsy-specific ranking signals",
                "Rewrites your listings — doesn't just flag issues",
                "You review everything before it goes live",
                "No SEO knowledge required",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple comparison */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3 border-b border-gray-100">
              <span className="col-span-1"></span>
              <span className="text-center">Other tools</span>
              <span className="text-center text-brand">Listifly</span>
            </div>
            {[
              { label: "Etsy-specific scoring", other: false, us: true },
              { label: "Rewrites listings for you", other: false, us: true },
              { label: "Pushes to Etsy directly", other: false, us: true },
              { label: "Plain-English explanations", other: false, us: true },
              { label: "Works without SEO knowledge", other: false, us: true },
            ].map(({ label, other, us }) => (
              <div key={label} className="grid grid-cols-3 items-center px-5 py-3 border-b border-gray-100 last:border-0 bg-white">
                <span className="text-sm text-gray-600 col-span-1">{label}</span>
                <span className="flex justify-center">
                  {other
                    ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                    : <span className="text-gray-200 text-lg font-light">—</span>}
                </span>
                <span className="flex justify-center">
                  {us && <CheckCircle2 className="w-4 h-4 text-brand" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#fafaf9] border-y border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "4,000+", label: "Etsy sellers using Listifly" },
            { value: "2–3 weeks", label: "Typical time to see more views" },
            { value: "68%", label: "Average increase in listing views" },
            { value: "2.4M+", label: "Listings scored so far" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1.5 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What sellers are saying</h2>
          <p className="text-gray-500 mt-2">A few examples from people who&apos;ve used it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: "Sarah K.",
              shop: "BloomCeramics",
              avatar: "SK",
              text: "My views went from 12 a day to around 80 within a few weeks of updating my listings. I didn't change the products at all — just the titles and tags.",
              detail: "12 → 80 daily views · within 3 weeks",
            },
            {
              name: "Marcus T.",
              shop: "WoodCraftByMarcus",
              avatar: "MT",
              text: "I'd been using the same keywords for three years without realizing they weren't what buyers were actually searching for. Sales went up about 40% after fixing 8 listings.",
              detail: "Sales up ~40% · first month after optimizing",
            },
            {
              name: "Priya R.",
              shop: "ThreadAndSoul",
              avatar: "PR",
              text: "Writing listings used to take me a long time. Now I let Listifly do a draft and I just review it. It's usually better than what I would have written anyway.",
              detail: "Optimized 40 listings · in an afternoon",
            },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-brand fill-brand" />
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              <div className="text-xs text-brand font-medium bg-brand-light px-3 py-1.5 rounded-full self-start">
                {t.detail}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.shop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="bg-[#fafaf9] border-y border-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You stay in control</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We know giving a tool access to your shop can feel like a big step. Here&apos;s exactly what that means.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: Eye,
                title: "Read-only by default",
                desc: "We can read your listing data, but we have no ability to edit, delete, or change anything in your shop without you explicitly approving each update.",
              },
              {
                icon: ShieldCheck,
                title: "You review before anything goes live",
                desc: "Every rewrite is shown to you first. You can edit it, reject it, or approve it. Nothing is pushed to Etsy until you click confirm.",
              },
              {
                icon: CheckCircle2,
                title: "Your data isn't shared or sold",
                desc: "We don't share your shop data with third parties. You can disconnect Listifly from your Etsy account at any time from your Etsy settings.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-800 text-sm mb-1.5">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          See how your listings
          are performing.
        </h2>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Connect your shop and get a score for your first 3 listings —
          free, in about a minute, with no commitment required.
        </p>
        <ConnectButton label="Analyze my listings free →" />
        <p className="text-sm text-gray-400 mt-4">
          Free for your first 3 listings · No credit card · Cancel anytime
        </p>
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
                Listing optimization for Etsy sellers who want more visibility without learning SEO.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your data</p>
              {[
                "Read-only access — we never edit without your approval",
                "Your shop data is never sold or shared",
                "Disconnect anytime from your Etsy settings",
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
                We usually reply within one business day.
              </p>
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
