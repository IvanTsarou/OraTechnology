'use client'

import { memo, useMemo, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Share2, ShoppingCart } from 'lucide-react'
import { getTeacherIdByName } from '@/lib/teachers-data'
import type { CourseCardProps } from '@/types'

const ANIMATION_DELAY_MS = 100

function getLessonWord(n: number): string {
  const abs = Math.abs(n) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return 'занятий'
  if (last > 1 && last < 5) return 'занятия'
  if (last === 1) return 'занятие'
  return 'занятий'
}

function CourseCardComponent({ course, index, linkToTeacherId }: CourseCardProps) {
  const teacherId = linkToTeacherId ?? getTeacherIdByName(course.instructor)

  const animationStyle = useMemo<CSSProperties>(
    () => ({
      animationDelay: `${index * ANIMATION_DELAY_MS}ms`,
      animationFillMode: 'both',
    }),
    [index]
  )

  const instructorBlock = useMemo(() => {
    const avatarElement = (
      <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
        <Image
          src={course.avatar}
          alt={course.instructor}
          fill
          className="object-cover"
          sizes="24px"
        />
      </div>
    )

    if (teacherId) {
      return (
        <Link
          href={`/teachers/${teacherId}`}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {avatarElement}
          <span>{course.instructor}</span>
        </Link>
      )
    }

    return (
      <div className="flex items-center gap-2">
        {avatarElement}
        <span className="text-sm text-muted-foreground">{course.instructor}</span>
      </div>
    )
  }, [course.avatar, course.instructor, teacherId])

  return (
    <article
      className="glass-card group animate-fade-in-up overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1.5"
      style={animationStyle}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/60 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-[rgba(0,0,0,0.5)] px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
          {course.lessons} {getLessonWord(course.lessons)}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug tracking-wide text-foreground">
          {course.title}
        </h3>

        {instructorBlock}

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="font-serif text-lg font-bold tracking-wide text-glow-gold">
            {course.price}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-muted-foreground transition-all hover:border-[rgba(255,255,255,0.2)] hover:text-foreground active:bg-[rgba(255,255,255,0.06)]"
              aria-label="Поделиться"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="glow-button flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 sm:px-4"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Купить</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export const CourseCard = memo(CourseCardComponent)
