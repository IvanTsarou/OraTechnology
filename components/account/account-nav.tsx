"use client"

import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  BookOpen,
  NotebookPen,
  Users,
  MessageCircle,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { currentUser, getTotalUnreadMessages } from "@/lib/account-data"

export type AccountSection =
  | "dashboard"
  | "courses"
  | "diary"
  | "subscriptions"
  | "messages"
  | "favorites"

interface AccountNavProps {
  activeSection: AccountSection
  onSectionChange: (section: AccountSection) => void
}

const navItems: { id: AccountSection; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { id: "courses", label: "Мои курсы", icon: BookOpen },
  { id: "diary", label: "Дневник", icon: NotebookPen },
  { id: "subscriptions", label: "Подписки", icon: Users },
  { id: "messages", label: "Сообщения", icon: MessageCircle },
  { id: "favorites", label: "Избранное", icon: Bookmark },
]

export function AccountNav({ activeSection, onSectionChange }: AccountNavProps) {
  const unreadMessages = getTotalUnreadMessages()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      {/* User profile */}
      <div className="border-b border-[rgba(255,255,255,0.08)] p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">
              {currentUser.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.level} · {currentUser.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            const showBadge = item.id === "messages" && unreadMessages > 0

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-[rgba(255,255,255,0.04)] hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {showBadge && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                      {unreadMessages}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-[rgba(255,255,255,0.08)] p-2">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          Настройки
        </button>
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.04)] hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Выйти
        </Link>
      </div>
    </aside>
  )
}
