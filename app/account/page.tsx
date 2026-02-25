"use client"

import { useState } from "react"
import { AccountNav, type AccountSection } from "@/components/account/account-nav"
import { AccountMobileNav } from "@/components/account/account-mobile-nav"
import { AccountMobileHeader } from "@/components/account/account-mobile-header"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { DashboardSection } from "@/components/account/sections/dashboard-section"
import { CoursesSection } from "@/components/account/sections/courses-section"
import { DiarySection } from "@/components/account/sections/diary-section"
import { SubscriptionsSection } from "@/components/account/sections/subscriptions-section"
import { FavoritesSection } from "@/components/account/sections/favorites-section"
import { MessagesSection } from "@/components/account/sections/messages-section"

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState<AccountSection>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "courses":
        return <CoursesSection />
      case "diary":
        return <DiarySection />
      case "subscriptions":
        return <SubscriptionsSection />
      case "messages":
        return <MessagesSection />
      case "favorites":
        return <FavoritesSection />
      default:
        return <DashboardSection />
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Mobile header */}
      <AccountMobileHeader />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Left navigation - desktop */}
        <div className="hidden lg:block">
          <AccountNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto pb-20 lg:pb-0">
          {renderSection()}
        </main>

        {/* Right sidebar - desktop & tablet */}
        <div className="hidden xl:block">
          <AccountSidebar />
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <AccountMobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  )
}
