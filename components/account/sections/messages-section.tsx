"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Send,
  Smile,
  Paperclip,
  ArrowLeft,
  CheckCheck,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  chats,
  notifications,
  notificationTypeIcons,
  currentUser,
  type Chat,
  type Notification,
} from "@/lib/account-data"

type Tab = "chats" | "notifications"

export function MessagesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("chats")
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [localNotifications, setLocalNotifications] = useState(notifications)

  const unreadNotifications = localNotifications.filter((n) => !n.isRead).length

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-[rgba(255,255,255,0.08)] p-4">
        <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Сообщения
        </h1>

        {/* Tabs */}
        <div className="mt-4 flex gap-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("chats")
              setSelectedChat(null)
            }}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "chats"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Чаты
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("notifications")
              setSelectedChat(null)
            }}
            className={cn(
              "relative flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "notifications"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Уведомления
            {unreadNotifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {activeTab === "chats" && (
          <ChatsView
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        )}

        {activeTab === "notifications" && (
          <NotificationsView
            notifications={localNotifications}
            onMarkAllRead={handleMarkAllRead}
          />
        )}
      </div>
    </div>
  )
}

function ChatsView({
  selectedChat,
  onSelectChat,
}: {
  selectedChat: Chat | null
  onSelectChat: (chat: Chat | null) => void
}) {
  if (selectedChat) {
    return <ChatConversation chat={selectedChat} onBack={() => onSelectChat(null)} />
  }

  return (
    <div className="h-full overflow-y-auto">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          onClick={() => onSelectChat(chat)}
        />
      ))}
    </div>
  )
}

function ChatListItem({ chat, onClick }: { chat: Chat; onClick: () => void }) {
  const formattedTime = formatMessageTime(chat.lastMessageTime)

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-[rgba(255,255,255,0.06)] p-4 text-left transition-colors hover:bg-[rgba(255,255,255,0.04)]"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
        <Image
          src={chat.participantAvatar}
          alt={chat.participantName}
          fill
          className="object-cover"
          sizes="48px"
        />
        {chat.unreadCount > 0 && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
            {chat.unreadCount}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-medium text-foreground">
            {chat.participantName}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formattedTime}
          </span>
        </div>
        <p
          className={cn(
            "mt-0.5 truncate text-sm",
            chat.unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {chat.lastMessage}
        </p>
      </div>
    </button>
  )
}

function ChatConversation({ chat, onBack }: { chat: Chat; onBack: () => void }) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat.messages])

  const handleSend = () => {
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[rgba(255,255,255,0.08)] p-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
          <Image
            src={chat.participantAvatar}
            alt={chat.participantName}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <span className="font-medium text-foreground">
          {chat.participantName}
        </span>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chat.messages.map((msg) => {
            const isOwn = msg.senderId === "current"
            const time = new Date(msg.timestamp).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <div
                key={msg.id}
                className={cn("flex", isOwn ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    isOwn
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-[rgba(255,255,255,0.08)] text-foreground"
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div
                    className={cn(
                      "mt-1 flex items-center justify-end gap-1 text-xs",
                      isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {time}
                    {isOwn &&
                      (msg.isRead ? (
                        <CheckCheck className="h-3.5 w-3.5" />
                      ) : (
                        <Check className="h-3.5 w-3.5" />
                      ))}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-[rgba(255,255,255,0.08)] p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Написать сообщение..."
              className="h-10 w-full rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function NotificationsView({
  notifications,
  onMarkAllRead,
}: {
  notifications: Notification[]
  onMarkAllRead: () => void
}) {
  const hasUnread = notifications.some((n) => !n.isRead)

  return (
    <div className="h-full overflow-y-auto">
      {hasUnread && (
        <div className="border-b border-[rgba(255,255,255,0.06)] p-4">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-sm text-primary hover:underline"
          >
            Отметить всё как прочитанное
          </button>
        </div>
      )}

      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

function NotificationItem({ notification }: { notification: Notification }) {
  const icon = notificationTypeIcons[notification.type]
  const formattedDate = formatMessageTime(notification.date)

  return (
    <div
      className={cn(
        "flex items-start gap-3 border-b border-[rgba(255,255,255,0.06)] p-4 transition-colors",
        !notification.isRead && "bg-primary/5"
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-lg">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-medium",
              notification.isRead ? "text-foreground" : "text-primary"
            )}
          >
            {notification.title}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formattedDate}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {notification.text}
        </p>
      </div>

      {!notification.isRead && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
      )}
    </div>
  )
}

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (diffDays === 1) {
    return "Вчера"
  }

  if (diffDays < 7) {
    return date.toLocaleDateString("ru-RU", { weekday: "short" })
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  })
}
