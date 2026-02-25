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
          <div className="relative aspect-[21/9] w-full overflow-hidden lg:aspect-[3/1]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f35] via-[#1a1f35]/60 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 lg:px-8">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              К блогу
            </Link>

            <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {category?.label ?? post.categoryId}
            </span>

            <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground lg:text-3xl">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {author && (
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
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
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      Написать
                    </button>
                  </div>
                </div>
              )}

              <span className="text-sm text-muted-foreground">{formattedDate}</span>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {likesCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
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
        <section className="border-y border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-4">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-4 lg:px-8">
            <button
              type="button"
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-[rgba(255,255,255,0.06)] text-muted-foreground hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              {isLiked ? "Понравилось" : "Нравится"} ({likesCount})
            </button>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isBookmarked
                  ? "bg-primary/20 text-primary"
                  : "bg-[rgba(255,255,255,0.06)] text-muted-foreground hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
              )}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
              {isBookmarked ? "В избранном" : "В избранное"}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                Поделиться
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full left-1/2 z-30 mb-2 w-48 -translate-x-1/2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1a1f35] p-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      setShowShareMenu(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    Копировать ссылку
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
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
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
                className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.1)] hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                Написать автору
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
