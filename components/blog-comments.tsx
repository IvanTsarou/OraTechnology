"use client"

import { useState } from "react"
import Image from "next/image"
import { Send, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogComment } from "@/lib/blog-data"

interface BlogCommentsProps {
  comments: BlogComment[]
  postId: string
}

export function BlogComments({ comments, postId }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const rootComments = comments.filter((c) => !c.parentId)
  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setNewComment("")
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim()) return
    setReplyText("")
    setReplyingTo(null)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Комментарии ({comments.length})
        </h2>
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmitComment} className="flex gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]">
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            👤
          </div>
        </div>
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Написать комментарий..."
            className="flex-1 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {rootComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={getReplies(comment.id)}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            replyText={replyText}
            setReplyText={setReplyText}
            onSubmitReply={handleSubmitReply}
            getReplies={getReplies}
            level={0}
          />
        ))}
      </div>

      {comments.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Пока нет комментариев. Будьте первым!
        </p>
      )}
    </section>
  )
}

interface CommentItemProps {
  comment: BlogComment
  replies: BlogComment[]
  replyingTo: string | null
  setReplyingTo: (id: string | null) => void
  replyText: string
  setReplyText: (text: string) => void
  onSubmitReply: (parentId: string) => void
  getReplies: (parentId: string) => BlogComment[]
  level: number
}

function CommentItem({
  comment,
  replies,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  onSubmitReply,
  getReplies,
  level,
}: CommentItemProps) {
  const [localReactions, setLocalReactions] = useState(comment.reactions)

  const toggleReaction = (emoji: string) => {
    setLocalReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji)
      if (existing) {
        return prev.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count + 1 } : r
        )
      }
      return [...prev, { emoji, count: 1 }]
    })
  }

  const formattedDate = new Date(comment.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={cn("space-y-3", level > 0 && "ml-8 border-l border-[rgba(255,255,255,0.08)] pl-4")}>
      <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
            <Image
              src={comment.authorAvatar}
              alt={comment.authorName}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {comment.authorName}
            </span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>

        {/* Text */}
        <p className="text-sm leading-relaxed text-foreground/90">{comment.text}</p>

        {/* Actions */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Reactions */}
          {localReactions.map((reaction) => (
            <button
              key={reaction.emoji}
              type="button"
              onClick={() => toggleReaction(reaction.emoji)}
              className="flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.06)] px-2 py-1 text-xs transition-colors hover:bg-[rgba(255,255,255,0.1)]"
            >
              <span>{reaction.emoji}</span>
              <span className="text-muted-foreground">{reaction.count}</span>
            </button>
          ))}

          {/* Add reaction */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 rounded-full border border-dashed border-[rgba(255,255,255,0.15)] px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-[rgba(255,255,255,0.3)] hover:text-foreground"
            >
              +
            </button>
            <div className="absolute bottom-full left-0 z-10 mb-2 hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#1a1f35] p-2 shadow-xl group-hover:flex">
              {["❤️", "👍", "🔥", "🙏", "💡", "🤔"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => toggleReaction(emoji)}
                  className="rounded p-1 text-lg hover:bg-[rgba(255,255,255,0.1)]"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Reply button (only for level 0 and 1) */}
          {level < 2 && (
            <button
              type="button"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="ml-auto text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Ответить
            </button>
          )}
        </div>

        {/* Reply form */}
        {replyingTo === comment.id && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Написать ответ..."
              className="flex-1 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => onSubmitReply(comment.id)}
              disabled={!replyText.trim()}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="space-y-3">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={getReplies(reply.id)}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              onSubmitReply={onSubmitReply}
              getReplies={getReplies}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
