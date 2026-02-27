'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Course, CoursesByCategory, UseCategoryTransitionReturn } from '@/types'

const TRANSITION_DELAY_MS = 150

export function useCategoryTransition(
  initialId: string,
  coursesByCategory: CoursesByCategory
): UseCategoryTransitionReturn {
  const [activeId, setActiveId] = useState(initialId)
  const [courses, setCourses] = useState<Course[]>(() => coursesByCategory[initialId] ?? [])
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
    setCourses([])

    const timer = setTimeout(() => {
      setCourses(coursesByCategory[activeId] ?? [])
      setAnimating(false)
    }, TRANSITION_DELAY_MS)

    return () => clearTimeout(timer)
  }, [activeId, coursesByCategory])

  const handleChange = useCallback((id: string) => {
    if (id !== activeId) {
      setActiveId(id)
    }
  }, [activeId])

  return useMemo(
    () => ({
      activeId,
      courses,
      animating,
      handleChange,
    }),
    [activeId, courses, animating, handleChange]
  )
}
