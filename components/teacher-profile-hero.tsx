"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Bell, MessageCircle } from "lucide-react"
import type { Teacher } from "@/lib/teachers-data"

interface TeacherProfileHeroProps {
  teacher: Teacher
}

export function TeacherProfileHero({ teacher }: TeacherProfileHeroProps) {
  return (
    <section className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 lg:flex-row lg:items-start lg:gap-10 lg:px-8">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] lg:h-52 lg:w-52">
          <Image
            src={teacher.photo}
            alt={teacher.name}
            fill
            className="object-cover"
            sizes="208px"
            priority
          />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground lg:text-3xl">
            {teacher.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {teacher.specializations.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <Star className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]" />
              <span className="font-semibold">{teacher.rating}</span>
            </span>
            <span className="text-muted-foreground">
              {teacher.reviewCount} отзывов
            </span>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            {teacher.bioLong}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="glow-button inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <Bell className="h-4 w-4" />
              Подписаться
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.2)] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.04)]"
            >
              <MessageCircle className="h-4 w-4" />
              Написать сообщение
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
