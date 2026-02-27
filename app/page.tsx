'use client'

import { useMemo } from 'react'
import { Header, Footer } from '@/components/layout'
import { CategoryRibbon, CoursesGrid } from '@/components/courses'
import { useCategoryTransition } from '@/hooks'
import { CATEGORIES, COURSES_BY_CATEGORY, DEFAULT_CATEGORY_ID } from '@/constants'

export default function CoursesPage() {
  const { activeId, courses, animating, handleChange } = useCategoryTransition(
    DEFAULT_CATEGORY_ID,
    COURSES_BY_CATEGORY
  )

  const animationKey = useMemo(
    () => `${activeId}-${Date.now()}`,
    [activeId]
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="pb-6 pt-8">
          <CategoryRibbon
            categories={CATEGORIES}
            activeCategory={activeId}
            onCategoryChange={handleChange}
          />
        </section>

        <section className="pb-16 pt-2">
          {!animating && courses.length > 0 ? (
            <CoursesGrid courses={courses} animationKey={animationKey} />
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
