'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollIndicator } from '@/hooks'
import { CategoryDescription } from './CategoryDescription'
import type { CategoryBarProps, Category } from '@/types'

interface CategoryPillProps {
  readonly category: Category
  readonly isActive: boolean
  readonly onClick: () => void
}

function CategoryPill({ category, isActive, onClick }: CategoryPillProps) {
  const className = useMemo(
    () =>
      `shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
        isActive
          ? 'bg-primary/15 text-primary shadow-[0_0_14px_rgba(94,234,212,0.25)] border border-primary/30'
          : 'border border-[rgba(255,255,255,0.08)] text-muted-foreground hover:border-[rgba(255,255,255,0.18)] hover:text-foreground'
      }`,
    [isActive]
  )

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={className}
    >
      {category.label}
    </button>
  )
}

export function CategoryRibbon({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const { canScrollLeft, canScrollRight, scroll } = useScrollIndicator({ scrollRef })

  const activeItem = useMemo(
    () => categories.find((c) => c.id === activeCategory),
    [categories, activeCategory]
  )

  const handleCategoryClick = useCallback(
    (id: string) => {
      onCategoryChange(id)
      setExpanded(false)
    },
    [onCategoryChange]
  )

  const handleScrollLeft = useCallback(() => scroll('left'), [scroll])
  const handleScrollRight = useCallback(() => scroll('right'), [scroll])
  const handleToggleExpanded = useCallback(() => setExpanded((prev) => !prev), [])

  return (
    <section className="w-full">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {canScrollLeft && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:left-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:right-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-2 overflow-x-auto py-1"
          role="tablist"
          aria-label="Course categories"
        >
          {categories.map((cat) => (
            <CategoryPill
              key={cat.id}
              category={cat}
              isActive={cat.id === activeCategory}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </div>

      {activeItem && (
        <CategoryDescription
          category={activeItem}
          expanded={expanded}
          onToggle={handleToggleExpanded}
        />
      )}
    </section>
  )
}
