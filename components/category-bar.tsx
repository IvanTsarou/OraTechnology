"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"

export interface Category {
  id: string
  label: string
  teaser: string
  fullDescription: string
}

interface CategoryBarProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (id: string) => void
}

export function CategoryBar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const activeItem = categories.find((c) => c.id === activeCategory)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" })
  }

  return (
    <section className="w-full">
      {/* Pills row */}
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Scroll arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:left-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
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
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onCategoryChange(cat.id)
                  setExpanded(false)
                }}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary shadow-[0_0_14px_rgba(94,234,212,0.25)] border border-primary/30"
                    : "border border-[rgba(255,255,255,0.08)] text-muted-foreground hover:border-[rgba(255,255,255,0.18)] hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Description block */}
      {activeItem && (
        <div className="mx-auto mt-4 max-w-7xl px-4 lg:px-8">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full cursor-pointer rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-4 text-left transition-colors hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)]"
            aria-expanded={expanded}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {expanded ? activeItem.fullDescription : activeItem.teaser}
              </p>
              <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-primary">
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
      )}
    </section>
  )
}
