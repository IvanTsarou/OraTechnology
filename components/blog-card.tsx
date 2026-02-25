"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Heart, MessageCircle, Bookmark, Share2, Copy, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/blog-data"
import { getAuthorById, getCategoryById } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const author = getAuthorById(post.authorId)
  const category = getCategoryById(post.categoryId)

  const formattedDate = new Date(post.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <article className="blog-card glass-card group relative flex flex-col overflow-hidden rounded-xl">
      <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10" />

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f35]/80 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
          {category?.label ?? post.categoryId}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Author and date */}
        <div className="flex items-center gap-3">
          {author && (
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <span className="text-xs text-muted-foreground">{author.name}</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {post.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {post.commentsCount}
          </span>
        </div>

        {/* Actions */}
        <div className="relative z-20 mt-auto flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsBookmarked(!isBookmarked)
            }}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs transition-colors",
              isBookmarked
                ? "bg-primary/20 text-primary"
                : "bg-[rgba(255,255,255,0.06)] text-muted-foreground hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
            )}
          >
            <Bookmark className={cn("h-3.5 w-3.5", isBookmarked && "fill-current")} />
            {isBookmarked ? "В избранном" : "В избранное"}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setShowShareMenu(!showShareMenu)
              }}
              className="flex items-center gap-1 rounded-lg bg-[rgba(255,255,255,0.06)] px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
            >
              <Share2 className="h-3.5 w-3.5" />
              Поделиться
            </button>

            {showShareMenu && (
              <div className="absolute bottom-full left-0 z-30 mb-2 w-40 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1a1f35] p-2 shadow-xl">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    navigator.clipboard.writeText(window.location.origin + `/blog/${post.id}`)
                    setShowShareMenu(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Копировать ссылку
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin + `/blog/${post.id}`)}&text=${encodeURIComponent(post.title)}`, "_blank")
                    setShowShareMenu(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                >
                  <Send className="h-3.5 w-3.5" />
                  Telegram
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
