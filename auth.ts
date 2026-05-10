import NextAuth, { customFetch } from "next-auth"
import type { OAuthConfig, OAuthUserConfig } from "@auth/core/providers"
import { prisma } from "@/lib/prisma"
import { getEtsyUser, getEtsyShop } from "@/lib/etsy"

interface EtsyProfile {
  user_id: number
  primary_email: string
}

function EtsyProvider(options: OAuthUserConfig<EtsyProfile>): OAuthConfig<EtsyProfile> {
  return {
    id: "etsy",
    name: "Etsy",
    type: "oauth",
    authorization: {
      url: "https://www.etsy.com/oauth/connect",
      params: {
        scope: "listings_r listings_w shops_r",
        prompt: "login",
      },
    },
    token: "https://api.etsy.com/v3/public/oauth/token",
    userinfo: {
      url: "https://openapi.etsy.com/v3/application/users/me",
      async request({ tokens }: { tokens: { access_token?: string } }) {
        const res = await fetch("https://openapi.etsy.com/v3/application/users/me", {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "x-api-key": `${process.env.ETSY_CLIENT_ID}:${process.env.ETSY_CLIENT_SECRET}`,
          },
        })
        return res.json()
      },
    },
    profile(profile: EtsyProfile) {
      return {
        id: String(profile.user_id),
        email: profile.primary_email,
        name: profile.primary_email,
      }
    },
    checks: ["pkce", "state"],
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    [customFetch]: async (url: RequestInfo | URL, init?: RequestInit) => {
      const urlStr = url instanceof Request ? url.url : url.toString()
      // Intercept the token endpoint to use PKCE-only (no client_secret in body)
      if (urlStr.includes("/oauth/token") && init?.method === "POST") {
        const old = new URLSearchParams(init.body as string)
        const body = new URLSearchParams()
        body.set("grant_type", "authorization_code")
        body.set("client_id", process.env.ETSY_CLIENT_ID!)
        if (old.get("redirect_uri")) body.set("redirect_uri", old.get("redirect_uri")!)
        if (old.get("code")) body.set("code", old.get("code")!)
        if (old.get("code_verifier")) body.set("code_verifier", old.get("code_verifier")!)
        const res = await fetch(urlStr, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        })
        const json = await res.json()
        return new Response(JSON.stringify(json), {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        })
      }
      return fetch(url, init)
    },
  }
}

const nextAuth = NextAuth({
  trustHost: true,
  providers: [
    EtsyProvider({
      clientId: process.env.ETSY_CLIENT_ID!,
      clientSecret: process.env.ETSY_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user
      const { pathname } = nextUrl
      if (pathname.startsWith("/api/auth") || pathname === "/api/paypal/setup") return true
      if (pathname === "/" || pathname === "/login") {
        if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl))
        return Response.redirect(new URL("/login", nextUrl))
      }
      return isLoggedIn
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const etsyProfile = profile as unknown as EtsyProfile
        const accessToken = account.access_token!
        const refreshToken = account.refresh_token ?? null
        const expiresAt = account.expires_at
          ? new Date(account.expires_at * 1000)
          : null

        // Fetch shop info — /users/me returns shop_id directly
        let shopId: string | null = null
        let shopName: string | null = null
        try {
          const etsyUser = await getEtsyUser(accessToken)
          if (etsyUser.shop_id) {
            shopId = String(etsyUser.shop_id)
            const shop = await getEtsyShop(shopId, accessToken)
            shopName = shop.shop_name
          }
        } catch {
          // shop info fetch failed, continue without it
        }

        const user = await prisma.user.upsert({
          where: { etsyUserId: String(etsyProfile.user_id) },
          update: {
            accessToken,
            refreshToken,
            tokenExpiry: expiresAt,
            // only overwrite shopId/shopName if we successfully fetched them
            ...(shopId && { shopId, shopName }),
          },
          create: {
            etsyUserId: String(etsyProfile.user_id),
            accessToken,
            refreshToken,
            tokenExpiry: expiresAt,
            shopId,
            shopName,
          },
        })

        token.userId = user.id
        token.shopId = user.shopId
        token.shopName = user.shopName
        token.accessToken = accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId as string
      session.user.shopId = token.shopId as string | null
      session.user.shopName = token.shopName as string | null
      return session
    },
  },
})

export const { handlers, auth, signIn, signOut } = nextAuth
export const { GET, POST } = nextAuth.handlers

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      shopId: string | null
      shopName: string | null
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}
