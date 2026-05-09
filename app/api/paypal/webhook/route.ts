import { prisma } from "@/lib/prisma"

const PAYPAL_BASE = process.env.PAYPAL_SANDBOX === "true"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"

async function verifyWebhook(req: Request, rawBody: string): Promise<boolean> {
  try {
    const creds = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64")
    const tokenRes = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${creds}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    })
    const { access_token } = await tokenRes.json()

    const verifyRes = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: req.headers.get("paypal-auth-algo"),
        cert_url: req.headers.get("paypal-cert-url"),
        transmission_id: req.headers.get("paypal-transmission-id"),
        transmission_sig: req.headers.get("paypal-transmission-sig"),
        transmission_time: req.headers.get("paypal-transmission-time"),
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: JSON.parse(rawBody),
      }),
    })
    const { verification_status } = await verifyRes.json()
    return verification_status === "SUCCESS"
  } catch (err) {
    console.error("[paypal/webhook] verification error", err)
    return false
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text()

  const valid = await verifyWebhook(request, rawBody)
  if (!valid) {
    console.warn("[paypal/webhook] invalid signature — rejected")
    return new Response("Forbidden", { status: 403 })
  }

  const event = JSON.parse(rawBody)
  const eventType: string = event.event_type
  const subscriptionId: string = event.resource?.id ?? event.resource?.billing_agreement_id

  console.log(`[paypal/webhook] event=${eventType} subId=${subscriptionId}`)

  try {
    if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED") {
      // Find user by subscription ID and mark as pro
      await prisma.user.updateMany({
        where: { paypalSubscriptionId: subscriptionId },
        data: { plan: "pro" },
      })
    }

    if (
      eventType === "BILLING.SUBSCRIPTION.CANCELLED" ||
      eventType === "BILLING.SUBSCRIPTION.EXPIRED" ||
      eventType === "BILLING.SUBSCRIPTION.SUSPENDED"
    ) {
      await prisma.user.updateMany({
        where: { paypalSubscriptionId: subscriptionId },
        data: { plan: "free" },
      })
      console.log(`[paypal/webhook] downgraded to free subId=${subscriptionId}`)
    }
  } catch (err) {
    console.error("[paypal/webhook] db error", err)
    return new Response("Internal error", { status: 500 })
  }

  return new Response("OK", { status: 200 })
}
