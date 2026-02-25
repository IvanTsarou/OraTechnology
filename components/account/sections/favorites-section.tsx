"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  FileText,
  Newspaper,
  MessageSquare,
  MessageCircle,
  Trash2,
  Calendar,
  Share2,
  ShoppingCart,
  Eye,
  Heart,
  Bookmark,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getFavoritesByType,
  favoriteTypeLabels,
  type FavoriteType,
  type FavoriteItem,
} from "@/lib/account-data"

const favoriteTypeIcons: Record<FavoriteType, React.ElementType> = {
  course: BookOpen,
  article: FileText,
  blog: Newspaper,
  message: MessageSquare,
  comment: MessageCircle,
}

const allTypes: (FavoriteType | "all")[] = [
  "all",
  "course",
  "article",
  "blog",
  "message",
  "comment",
]

export function FavoritesSection() {
  const [activeType, setActiveType] = useState<FavoriteType | "all">("all")
  const [localFavorites, setLocalFavorites] = useState(getFavoritesByType("all"))

  const filteredFavorites =
    activeType === "all"
      ? localFavorites
      : localFavorites.filter((f) => f.type === activeType)

  const handleRemove = (id: string) => {
    setLocalFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  const getEmptyMessage = (type: FavoriteType | "all") => {
    switch (type) {
      case "course":
        return "Добавляйте курсы в избранное, чтобы быстро к ним возвращаться"
      case "article":
        return "Сохраняйте интересные статьи для повторного чтения"
      case "blog":
        return "Отмечайте понравившиеся публикации из блога"
      case "message":
        return "Сохраняйте важные сообщения из чатов"
      case "comment":
        return "Добавляйте полезные комментарии в избранное"
      default:
        return "В избранном пока ничего нет"
    }
  }

  const renderFavoriteItem = (item: FavoriteItem) => {
    switch (item.type) {
      case "course":
        return (
          <FavoriteCourseCard
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item.id)}
          />
        )
      case "article":
        return (
          <FavoriteArticleCard
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item.id)}
          />
        )
      case "blog":
        return (
          <FavoriteBlogCard
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item.id)}
          />
        )
      default:
        return (
          <FavoriteCompactCard
            key={item.id}
            item={item}
            onRemove={() => handleRemove(item.id)}
          />
        )
    }
  }

  const gridTypes: FavoriteType[] = ["course", "article", "blog"]
  const showGrid =
    activeType !== "all" && gridTypes.includes(activeType as FavoriteType)
  const mixedView = activeType === "all"

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <div>
        <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Избранное
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Сохранённый контент для быстрого доступа
        </p>
      </div>

      {/* Type filter */}
      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
        {allTypes.map((type) => {
          const count =
            type === "all"
              ? localFavorites.length
              : localFavorites.filter((f) => f.type === type).length
          const Icon = type === "all" ? null : favoriteTypeIcons[type]

          return (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeType === type
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-[rgba(255,255,255,0.1)] text-muted-foreground hover:border-[rgba(255,255,255,0.2)] hover:text-foreground"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {favoriteTypeLabels[type]}
              <span className="text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Favorites list */}
      {filteredFavorites.length > 0 ? (
        mixedView ? (
          <div className="space-y-6">
            {/* Grid cards for courses, articles, blog */}
            {(() => {
              const gridItems = filteredFavorites.filter((f) =>
                gridTypes.includes(f.type)
              )
              const compactItems = filteredFavorites.filter(
                (f) => !gridTypes.includes(f.type)
              )

              return (
                <>
                  {gridItems.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {gridItems.map(renderFavoriteItem)}
                    </div>
                  )}
                  {compactItems.length > 0 && (
                    <div className="space-y-3">
                      {compactItems.map(renderFavoriteItem)}
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        ) : showGrid ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredFavorites.map(renderFavoriteItem)}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFavorites.map(renderFavoriteItem)}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,255,255,0.04)]">
            {activeType === "all" ? (
              <BookOpen className="h-8 w-8 text-muted-foreground/50" />
            ) : (
              (() => {
                const Icon = favoriteTypeIcons[activeType]
                return <Icon className="h-8 w-8 text-muted-foreground/50" />
              })()
            )}
          </div>
          <p className="text-muted-foreground">{getEmptyMessage(activeType)}</p>
        </div>
      )}
    </div>
  )
}

function FavoriteCourseCard({
  item,
  onRemove,
}: {
  item: FavoriteItem
  onRemove: () => void
}) {
  return (
    <article className="glass-card group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1">
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-red-500/80 hover:text-white"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.04)]">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug tracking-wide text-foreground">
          {item.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2">
          {item.sourceAvatar && (
            <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
              <Image
                src={item.sourceAvatar}
                alt={item.source}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
          )}
          <span className="text-sm text-muted-foreground">{item.source}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs text-muted-foreground">
            Добавлено {formatDate(item.addedDate)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-muted-foreground transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="glow-button flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Купить</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function FavoriteArticleCard({
  item,
  onRemove,
}: {
  item: FavoriteItem
  onRemove: () => void
}) {
  return (
    <article className="glass-card group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1">
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-red-500/80 hover:text-white"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.04)]">
            <FileText className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/60 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.5)] px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          Статья
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug tracking-wide text-foreground">
          {item.title}
        </h3>

        {/* Author and date */}
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            {item.sourceAvatar && (
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                <Image
                  src={item.sourceAvatar}
                  alt={item.source}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            )}
            <span className="truncate">{item.source}</span>
          </div>
          <time className="shrink-0 text-xs">{formatDate(item.addedDate)}</time>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.preview}
        </p>
      </div>
    </article>
  )
}

function FavoriteBlogCard({
  item,
  onRemove,
}: {
  item: FavoriteItem
  onRemove: () => void
}) {
  return (
    <article className="glass-card group relative flex flex-col overflow-hidden rounded-xl">
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:bg-red-500/80 hover:text-white"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.04)]">
            <Newspaper className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/80 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
          Блог
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </h3>

        {/* Author and date */}
        <div className="flex items-center gap-3">
          {item.sourceAvatar && (
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                <Image
                  src={item.sourceAvatar}
                  alt={item.source}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <span className="text-xs text-muted-foreground">{item.source}</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDate(item.addedDate)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-primary/20 px-2.5 text-xs text-primary">
            <Bookmark className="h-4 w-4 fill-current" />
            <span className="hidden sm:inline">В избранном</span>
          </span>
        </div>
      </div>
    </article>
  )
}

function FavoriteCompactCard({
  item,
  onRemove,
}: {
  item: FavoriteItem
  onRemove: () => void
}) {
  const Icon = favoriteTypeIcons[item.type]

  return (
    <article className="group flex gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 transition-colors hover:border-[rgba(255,255,255,0.15)]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.06)] px-2 py-0.5 text-xs text-muted-foreground">
            <Icon className="h-3 w-3" />
            {favoriteTypeLabels[item.type]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatDate(item.addedDate)}
          </span>
        </div>

        <h3 className="mt-2 font-medium text-foreground group-hover:text-primary">
          {item.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {item.preview}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {item.sourceAvatar && (
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
              <Image
                src={item.sourceAvatar}
                alt={item.source}
                fill
                className="object-cover"
                sizes="20px"
              />
            </div>
          )}
          <span className="text-xs text-muted-foreground">{item.source}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 self-start rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </article>
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  })
}
