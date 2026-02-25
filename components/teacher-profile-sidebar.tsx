"use client"

import Link from "next/link"
import { Calendar, Mail } from "lucide-react"

const upcomingCourses = [
  { title: "Основы Сефиротической Магии", date: "15 мар 2025", slug: "#" },
  { title: "Медитации на Сефирот", date: "22 мар 2025", slug: "#" },
  { title: "Работа с Чакрами", date: "5 апр 2025", slug: "#" },
]

export function TeacherProfileSidebar() {
  return (
    <aside className="w-full space-y-6 lg:w-72 lg:shrink-0">
      <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
        <h3 className="font-semibold text-foreground">
          Ближайшие онлайн-курсы
        </h3>
        <ul className="mt-4 space-y-3">
          {upcomingCourses.map((course) => (
            <li key={course.title}>
              <Link
                href={course.slug}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]"
              >
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {course.title}
                  </span>
                  <p className="text-xs text-muted-foreground">{course.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
        <h3 className="font-semibold text-foreground">
          Индивидуальная консультация
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Запишитесь на персональную встречу с учителем для разбора вашей практики
          или ответов на вопросы.
        </p>
        <button
          type="button"
          className="glow-button mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          <Mail className="h-4 w-4" />
          Запросить консультацию
        </button>
      </div>
    </aside>
  )
}
