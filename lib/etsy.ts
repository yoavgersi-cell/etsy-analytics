const ETSY_API_BASE = "https://openapi.etsy.com/v3"

export interface EtsyListing {
  listing_id: number
  title: string
  description: string
  tags: string[]
  price: { amount: number; divisor: number; currency_code: string }
  images: { url_fullxfull: string }[]
  state: string
}

export interface EtsyShop {
  shop_id: number
  shop_name: string
}

export interface EtsyUser {
  user_id: number
  shop_id?: number
  primary_email?: string
}

async function etsyFetch(path: string, accessToken: string) {
  const res = await fetch(`${ETSY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-api-key": `${process.env.ETSY_CLIENT_ID}:${process.env.ETSY_CLIENT_SECRET}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Etsy API error ${res.status}: ${text}`)
  }
  return res.json()
}

export async function getEtsyUser(accessToken: string): Promise<EtsyUser> {
  return etsyFetch("/application/users/me", accessToken)
}


export async function getEtsyShop(shopId: string, accessToken: string): Promise<EtsyShop> {
  return etsyFetch(`/application/shops/${shopId}`, accessToken)
}

export async function getListings(shopId: string, accessToken: string): Promise<EtsyListing[]> {
  const data = await etsyFetch(
    `/application/shops/${shopId}/listings/active?limit=100&includes=Images`,
    accessToken
  )
  return data.results ?? []
}

export async function updateEtsyListing(
  etsyListingId: string,
  shopId: string,
  accessToken: string,
  data: { title?: string; description?: string; tags?: string[] }
): Promise<void> {
  const url = `${ETSY_API_BASE}/application/shops/${shopId}/listings/${etsyListingId}`

  const form = new URLSearchParams()
  if (data.title) form.append("title", data.title)
  if (data.description) form.append("description", data.description)
  if (data.tags) {
    for (const tag of data.tags) form.append("tags", tag)
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-api-key": `${process.env.ETSY_CLIENT_ID}:${process.env.ETSY_CLIENT_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Etsy API error ${res.status}: ${text}`)
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string
  refresh_token: string
  expires_in: number
}> {
  const res = await fetch("https://api.etsy.com/v3/public/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.ETSY_CLIENT_ID!,
      refresh_token: refreshToken,
    }),
  })
  if (!res.ok) {
    throw new Error("Failed to refresh Etsy token")
  }
  return res.json()
}
