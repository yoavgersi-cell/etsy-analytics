"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLinks() {
  const path = usePathname()
  const active = "px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-900 bg-gray-100"
  const inactive = "px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"

  return (
    <nav className="flex items-center gap-0.5">
      <Link href="/dashboard" className={path === "/dashboard" ? active : inactive}>
        Dashboard
      </Link>
      <Link href="/tools/writer" className={path.startsWith("/tools") ? active : inactive}>
        Content Writer
      </Link>
    </nav>
  )
}
