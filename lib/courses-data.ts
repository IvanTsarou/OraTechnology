/**
 * @deprecated Use `@/constants` instead
 * This file is kept for backward compatibility with existing imports
 */
import { CATEGORIES, COURSES_BY_CATEGORY } from '@/constants'
import type { Category, Course, CoursesByCategory } from '@/types'

export const categories: readonly Category[] = CATEGORIES
export const coursesByCategory: CoursesByCategory = COURSES_BY_CATEGORY

export type { Category, Course }
