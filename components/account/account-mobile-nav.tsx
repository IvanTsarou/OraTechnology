"use client"

import {
  LayoutDashboard,
  BookOpen,
  NotebookPen,
  Users,
  MessageCircle,
  Bookmark,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getTotalUnreadMessages } from "@/lib/account-data"
import type { AccountSection } from "./account-nav"

interface AccountMobileNavProps {
  activeSection: AccountSection
  onSectionChange: (section: AccountSection) => void
}

const navItems: { id: AccountSection; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Главная", icon: LayoutDashboard },
  { id: "courses", label: "Курсы", icon: BookOpen },
  { id: "diary", label: "Дневник", icon: NotebookPen },
  { id: "subscriptions", label: "Люди", icon: Users },
  { id: "messages", label: "Чаты", icon: MessageCircle },
  { id: "favorites", label: "Избранное", icon: Bookmark },
]

export function AccountMobileNav({
  activeSection,
  onSectionChange,
}: AccountMobileNavProps) {
  const unreadMessages = getTotalUnreadMessages()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(255,255,255,0.08)] bg-[#232946]/95 backdrop-blur-xl safe-bottom lg:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const showBadge = item.id === "messages" && unreadMessages > 0

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 rounded-lg transition-colors active:bg-[rgba(255,255,255,0.06)]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {showBadge && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadMessages}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
