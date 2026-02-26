"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, LogOut, ChevronDown, Sparkles, Home } from "lucide-react"
import { cn } from "@/lib/utils"
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

export function AccountHeader() {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b border-[rgba(255,255,255,0.06)] bg-[#232946]/85 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-serif text-lg tracking-wide text-foreground">
            Ora Technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
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
        <div className="flex items-center gap-3">
          <Link
            href="/main"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary"
            aria-label="Главная"
            title="Главная"
          >
            <Home className="h-4 w-4" />
          </Link>

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-10 items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 transition-colors hover:bg-primary/20"
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-primary/30">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {currentUser.name.split(" ")[0]}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  showMenu && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#2d3561] p-2 shadow-xl">
                <div className="border-b border-[rgba(255,255,255,0.08)] px-3 pb-3 pt-2">
                  <p className="font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.level}</p>
                </div>
                <div className="py-2">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    Настройки
                  </button>
                  <Link
                    href="/"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Выйти
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
