"use client"

import Image from "next/image"
import { Star, Bell, MessageCircle } from "lucide-react"
import type { Teacher } from "@/lib/teachers-data"

interface TeacherProfileHeroProps {
  teacher: Teacher
}

export function TeacherProfileHero({ teacher }: TeacherProfileHeroProps) {
  return (
    <section className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:gap-6 sm:py-10 lg:flex-row lg:items-start lg:gap-10 lg:px-8">
        <div className="flex items-start gap-4 sm:block">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] sm:h-40 sm:w-40 lg:h-52 lg:w-52">
            <Image
              src={teacher.photo}
              alt={teacher.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 160px, 208px"
              priority
            />
          </div>
          {/* Mobile: Name and rating next to photo */}
          <div className="min-w-0 flex-1 sm:hidden">
            <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
              {teacher.name}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
                <span className="font-semibold">{teacher.rating}</span>
              </span>
              <span className="text-muted-foreground">
                {teacher.reviewCount} отзывов
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
          {/* Desktop: Name */}
          <h1 className="hidden font-serif text-2xl font-semibold tracking-wide text-foreground sm:block lg:text-3xl">
            {teacher.name}
          </h1>

          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {teacher.specializations.map((spec) => (
              <span
                key={spec}
                className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Desktop: Rating */}
          <div className="hidden items-center gap-3 text-sm sm:flex">
            <span className="flex items-center gap-1.5 text-foreground">
              <Star className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" />
              <span className="font-semibold">{teacher.rating}</span>
            </span>
            <span className="text-muted-foreground">
              {teacher.reviewCount} отзывов
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground sm:max-w-2xl lg:text-base">
            {teacher.bioLong}
          </p>

          <div className="flex gap-2 pt-1 sm:flex-wrap sm:gap-3 sm:pt-2">
            <button
              type="button"
              className="glow-button inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 sm:flex-none"
            >
              <Bell className="h-4 w-4" />
              <span>Подписаться</span>
            </button>
            <button
              type="button"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg border border-[rgba(255,255,255,0.2)] px-4 text-sm font-medium text-foreground transition-colors active:bg-[rgba(255,255,255,0.04)] sm:flex-none"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Написать сообщение</span>
              <span className="sm:hidden">Написать</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
