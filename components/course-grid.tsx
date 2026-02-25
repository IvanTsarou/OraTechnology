"use client"

import { CourseCard, type Course } from "./course-card"

interface CourseGridProps {
  courses: Course[]
  animationKey: string
}

export function CourseGrid({ courses, animationKey }: CourseGridProps) {
  return (
    <div
      key={animationKey}
      className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
    >
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  )
}
