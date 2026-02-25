"use client"

import Image from "next/image"
import {
  FileText,
  User,
  Megaphone,
  ShoppingBag,
  Bell,
  Sparkles,
} from "lucide-react"
import { feedItems, feedTypeLabels, type FeedItem } from "@/lib/account-data"

const feedTypeIcons: Record<FeedItem["type"], React.ElementType> = {
  article: FileText,
  user_post: User,
  course_promo: Sparkles,
  artifact: ShoppingBag,
  announcement: Bell,
}

const feedTypeColors: Record<FeedItem["type"], string> = {
  article: "bg-blue-500/20 text-blue-400",
  user_post: "bg-purple-500/20 text-purple-400",
  course_promo: "bg-primary/20 text-primary",
  artifact: "bg-amber-500/20 text-amber-400",
  announcement: "bg-red-500/20 text-red-400",
}

export function DashboardSection() {
  return (
    <div className="space-y-4 p-4 lg:p-6">
      <div>
        <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Дашборд
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Новости и обновления от ваших подписок
        </p>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function FeedCard({ item }: { item: FeedItem }) {
  const Icon = feedTypeIcons[item.type]
  const colorClass = feedTypeColors[item.type]
  const isPromo = item.type === "course_promo" || item.type === "artifact"

  const formattedDate = new Date(item.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <article
      className={`group overflow-hidden rounded-xl border transition-colors ${
        isPromo
          ? "border-primary/30 bg-primary/5 hover:border-primary/50"
          : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)]"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {item.image && (
          <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-square sm:w-32 md:w-40">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
            >
              <Icon className="h-3 w-3" />
              {feedTypeLabels[item.type]}
            </span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>

          <h3 className="font-medium text-foreground group-hover:text-primary">
            {item.title}
          </h3>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.preview}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
              <Image
                src={item.authorAvatar}
                alt={item.authorName}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {item.authorName}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
