"use client"

import { Quote, Video, Calendar } from "lucide-react"
import { dailyQuote, upcomingClasses } from "@/lib/account-data"

export function AccountSidebar() {
  return (
    <aside className="flex h-full w-72 flex-col border-l border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      {/* Daily Quote */}
      <div className="border-b border-[rgba(255,255,255,0.08)] p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Quote className="h-4 w-4" />
          Цитата дня
        </div>
        <blockquote className="mt-3 border-l-2 border-primary/50 pl-3">
          <p className="text-sm italic leading-relaxed text-foreground">
            «{dailyQuote.text}»
          </p>
          <footer className="mt-2 text-xs text-muted-foreground">
            — {dailyQuote.author}
          </footer>
        </blockquote>
      </div>

      {/* Upcoming Classes */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Ближайшие занятия
        </div>

        {upcomingClasses.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {upcomingClasses.map((cls) => (
              <li
                key={cls.id}
                className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-3"
              >
                <p className="text-sm font-medium text-foreground">
                  {cls.courseName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(cls.date)} в {cls.time}
                </p>
                <button
                  type="button"
                  disabled={!cls.canJoin}
                  className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    cls.canJoin
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "cursor-not-allowed bg-[rgba(255,255,255,0.06)] text-muted-foreground"
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  {cls.canJoin ? "Подключиться" : "Скоро"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">
              Нет запланированных занятий
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Запишитесь на курс, чтобы увидеть расписание
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return "Сегодня"
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Завтра"
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  })
}
