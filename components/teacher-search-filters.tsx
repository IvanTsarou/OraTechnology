"use client"

import { useRef, useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TeacherSearchFiltersProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  categories: { id: string; label: string }[]
  activeCategory: string
  onCategoryChange: (id: string) => void
}

export function TeacherSearchFilters({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}: TeacherSearchFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

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
    <div className="space-y-4">
      <div className="relative mx-auto max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Поиск по имени или специализации..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 pl-10"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:left-4"
            aria-label="Влево"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:right-4"
            aria-label="Вправо"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-2 overflow-x-auto py-1"
          role="tablist"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border border-primary/30 bg-primary/15 text-primary shadow-[0_0_14px_rgba(94,234,212,0.25)]"
                    : "border border-[rgba(255,255,255,0.08)] text-muted-foreground hover:border-[rgba(255,255,255,0.18)] hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
