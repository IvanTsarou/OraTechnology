"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getActiveCourses,
  getArchivedCourses,
  type UserCourse,
} from "@/lib/account-data"

type Tab = "active" | "archived"
type SortBy = "date" | "name" | "progress"

export function CoursesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("active")
  const [sortBy, setSortBy] = useState<SortBy>("date")

  const courses = activeTab === "active" ? getActiveCourses() : getArchivedCourses()

  const sortedCourses = [...courses].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title)
      case "progress":
        return b.progress - a.progress
      case "date":
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    }
  })

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <div>
        <h1 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Мои курсы
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Отслеживайте прогресс обучения
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "active"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            В процессе ({getActiveCourses().length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("archived")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "archived"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Архив ({getArchivedCourses().length})
          </button>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-foreground"
        >
          <option value="date">По дате</option>
          <option value="name">По названию</option>
          <option value="progress">По прогрессу</option>
        </select>
      </div>

      {/* Courses grid */}
      {sortedCourses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">
            {activeTab === "active"
              ? "У вас пока нет активных курсов"
              : "Архив пуст"}
          </p>
        </div>
      )}
    </div>
  )
}

function CourseCard({ course }: { course: UserCourse }) {
  const formattedStartDate = new Date(course.startDate).toLocaleDateString(
    "ru-RU",
    { day: "numeric", month: "short", year: "numeric" }
  )
  const formattedEndDate = course.endDate
    ? new Date(course.endDate).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null

  return (
    <article className="group overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] transition-colors hover:border-[rgba(255,255,255,0.15)]">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/80 to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-[rgba(0,0,0,0.5)] px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {course.category}
        </span>

        {/* Completion badge */}
        {course.isArchived && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-1 text-xs font-medium text-white">
            <CheckCircle className="h-3 w-3" />
            Завершён
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 font-medium text-foreground group-hover:text-primary">
          {course.title}
        </h3>

        {/* Teacher */}
        <div className="mt-2 flex items-center gap-2">
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
            <Image
              src={course.teacherAvatar}
              alt={course.teacherName}
              fill
              className="object-cover"
              sizes="20px"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {course.teacherName}
          </span>
        </div>

        {/* Progress */}
        {!course.isArchived && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Прогресс</span>
              <span className="font-medium text-foreground">
                {course.completedLessons}/{course.totalLessons} занятий
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formattedStartDate}
          {formattedEndDate && ` — ${formattedEndDate}`}
        </div>

        {/* Action */}
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary/15 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
        >
          {course.isArchived ? "Просмотреть" : "Продолжить"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
