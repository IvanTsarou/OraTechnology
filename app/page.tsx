"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { CategoryBar } from "@/components/category-bar"
import { CourseGrid } from "@/components/course-grid"
import { Footer } from "@/components/footer"
import { categories, coursesByCategory } from "@/lib/courses-data"
import type { Course } from "@/components/course-card"

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [courses, setCourses] = useState<Course[]>(
    coursesByCategory[categories[0].id]
  )
  const [animationKey, setAnimationKey] = useState(categories[0].id)

  useEffect(() => {
    // Simulate loading with fade transition
    setCourses([])
    const timer = setTimeout(() => {
      setCourses(coursesByCategory[activeCategory] || [])
      setAnimationKey(activeCategory + Date.now())
    }, 150)
    return () => clearTimeout(timer)
  }, [activeCategory])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Category pills */}
        <section className="pb-6 pt-8">
          <CategoryBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Course cards */}
        <section className="pb-16 pt-2">
          {courses.length > 0 ? (
            <CourseGrid courses={courses} animationKey={animationKey} />
          ) : (
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center justify-center py-20">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
