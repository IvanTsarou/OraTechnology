"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, Home, Sparkles } from "lucide-react"

const navItems = [
  { label: "Курсы", href: "/" },
  { label: "Библиотека", href: "/library" },
  { label: "Учителя", href: "/teachers" },
  { label: "Проекты", href: "/projects" },
  { label: "Учебный план", href: "/curriculum" },
  { label: "Артефакты", href: "#" },
  { label: "Блог", href: "/blog" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#232946]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-serif text-lg tracking-wide text-foreground">
            Ora Technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] p-2 text-foreground transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary"
            aria-label="На главную"
            title="На главную"
          >
            <Home className="h-4 w-4" />
          </Link>
          <a
            href="#"
            className="glow-button flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <User className="h-4 w-4" />
            <span>Личный кабинет</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#232946]/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-[rgba(94,234,212,0.08)] text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] pt-3">
              <Link
                href="/"
                className="flex w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] p-2.5 text-foreground"
                aria-label="На главную"
                title="На главную"
              >
                <Home className="h-4 w-4" />
              </Link>
              <a
                href="#"
                className="glow-button flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <User className="h-4 w-4" />
                Личный кабинет
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
