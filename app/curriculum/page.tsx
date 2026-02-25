"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CurriculumSidebar } from "@/components/curriculum-sidebar"
import { CurriculumMonth } from "@/components/curriculum-month"
import {
  months,
  getCoursesByMonth,
  type StudentLevel,
} from "@/lib/curriculum-data"

export default function CurriculumPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<StudentLevel[]>([])

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedTeachers([])
    setSelectedLevels([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <CurriculumSidebar
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            selectedTeachers={selectedTeachers}
            onTeachersChange={setSelectedTeachers}
            selectedLevels={selectedLevels}
            onLevelsChange={setSelectedLevels}
            onReset={handleReset}
          />

          {/* Main content */}
          <section className="min-w-0 flex-1 pb-16 pt-6">
            <div className="mb-6 px-4 lg:px-8">
              <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                Учебный план
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Годовое расписание онлайн и офлайн курсов Eira — с сентября по
                август.
              </p>
            </div>

            <div className="px-4 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {months.map((month) => {
                  const courses = getCoursesByMonth(month.key)
                  return (
                    <CurriculumMonth
                      key={month.key}
                      label={month.label}
                      courses={courses}
                      selectedCategories={selectedCategories}
                      selectedTeachers={selectedTeachers}
                      selectedLevels={selectedLevels}
                    />
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
