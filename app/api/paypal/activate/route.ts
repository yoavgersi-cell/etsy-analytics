import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const PAYPAL_BASE = process.env.PAYPAL_SANDBOX === "true"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"

async function getPayPalToken(): Promise<string> {
  const creds = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64")
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { subscriptionId } = await request.json()
  if (!subscriptionId) {
    return Response.json({ error: "Missing subscriptionId" }, { status: 400 })
  }

  try {
    // Verify the subscription is actually active with PayPal
    const token = await getPayPalToken()
    const subRes = await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const sub = await subRes.json()

    if (sub.status !== "ACTIVE") {
      console.error(`[paypal/activate] subscription not active: ${sub.status}`)
      return Response.json({ error: "Subscription not active" }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { plan: "pro", paypalSubscriptionId: subscriptionId },
    })

    console.log(`[paypal/activate] upgraded userId=${session.user.id} subId=${subscriptionId}`)
    return Response.json({ success: true })
  } catch (err) {
    console.error("[paypal/activate] error", err)
    return Response.json({ error: "Failed to activate subscription" }, { status: 500 })
  }
}
