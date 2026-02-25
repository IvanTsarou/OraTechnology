"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#232946]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-serif text-lg tracking-wide text-foreground sm:inline">
            Ora Technology
          </span>
          <span className="font-serif text-lg tracking-wide text-foreground sm:hidden">
            Ora
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary"
            aria-label="На главную"
            title="На главную"
          >
            <Home className="h-4 w-4" />
          </Link>
          <a
            href="#"
            className="glow-button flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <User className="h-4 w-4" />
            <span>Личный кабинет</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[57px] z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile nav */}
      <div
        className={`fixed inset-x-0 top-[57px] z-50 max-h-[calc(100vh-57px)] transform overflow-y-auto overscroll-contain border-t border-[rgba(255,255,255,0.06)] bg-[#232946]/98 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 safe-bottom" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-h-[48px] items-center rounded-lg px-4 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[rgba(94,234,212,0.08)] text-primary"
                    : "text-muted-foreground active:bg-[rgba(255,255,255,0.04)] active:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="mt-4 flex items-center gap-3 border-t border-[rgba(255,255,255,0.06)] pt-4">
            <Link
              href="/"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground"
              aria-label="На главную"
            >
              <Home className="h-5 w-5" />
            </Link>
            <a
              href="#"
              className="glow-button flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-base font-medium text-primary-foreground"
            >
              <User className="h-5 w-5" />
              Личный кабинет
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
