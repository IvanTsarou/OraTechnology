"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Calendar,
  List,
  Eye,
  Heart,
  MessageCircle,
  Lock,
  Globe,
  Edit,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  diaryReports,
  getPublicNotes,
  getPrivateNotes,
  type DiaryReport,
  type DiaryNote,
} from "@/lib/account-data"

type MainTab = "reports" | "notes"
type NotesTab = "public" | "private"
type ViewMode = "list" | "calendar"

export function DiarySection() {
  const [mainTab, setMainTab] = useState<MainTab>("reports")
  const [notesTab, setNotesTab] = useState<NotesTab>("public")
  const [viewMode, setViewMode] = useState<ViewMode>("list")

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Дневник
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Записывайте свой путь и делитесь опытом
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">
            {mainTab === "reports" ? "Новый отчёт" : "Новая заметка"}
          </span>
        </button>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-1">
        <button
          type="button"
          onClick={() => setMainTab("reports")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mainTab === "reports"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Отчёты
        </button>
        <button
          type="button"
          onClick={() => setMainTab("notes")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mainTab === "notes"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Заметки
        </button>
      </div>

      {mainTab === "reports" && (
        <ReportsView viewMode={viewMode} onViewModeChange={setViewMode} />
      )}

      {mainTab === "notes" && (
        <NotesView activeTab={notesTab} onTabChange={setNotesTab} />
      )}
    </div>
  )
}

function ReportsView({
  viewMode,
  onViewModeChange,
}: {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}) {
  return (
    <div className="space-y-4">
      {/* View mode toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            viewMode === "list"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="h-4 w-4" />
          Лента
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("calendar")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            viewMode === "calendar"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Calendar className="h-4 w-4" />
          Календарь
        </button>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {diaryReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <CalendarView reports={diaryReports} />
      )}
    </div>
  )
}

function ReportCard({ report }: { report: DiaryReport }) {
  const formattedDate = new Date(report.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <article className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 transition-colors hover:border-[rgba(255,255,255,0.15)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {formattedDate}
            </span>
            {report.courseName && (
              <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                <Tag className="h-3 w-3" />
                {report.courseName}
              </span>
            )}
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {report.preview}
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
        >
          <Edit className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

function CalendarView({ reports }: { reports: DiaryReport[] }) {
  const reportDates = new Set(reports.map((r) => r.date))
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => i)

  const monthName = today.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
      <h3 className="mb-4 text-center font-medium capitalize text-foreground">
        {monthName}
      </h3>

      <div className="grid grid-cols-7 gap-1">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {emptyDays.map((i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const hasReport = reportDates.has(dateStr)
          const isToday = day === today.getDate()

          return (
            <button
              key={day}
              type="button"
              className={cn(
                "relative flex h-10 items-center justify-center rounded-lg text-sm transition-colors",
                hasReport && "bg-primary/15 text-primary font-medium",
                isToday && !hasReport && "border border-primary/50 text-primary",
                !hasReport && !isToday && "text-muted-foreground hover:bg-[rgba(255,255,255,0.04)]"
              )}
            >
              {day}
              {hasReport && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NotesView({
  activeTab,
  onTabChange,
}: {
  activeTab: NotesTab
  onTabChange: (tab: NotesTab) => void
}) {
  const notes = activeTab === "public" ? getPublicNotes() : getPrivateNotes()

  return (
    <div className="space-y-4">
      {/* Notes tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onTabChange("public")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            activeTab === "public"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Globe className="h-4 w-4" />
          Публичные ({getPublicNotes().length})
        </button>
        <button
          type="button"
          onClick={() => onTabChange("private")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
            activeTab === "private"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Lock className="h-4 w-4" />
          Частные ({getPrivateNotes().length})
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">
            {activeTab === "public"
              ? "У вас пока нет публичных заметок"
              : "У вас пока нет частных заметок"}
          </p>
        </div>
      )}
    </div>
  )
}

function NoteCard({ note }: { note: DiaryNote }) {
  const formattedDate = new Date(note.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <article className="group overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(255,255,255,0.15)]">
      {note.image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={note.image}
            alt={note.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2">
          {note.isPublic ? (
            <Globe className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>

        <h3 className="mt-2 font-medium text-foreground group-hover:text-primary">
          {note.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {note.preview}
        </p>

        {note.isPublic && (
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {note.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {note.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {note.commentsCount}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
