import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { SignOutButton } from "@/components/sign-out-button"
import { ListiflyLogo } from "@/components/ranksy-logo"
import { NavLinks } from "@/components/nav-links"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } })
  const isPro = user?.plan === "pro"

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-white border-b border-warm-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
              <ListiflyLogo size={26} />
              <span className="font-bold text-gray-900 text-base tracking-tight">Listifly</span>
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <NavLinks />
          </div>
          <div className="flex items-center gap-2.5">
            {!isPro && (
              <Link
                href="/upgrade"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand border border-brand/30 hover:bg-brand-light px-3 py-1.5 rounded-full transition-colors"
              >
                Upgrade to Pro
              </Link>
            )}
            {session.user.shopName && (
              <div className="hidden md:flex items-center gap-1.5 bg-surface border border-warm-border text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {session.user.shopName}
              </div>
            )}
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">{children}</main>

      <footer className="border-t border-warm-border mt-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ListiflyLogo size={16} />
            <p className="text-xs text-gray-400">© 2026 Listifly · Not affiliated with Etsy, Inc.</p>
          </div>
          <a href="mailto:hello@listifly.app" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            hello@listifly.app
          </a>
        </div>
      </footer>
    </div>
  )
}
