'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, Home, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '@/constants'
import type { NavItem } from '@/types'

interface NavLinkProps {
  readonly item: NavItem
  readonly isActive: boolean
  readonly isMobile?: boolean
}

function NavLink({ item, isActive, isMobile = false }: NavLinkProps) {
  const baseClasses = isMobile
    ? 'flex min-h-[48px] items-center rounded-lg px-4 text-base font-medium transition-colors'
    : 'rounded-lg px-3 py-2 text-sm font-medium transition-colors'

  const activeClasses = isMobile
    ? 'bg-[rgba(94,234,212,0.08)] text-primary'
    : 'text-primary'

  const inactiveClasses = isMobile
    ? 'text-muted-foreground active:bg-[rgba(255,255,255,0.04)] active:text-foreground'
    : 'text-muted-foreground hover:text-foreground'

  const className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  )
}

function isActiveRoute(href: string, pathname: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        item,
        isActive: isActiveRoute(item.href, pathname),
      })),
    [pathname]
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#232946]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-serif text-lg tracking-wide text-foreground sm:inline">
            Ora Technology
          </span>
          <span className="font-serif text-lg tracking-wide text-foreground sm:hidden">
            Ora
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map(({ item, isActive }) => (
            <NavLink key={item.href} item={item} isActive={isActive} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/main"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground transition-colors hover:border-[rgba(255,255,255,0.25)] hover:text-primary"
            aria-label="Главная"
            title="Главная"
          >
            <Home className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="glow-button flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <User className="h-4 w-4" />
            <span>Личный кабинет</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/main"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-foreground transition-colors active:bg-[rgba(255,255,255,0.06)]"
            aria-label="Главная"
          >
            <Home className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors active:brightness-90"
            aria-label="Личный кабинет"
          >
            <User className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 top-[57px] z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[57px] z-50 max-h-[calc(100vh-57px)] overflow-y-auto overscroll-contain border-t border-[rgba(255,255,255,0.06)] bg-[#232946]/98 backdrop-blur-xl lg:hidden">
          <nav className="safe-bottom flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map(({ item, isActive }) => (
              <NavLink key={item.href} item={item} isActive={isActive} isMobile />
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
