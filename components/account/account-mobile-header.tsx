"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Home,
} from "lucide-react"
import { currentUser } from "@/lib/account-data"

const navItems = [
  { label: "Курсы", href: "/" },
  { label: "Библиотека", href: "/library" },
  { label: "Учителя", href: "/teachers" },
  { label: "Проекты", href: "/projects" },
  { label: "Учебный план", href: "/curriculum" },
  { label: "Артефакты", href: "#" },
  { label: "Блог", href: "/blog" },
]

export function AccountMobileHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
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
    setShowUserMenu(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#232946]/85 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg tracking-wide text-foreground sm:hidden">
              Ora
            </span>
            <span className="hidden font-serif text-lg tracking-wide text-foreground sm:inline">
              Ora Technology
            </span>
          </Link>

          {/* Right: home, user avatar, burger */}
          <div className="flex items-center gap-2">
            <Link
              href="/main"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground transition-colors active:bg-[rgba(255,255,255,0.06)]"
              aria-label="Главная"
            >
              <Home className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-primary/30">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[57px] z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-[57px] z-50 max-h-[calc(100vh-57px)] overflow-y-auto overscroll-contain border-t border-[rgba(255,255,255,0.06)] bg-[#232946]/98 backdrop-blur-xl lg:hidden"
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
          </nav>
        </div>
      )}

      {/* User dropdown menu */}
      {showUserMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="fixed right-4 top-16 z-50 w-64 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#2d3561] p-2 shadow-xl lg:hidden">
            {/* Profile info */}
            <div className="border-b border-[rgba(255,255,255,0.08)] px-3 pb-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/30">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {currentUser.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {currentUser.level}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Настройки
              </button>
              <Link
                href="/"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
