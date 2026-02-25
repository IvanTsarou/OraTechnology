"use client"

import { CurriculumCard } from "./curriculum-card"
import type { CurriculumCourse, StudentLevel } from "@/lib/curriculum-data"

interface CurriculumMonthProps {
  label: string
  courses: CurriculumCourse[]
  selectedCategories: string[]
  selectedTeachers: string[]
  selectedLevels: StudentLevel[]
}

export function CurriculumMonth({
  label,
  courses,
  selectedCategories,
  selectedTeachers,
  selectedLevels,
}: CurriculumMonthProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedTeachers.length > 0 ||
    selectedLevels.length > 0

  const filteredCourses = courses.filter((course) => {
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(course.categoryId)
    ) {
      return false
    }
    if (
      selectedTeachers.length > 0 &&
      !selectedTeachers.includes(course.teacherId)
    ) {
      return false
    }
    if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
      return false
    }
    return true
  })

  const visibleCount = filteredCourses.length

  if (courses.length === 0) {
    return null
  }

  return (
    <section className="flex flex-col rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
      <div className="flex items-baseline justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] px-4 py-3">
        <h2 className="font-serif text-base font-semibold tracking-wide text-foreground">
          {label}
        </h2>
        {hasFilters && visibleCount < courses.length && (
          <span className="text-xs text-muted-foreground">
            {visibleCount}/{courses.length}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        {visibleCount > 0 ? (
          courses.map((course) => {
            const matches = filteredCourses.includes(course)
            return (
              <CurriculumCard
                key={course.id}
                course={course}
                dimmed={hasFilters && !matches}
              />
            )
          })
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Нет курсов по фильтрам
          </p>
        )}
      </div>
    </section>
  )
}
