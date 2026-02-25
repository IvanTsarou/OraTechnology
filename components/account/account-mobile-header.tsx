"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Settings, LogOut, ChevronDown, X, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/account-data"

export function AccountMobileHeader() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[#232946]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
        >
          <Home className="h-5 w-5" />
        </Link>

        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[rgba(255,255,255,0.06)]"
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
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-foreground">
              {currentUser.name.split(" ")[0]}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              showMenu && "rotate-180"
            )}
          />
        </button>
      </header>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setShowMenu(false)}
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
