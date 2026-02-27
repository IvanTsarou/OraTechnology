'use client'

import { memo, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { CategoryDescriptionProps } from '@/types'

function CategoryDescriptionComponent({
  category,
  expanded,
  onToggle,
}: CategoryDescriptionProps) {
  const handleClick = useCallback(() => {
    onToggle()
  }, [onToggle])

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 lg:px-8">
      <button
        type="button"
        onClick={handleClick}
        className="w-full cursor-pointer rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-4 text-left transition-colors hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)]"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {expanded ? category.fullDescription : category.teaser}
          </p>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
            {expanded ? (
              <>
                Свернуть <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Подробнее <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </span>
        </div>
      </button>
    </div>
  )
}

export const CategoryDescription = memo(CategoryDescriptionComponent)
