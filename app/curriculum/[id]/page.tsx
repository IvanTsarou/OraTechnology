"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Users, Clock, Banknote } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  getCourseById,
  getCategoryById,
  getTeacherById,
  getLevelLabel,
  formatDateRange,
} from "@/lib/curriculum-data"

export default function CurriculumCoursePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const course = getCourseById(id)

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Курс не найден
          </h1>
          <Link
            href="/curriculum"
            className="mt-4 text-sm text-primary hover:underline"
          >
            Вернуться к учебному плану
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const category = getCategoryById(course.categoryId)
  const teacher = getTeacherById(course.teacherId)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] py-8">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <Link
              href="/curriculum"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              К учебному плану
            </Link>

            <div className="flex flex-col gap-4">
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: category?.color ?? "#5eead4" }}
              >
                {category?.name ?? course.categoryId}
              </span>

              <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground lg:text-3xl">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDateRange(course.dateStart, course.dateEnd)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {course.isOnline ? "Онлайн" : course.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {getLevelLabel(course.level)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-10">
          <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:gap-10 lg:grid-cols-3 lg:px-8">
            {/* Mobile: Price card first */}
            {course.price && (
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 sm:p-5 lg:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Стоимость
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-2xl font-bold text-primary">
                      {course.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="glow-button min-h-[48px] rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-6 lg:col-span-2">
              <div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">
                  О курсе
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {course.description}
                </p>
              </div>

              {course.schedule && (
                <div className="flex items-start gap-3 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      Расписание
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {course.schedule}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-4 sm:space-y-6">
              {/* Учитель */}
              {teacher && (
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 sm:p-5">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Учитель
                  </h3>
                  <Link
                    href={`/teachers/${teacher.id}`}
                    className="flex min-h-[48px] items-center gap-3 transition-colors active:opacity-80"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                      <Image
                        src={teacher.avatar}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="font-medium text-foreground">
                      {teacher.name}
                    </span>
                  </Link>
                </div>
              )}

              {/* Детали */}
              <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 sm:p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Детали
                </h3>
                <ul className="space-y-3 text-sm">
                  {course.lessons && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Занятий</span>
                      <span className="font-medium text-foreground">
                        {course.lessons}
                      </span>
                    </li>
                  )}
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Уровень</span>
                    <span className="font-medium text-foreground">
                      {getLevelLabel(course.level)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Формат</span>
                    <span className="font-medium text-foreground">
                      {course.isOnline ? "Онлайн" : "Офлайн"}
                    </span>
                  </li>
                  {!course.isOnline && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Город</span>
                      <span className="font-medium text-foreground">
                        {course.location}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Стоимость - Desktop only */}
              {course.price && (
                <div className="hidden rounded-xl border border-primary/30 bg-primary/10 p-5 lg:block">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Стоимость
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-2xl font-bold text-primary">
                    {course.price}
                  </p>
                  <button
                    type="button"
                    className="glow-button mt-4 min-h-[48px] w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                  >
                    Записаться
                  </button>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
