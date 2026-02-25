"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LibraryCategoryBar } from "@/components/library-category-bar"
import { LibrarySidebar } from "@/components/library-sidebar"
import { LibraryGrid } from "@/components/library-grid"
import {
  libraryCategories,
  libraryItems,
  libraryAuthors,
  type MaterialType,
} from "@/lib/library-data"

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTypes, setSelectedTypes] = useState<MaterialType[]>([])
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([])
  const [filterKey, setFilterKey] = useState(0)

  const filteredItems = useMemo(() => {
    let list = libraryItems

    if (activeCategory !== "all") {
      list = list.filter((item) => item.categoryId === activeCategory)
    }

    if (selectedTypes.length > 0) {
      list = list.filter((item) => selectedTypes.includes(item.type))
    }

    if (selectedAuthorIds.length > 0) {
      list = list.filter((item) => selectedAuthorIds.includes(item.authorId))
    }

    return list
  }, [activeCategory, selectedTypes, selectedAuthorIds])

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setFilterKey((k) => k + 1)
  }

  const handleTypesChange = (types: MaterialType[]) => {
    setSelectedTypes(types)
    setFilterKey((k) => k + 1)
  }

  const handleAuthorIdsChange = (ids: string[]) => {
    setSelectedAuthorIds(ids)
    setFilterKey((k) => k + 1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Category filters */}
        <section className="pb-4 pt-8">
          <LibraryCategoryBar
            categories={libraryCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <LibrarySidebar
            selectedTypes={selectedTypes}
            onTypesChange={handleTypesChange}
            selectedAuthorIds={selectedAuthorIds}
            onAuthorIdsChange={handleAuthorIdsChange}
            authors={libraryAuthors}
          />

          {/* Main content */}
          <section className="min-w-0 flex-1 pb-16 pt-4">
            <div className="mb-6 flex items-baseline justify-between gap-4 px-4 lg:px-8">
              <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                Библиотека
              </h1>
              <span className="text-sm text-muted-foreground">
                Найдено материалов:{" "}
                <span className="font-medium text-foreground">
                  {filteredItems.length}
                </span>
              </span>
            </div>

            {filteredItems.length > 0 ? (
              <LibraryGrid items={filteredItems} filterKey={String(filterKey)} />
            ) : (
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-muted-foreground">
                    По выбранным фильтрам материалов не найдено.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Измените категорию, тип или автора.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
