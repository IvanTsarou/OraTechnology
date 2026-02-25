"use client"

import Link from "next/link"
import type { CurriculumCourse } from "@/lib/curriculum-data"
import {
  getCategoryById,
  getTeacherById,
  getLevelLabel,
  formatDateRange,
} from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"

interface CurriculumCardProps {
  course: CurriculumCourse
  dimmed?: boolean
}

export function CurriculumCard({ course, dimmed }: CurriculumCardProps) {
  const category = getCategoryById(course.categoryId)
  const teacher = getTeacherById(course.teacherId)

  return (
    <Link
      href={`/curriculum/${course.id}`}
      className={cn(
        "curriculum-card group flex overflow-hidden rounded-lg border transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-lg",
        category?.borderClass ?? "border-[rgba(255,255,255,0.1)]",
        dimmed && "opacity-30 pointer-events-none"
      )}
    >
      {/* Date block on the left */}
      <div
        className="flex w-16 shrink-0 flex-col items-center justify-center px-2 py-3 text-center"
        style={{ backgroundColor: `${category?.color ?? "#5eead4"}20` }}
      >
        <span
          className="text-lg font-bold leading-tight"
          style={{ color: category?.color ?? "#5eead4" }}
        >
          {formatDateRange(course.dateStart, course.dateEnd).split(".")[0]}
        </span>
        <span
          className="text-[10px] font-medium uppercase tracking-wide"
          style={{ color: category?.color ?? "#5eead4" }}
        >
          {getMonthShort(course.dateStart)}
        </span>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-1.5 p-3",
          category?.bgClass ?? "bg-[rgba(255,255,255,0.04)]"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: category?.color ?? "#5eead4" }}
          >
            {category?.name ?? course.categoryId}
          </span>
          <span className="rounded-full bg-[rgba(255,255,255,0.1)] px-2 py-0.5 text-[10px] text-muted-foreground">
            {getLevelLabel(course.level)}
          </span>
        </div>

        <h3 className="font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>

        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span>{course.isOnline ? "Онлайн" : course.location}</span>
          <span className="truncate">{teacher?.name ?? course.teacherId}</span>
        </div>
      </div>
    </Link>
  )
}

function getMonthShort(dateStr: string): string {
  const monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ]
  const date = new Date(dateStr)
  return monthNames[date.getMonth()]
}
