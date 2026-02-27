/**
 * Core application types
 * Centralized type definitions for the Ora Technology platform
 */

// =============================================================================
// Navigation
// =============================================================================

export interface NavItem {
  readonly label: string
  readonly href: string
}

// =============================================================================
// Categories
// =============================================================================

export interface Category {
  readonly id: string
  readonly label: string
  readonly teaser: string
  readonly fullDescription: string
}

// =============================================================================
// Courses
// =============================================================================

export interface Instructor {
  readonly name: string
  readonly avatar: string
}

export interface Course {
  readonly id: string
  readonly title: string
  readonly instructor: string
  readonly avatar: string
  readonly image: string
  readonly price: string
  readonly lessons: number
}

export type CoursesByCategory = Record<string, Course[]>

// =============================================================================
// Component Props
// =============================================================================

export interface CategoryBarProps {
  readonly categories: readonly Category[]
  readonly activeCategory: string
  readonly onCategoryChange: (id: string) => void
}

export interface CategoryDescriptionProps {
  readonly category: Category
  readonly expanded: boolean
  readonly onToggle: () => void
}

export interface CourseCardProps {
  readonly course: Course
  readonly index: number
  readonly linkToTeacherId?: string
}

export interface CourseGridProps {
  readonly courses: readonly Course[]
  readonly animationKey: string
}

// =============================================================================
// Hooks Return Types
// =============================================================================

export interface UseCategoryTransitionReturn {
  readonly activeId: string
  readonly courses: readonly Course[]
  readonly animating: boolean
  readonly handleChange: (id: string) => void
}

export interface UseScrollIndicatorReturn {
  readonly canScrollLeft: boolean
  readonly canScrollRight: boolean
  readonly checkScroll: () => void
}

// =============================================================================
// Utility Types
// =============================================================================

export type ScrollDirection = 'left' | 'right'
