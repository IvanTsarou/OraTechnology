"use client"

import { TeacherCard } from "./teacher-card"
import type { Teacher } from "@/lib/teachers-data"

interface TeachersGridProps {
  teachers: Teacher[]
  filterKey: string
}

export function TeachersGrid({ teachers, filterKey }: TeachersGridProps) {
  return (
    <div
      key={filterKey}
      className="teachers-grid mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
    >
      {teachers.map((teacher, index) => (
        <TeacherCard key={teacher.id} teacher={teacher} index={index} />
      ))}
    </div>
  )
}
