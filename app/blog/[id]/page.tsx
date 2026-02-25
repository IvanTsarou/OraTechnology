"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Copy,
  Send,
  Mail,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogComments } from "@/components/blog-comments"
import { cn } from "@/lib/utils"
import {
  getPostById,
  getAuthorById,
  getCategoryById,
  getCommentsByPostId,
} from "@/lib/blog-data"

export default function BlogPostPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const post = getPostById(id)

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likes ?? 0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
          <div className="mb-4 text-6xl opacity-30">📝</div>
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Статья не найдена
          </h1>
          <Link
            href="/blog"
            className="mt-4 text-sm text-primary hover:underline"
          >
            Вернуться к блогу
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const author = getAuthorById(post.authorId)
  const category = getCategoryById(post.categoryId)
  const comments = getCommentsByPostId(post.id)

  const formattedDate = new Date(post.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const contentHtml = post.content
    .split("\n\n")
    .map((paragraph, i) => {
      if (paragraph.startsWith("## ")) {
        return `<h2 class="mt-8 mb-4 font-serif text-xl font-semibold text-foreground">${paragraph.slice(3)}</h2>`
      }
      if (paragraph.startsWith("> ")) {
        return `<blockquote class="my-6 border-l-4 border-primary/50 pl-4 italic text-muted-foreground">${paragraph.slice(2)}</blockquote>`
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph
          .split("\n")
          .map((line) => `<li>${line.slice(2)}</li>`)
          .join("")
        return `<ul class="my-4 ml-6 list-disc space-y-1 text-foreground/90">${items}</ul>`
      }
      if (paragraph.match(/^\d+\. /)) {
        const items = paragraph
          .split("\n")
          .map((line) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
          .join("")
        return `<ol class="my-4 ml-6 list-decimal space-y-1 text-foreground/90">${items}</ol>`
      }
      if (paragraph.includes("**")) {
        const formatted = paragraph.replace(
          /\*\*([^*]+)\*\*/g,
          '<strong class="font-semibold text-foreground">$1</strong>'
        )
        return `<p class="my-4 leading-relaxed text-foreground/90">${formatted}</p>`
      }
      return `<p class="my-4 leading-relaxed text-foreground/90">${paragraph}</p>`
    })
    .join("")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9] lg:aspect-[3/1]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#232946] via-[#232946]/60 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-4 sm:pb-8 lg:px-8">
            <Link
              href="/blog"
              className="mb-3 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary sm:mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              К блогу
            </Link>

            <span className="mb-2 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground sm:mb-3">
              {category?.label ?? post.categoryId}
            </span>

            <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground sm:text-2xl lg:text-3xl">
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4 sm:gap-4">
              {author && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)] sm:h-10 sm:w-10">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {author.name}
                    </span>
                    <button
                      type="button"
                      className="hidden items-center gap-1 text-xs text-primary hover:underline sm:flex"
                    >
                      <Mail className="h-3 w-3" />
                      Написать
                    </button>
                  </div>
                </div>
              )}

              <span className="text-xs text-muted-foreground sm:text-sm">{formattedDate}</span>

              <div className="flex items-center gap-3 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {likesCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {comments.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <article
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </section>

        {/* Interaction panel */}
        <section className="border-y border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-3 sm:py-4">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 px-4 sm:gap-3 lg:px-8">
            <button
              type="button"
              onClick={handleLike}
              className={cn(
                "flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors sm:px-4",
                isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-[rgba(255,255,255,0.06)] text-muted-foreground active:bg-[rgba(255,255,255,0.1)]"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="hidden sm:inline">{isLiked ? "Понравилось" : "Нравится"}</span>
              <span>({likesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "flex min-h-[44px] items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors sm:px-4",
                isBookmarked
                  ? "bg-primary/20 text-primary"
                  : "bg-[rgba(255,255,255,0.06)] text-muted-foreground active:bg-[rgba(255,255,255,0.1)]"
              )}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
              <span className="hidden sm:inline">{isBookmarked ? "В избранном" : "В избранное"}</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.06)] px-3 text-sm font-medium text-muted-foreground transition-colors active:bg-[rgba(255,255,255,0.1)] sm:px-4"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Поделиться</span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full right-0 z-30 mb-2 w-48 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#2d3561] p-2 shadow-xl sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      setShowShareMenu(false)
                    }}
                    className="flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 text-sm text-muted-foreground active:bg-[rgba(255,255,255,0.06)]"
                  >
                    <Copy className="h-4 w-4" />
                    Копировать
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.open(
                        `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                        "_blank"
                      )
                      setShowShareMenu(false)
                    }}
                    className="flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 text-sm text-muted-foreground active:bg-[rgba(255,255,255,0.06)]"
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </button>
                </div>
              )}
            </div>

            {author && (
              <button
                type="button"
                className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.06)] px-3 text-sm font-medium text-muted-foreground transition-colors active:bg-[rgba(255,255,255,0.1)] sm:px-4"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Написать автору</span>
              </button>
            )}
          </div>
        </section>

        {/* Comments */}
        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <BlogComments comments={comments} postId={post.id} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
