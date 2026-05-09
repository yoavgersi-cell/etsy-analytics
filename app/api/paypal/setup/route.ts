// ONE-TIME SETUP ROUTE — delete this file after use
// Visit http://localhost:3000/api/paypal/setup to create your PayPal product + plan

const PAYPAL_BASE = process.env.PAYPAL_SANDBOX === "true"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"

async function getToken(): Promise<string> {
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
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`)
  return data.access_token
}

export async function GET() {
  try {
    const token = await getToken()

    // 1. Create product
    const productRes = await fetch(`${PAYPAL_BASE}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Ranksy Pro",
        description: "Unlimited listing analysis and content generation for Etsy sellers.",
        type: "SERVICE",
        category: "SOFTWARE",
      }),
    })
    const product = await productRes.json()
    if (!product.id) throw new Error(`Product error: ${JSON.stringify(product)}`)

    // 2. Create monthly plan
    const planRes = await fetch(`${PAYPAL_BASE}/v1/billing/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
        name: "Ranksy Pro — Monthly",
        description: "Unlimited listing analyses, content writer, ranking gap analysis.",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 0, // 0 = never expires
            pricing_scheme: {
              fixed_price: { value: "19", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 3,
        },
      }),
    })
    const plan = await planRes.json()
    if (!plan.id) throw new Error(`Plan error: ${JSON.stringify(plan)}`)

    return Response.json({
      success: true,
      product_id: product.id,
      plan_id: plan.id,
      next_step: `Add this to your .env.local → NEXT_PUBLIC_PAYPAL_PLAN_ID=${plan.id}`,
    })
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
