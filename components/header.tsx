"use client"

import { useState } from "react"
import { Menu, X, User, Home, Sparkles } from "lucide-react"

const navItems = [
  { label: "Курсы", href: "#", active: true },
  { label: "Библиотека", href: "#" },
  { label: "Учителя", href: "#" },
  { label: "Проекты", href: "#" },
  { label: "Учебный план", href: "#" },
  { label: "Артефакты", href: "#" },
  { label: "Блог", href: "#" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#1a1f35]/80 border-b border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-serif text-lg tracking-wide text-foreground">
            Ora Technology
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#"
            className="flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] p-2 text-foreground transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary"
            aria-label="На главную"
            title="На главную"
          >
            <Home className="h-4 w-4" />
          </a>
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
        <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#1a1f35]/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.active
                    ? "text-primary bg-[rgba(94,234,212,0.08)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.06)] pt-3">
              <a
                href="#"
                className="flex w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] p-2.5 text-foreground"
                aria-label="На главную"
                title="На главную"
              >
                <Home className="h-4 w-4" />
              </a>
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
