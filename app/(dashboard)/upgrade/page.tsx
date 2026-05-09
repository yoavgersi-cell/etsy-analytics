"use client"

import { useRouter } from "next/navigation"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { CheckCircle2, X, Zap, ShieldCheck, ArrowRight } from "lucide-react"

const COMPARE = [
  { label: "Listing analyses", free: "3 total", pro: "Unlimited" },
  { label: "Score breakdown", free: true, pro: true },
  { label: "Ranking gap analysis", free: true, pro: true },
  { label: "Prioritized fix queue", free: false, pro: true },
  { label: "Content writer (titles, description, 13 tags)", free: false, pro: true },
  { label: "Re-analyze after edits", free: false, pro: true },
  { label: "Priority email support", free: false, pro: true },
]

const TESTIMONIAL = {
  name: "Sarah K.",
  shop: "BloomCeramics",
  text: "Went from 12 views/day to 80+ after fixing the gaps Listifly flagged. Worth every penny.",
  avatar: "SK",
}

export default function UpgradePage() {
  const router = useRouter()

  async function onApprove(data: { subscriptionID?: string | null }) {
    if (!data.subscriptionID) return
    const res = await fetch("/api/paypal/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: data.subscriptionID }),
    })
    if (res.ok) {
      router.push("/dashboard?upgraded=1")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5" />
          You've used all 3 free analyses
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Upgrade to see every opportunity in your shop
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Pro sellers score every listing, fix every gap, and generate optimized content — all without limits.
          Most recoup the cost in days.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Left — comparison */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-warm-border overflow-hidden">

          {/* Plan header */}
          <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3 border-b border-warm-border bg-surface">
            <span>Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center text-brand">Pro</span>
          </div>

          <div className="divide-y divide-gray-50">
            {COMPARE.map(({ label, free, pro }) => (
              <div key={label} className="grid grid-cols-3 items-center px-6 py-3">
                <span className="text-sm text-gray-700">{label}</span>
                <span className="flex justify-center">
                  {typeof free === "boolean"
                    ? free
                      ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                      : <X className="w-4 h-4 text-gray-200" />
                    : <span className="text-xs text-gray-400 font-medium">{free}</span>}
                </span>
                <span className="flex justify-center">
                  {typeof pro === "boolean"
                    ? pro
                      ? <CheckCircle2 className="w-4 h-4 text-brand" />
                      : <X className="w-4 h-4 text-gray-200" />
                    : <span className="text-xs font-semibold text-brand">{pro}</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="border-t border-warm-border bg-surface p-5">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-brand-light text-brand-muted text-xs font-bold flex items-center justify-center shrink-0">
                {TESTIMONIAL.avatar}
              </div>
              <div>
                <p className="text-sm text-gray-600 italic leading-relaxed">"{TESTIMONIAL.text}"</p>
                <p className="text-xs text-gray-400 mt-1">{TESTIMONIAL.name} · {TESTIMONIAL.shop}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — payment */}
        <div className="lg:col-span-2 space-y-4">

          {/* Price card */}
          <div className="bg-ink rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wide uppercase">
              Most popular
            </div>
            <div className="flex items-center gap-2 mb-4">
              <ListiflyLogo size={20} />
              <span className="font-bold text-white text-sm">Listifly Pro</span>
            </div>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-extrabold text-white leading-none">$19</span>
              <span className="text-white/40 mb-1 text-sm">/month</span>
            </div>
            <p className="text-xs text-white/40 mb-5">Cancel anytime from your PayPal account. No hidden fees.</p>

            <div className="space-y-2">
              {["Unlimited analyses", "Content writer included", "Priority support"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* PayPal */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <p className="text-sm font-semibold text-gray-800 mb-1">Secure checkout</p>
            <p className="text-xs text-gray-400 mb-4">Recurring billing via PayPal. Cancel anytime — no questions asked.</p>

            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
                vault: true,
                intent: "subscription",
              }}
            >
              <PayPalButtons
                style={{ shape: "pill", color: "gold", layout: "vertical", label: "subscribe" }}
                createSubscription={(_data, actions) =>
                  actions.subscription.create({
                    plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID ?? "",
                  })
                }
                onApprove={onApprove}
                onError={(err) => console.error("[PayPal] error", err)}
              />
            </PayPalScriptProvider>
          </div>

          {/* Guarantee */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-800">No risk — cancel anytime</p>
              <p className="text-xs text-green-600 mt-0.5 leading-snug">
                Not happy? Cancel directly from PayPal. Your analyses are yours to keep.
              </p>
            </div>
          </div>

          <a
            href="/dashboard"
            className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors w-full py-2"
          >
            Go back to dashboard
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
