"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, MessageCircle, UserMinus, UserPlus, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { subscriptions, allUsers, type Subscription } from "@/lib/account-data"

export function SubscriptionsSection() {
  const [mySearch, setMySearch] = useState("")
  const [allSearch, setAllSearch] = useState("")
  const [localSubscriptions, setLocalSubscriptions] = useState(subscriptions)

  const filteredMySubscriptions = useMemo(() => {
    if (!mySearch.trim()) return localSubscriptions.filter((s) => s.isSubscribed)
    const q = mySearch.trim().toLowerCase()
    return localSubscriptions
      .filter((s) => s.isSubscribed)
      .filter((s) => s.name.toLowerCase().includes(q))
  }, [mySearch, localSubscriptions])

  const filteredAllUsers = useMemo(() => {
    const subscribedIds = new Set(
      localSubscriptions.filter((s) => s.isSubscribed).map((s) => s.id)
    )
    let users = allUsers.map((u) => ({
      ...u,
      isSubscribed: subscribedIds.has(u.id),
    }))

    if (allSearch.trim()) {
      const q = allSearch.trim().toLowerCase()
      users = users.filter((u) => u.name.toLowerCase().includes(q))
    }

    return users
  }, [allSearch, localSubscriptions])

  const handleToggleSubscription = (userId: string) => {
    setLocalSubscriptions((prev) => {
      const existing = prev.find((s) => s.id === userId)
      if (existing) {
        return prev.map((s) =>
          s.id === userId ? { ...s, isSubscribed: !s.isSubscribed } : s
        )
      }
      const user = allUsers.find((u) => u.id === userId)
      if (user) {
        return [...prev, { ...user, isSubscribed: true }]
      }
      return prev
    })
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Подписки
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Управляйте подписками и находите новых людей
        </p>
      </div>

      {/* My Subscriptions */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Мои подписки</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск по подпискам..."
            value={mySearch}
            onChange={(e) => setMySearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {filteredMySubscriptions.length > 0 ? (
          <div className="space-y-2">
            {filteredMySubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onToggle={() => handleToggleSubscription(sub.id)}
                showUnsubscribe
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">
              {mySearch ? "Подписки не найдены" : "У вас пока нет подписок"}
            </p>
          </div>
        )}
      </section>

      {/* All Users */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Все пользователи</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Найти пользователя..."
            value={allSearch}
            onChange={(e) => setAllSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAllUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onToggle={() => handleToggleSubscription(user.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function SubscriptionCard({
  subscription,
  onToggle,
  showUnsubscribe,
}: {
  subscription: Subscription
  onToggle: () => void
  showUnsubscribe?: boolean
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-3 transition-colors hover:border-[rgba(255,255,255,0.15)]">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
        <Image
          src={subscription.avatar}
          alt={subscription.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">
          {subscription.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {subscription.publicationsCount} публикаций
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
        >
          <MessageCircle className="h-4 w-4" />
        </button>

        {showUnsubscribe && (
          <button
            type="button"
            onClick={onToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-muted-foreground transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <UserMinus className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function UserCard({
  user,
  onToggle,
}: {
  user: Subscription
  onToggle: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 text-center transition-colors hover:border-[rgba(255,255,255,0.15)]">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[rgba(255,255,255,0.1)]">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{user.name}</p>
        {user.level && (
          <p className="text-xs text-muted-foreground">{user.level}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {user.publicationsCount} публикаций
        </p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          user.isSubscribed
            ? "bg-primary/15 text-primary"
            : "bg-[rgba(255,255,255,0.06)] text-muted-foreground hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
        )}
      >
        {user.isSubscribed ? (
          <>
            <Check className="h-4 w-4" />
            Подписан
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Подписаться
          </>
        )}
      </button>
    </div>
  )
}
