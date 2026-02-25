"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, BookOpen, FileText } from "lucide-react"
import type { Teacher } from "@/lib/teachers-data"
import { getTeacherCourseCount, getTeacherMaterialCount } from "@/lib/teachers-data"

interface TeacherCardProps {
  teacher: Teacher
  index: number
}

export function TeacherCard({ teacher, index }: TeacherCardProps) {
  const courseCount = getTeacherCourseCount(teacher.id)
  const materialCount = getTeacherMaterialCount(teacher.id)

  return (
    <article
      className="teacher-card glass-card group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.12)]">
            <Image
              src={teacher.photo}
              alt={teacher.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-foreground">
              {teacher.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {teacher.specializations.slice(0, 2).map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {teacher.bioShort}
        </p>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-foreground">
            <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span className="font-medium">{teacher.rating}</span>
          </span>
          <span className="text-muted-foreground">
            {teacher.reviewCount} отзывов
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {courseCount} курсов
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            {materialCount} материалов
          </span>
        </div>

        <Link
          href={`/teachers/${teacher.id}`}
          className="glow-button mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          Подробнее
        </Link>
      </div>
    </article>
  )
}
