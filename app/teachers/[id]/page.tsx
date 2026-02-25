"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeacherProfileHero } from "@/components/teacher-profile-hero"
import { TeacherProfileTabs } from "@/components/teacher-profile-tabs"
import { TeacherProfileSidebar } from "@/components/teacher-profile-sidebar"
import { getTeacherById } from "@/lib/teachers-data"

export default function TeacherProfilePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : ""
  const teacher = getTeacherById(id)

  if (!teacher) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Учитель не найден
          </h1>
          <Link
            href="/teachers"
            className="mt-4 text-sm text-primary hover:underline"
          >
            Вернуться к каталогу учителей
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <TeacherProfileHero teacher={teacher} />

        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 lg:flex-row lg:px-8">
          <div className="min-w-0 flex-1">
            <TeacherProfileTabs teacher={teacher} />
          </div>
          <TeacherProfileSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
