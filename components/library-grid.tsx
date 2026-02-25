"use client"

import { LibraryCard } from "./library-card"
import type { LibraryItem } from "@/lib/library-data"

interface LibraryGridProps {
  items: LibraryItem[]
  filterKey: string
}

export function LibraryGrid({ items, filterKey }: LibraryGridProps) {
  return (
    <div
      key={filterKey}
      className="library-grid mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
    >
      {items.map((item, index) => (
        <LibraryCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
