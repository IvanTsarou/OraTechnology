"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, X, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LibraryCategoryBar } from "@/components/library-category-bar"
import { LibrarySidebar } from "@/components/library-sidebar"
import { LibraryCard } from "@/components/library-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  libraryCategories,
  libraryItems,
  libraryAuthors,
  getTypeLabel,
  type MaterialType,
} from "@/lib/library-data"

const MATERIAL_TYPES: MaterialType[] = ["article", "video", "other"]

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTypes, setSelectedTypes] = useState<MaterialType[]>([])
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([])
  const [filterKey, setFilterKey] = useState(0)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [authorSearch, setAuthorSearch] = useState("")

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

  const filteredAuthors = useMemo(() => {
    if (!authorSearch.trim()) return libraryAuthors
    const q = authorSearch.trim().toLowerCase()
    return libraryAuthors.filter((a) => a.name.toLowerCase().includes(q))
  }, [authorSearch])

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

  const handleReset = () => {
    setSelectedTypes([])
    setSelectedAuthorIds([])
    setFilterKey((k) => k + 1)
  }

  const activeFiltersCount = selectedTypes.length + selectedAuthorIds.length

  const toggleType = (type: MaterialType) => {
    if (selectedTypes.includes(type)) {
      handleTypesChange(selectedTypes.filter((t) => t !== type))
    } else {
      handleTypesChange([...selectedTypes, type])
    }
  }

  const toggleAuthor = (id: string) => {
    if (selectedAuthorIds.includes(id)) {
      handleAuthorIdsChange(selectedAuthorIds.filter((a) => a !== id))
    } else {
      handleAuthorIdsChange([...selectedAuthorIds, id])
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1">
        {/* Left Sidebar - Filters (desktop) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-r border-[rgba(255,255,255,0.08)]">
          <LibrarySidebar
            selectedTypes={selectedTypes}
            onTypesChange={handleTypesChange}
            selectedAuthorIds={selectedAuthorIds}
            onAuthorIdsChange={handleAuthorIdsChange}
            authors={libraryAuthors}
            onReset={handleReset}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Mobile header with filters button */}
          <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-6 lg:hidden">
            <div>
              <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
                Библиотека
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredItems.length} материалов
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm font-medium text-foreground"
            >
              <Filter className="h-4 w-4" />
              Фильтры
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Category filters */}
          <section className="pb-4 pt-2 lg:pt-8">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <LibraryCategoryBar
                categories={libraryCategories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </section>

          {/* Content */}
          <section className="pb-16 pt-2 lg:pt-4">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mb-6 hidden items-baseline justify-between gap-4 lg:flex">
                <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                  Библиотека
                </h1>
                <span className="text-sm text-muted-foreground">
                  Найдено:{" "}
                  <span className="font-medium text-foreground">
                    {filteredItems.length}
                  </span>
                </span>
              </div>

              {filteredItems.length > 0 ? (
                <div
                  key={filterKey}
                  className="library-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredItems.map((item, index) => (
                    <LibraryCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-muted-foreground">
                    По выбранным фильтрам материалов не найдено.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar - placeholder for future use (desktop) */}
        <aside className="hidden w-64 shrink-0 xl:block">
          <div className="sticky top-[57px] h-[calc(100vh-57px)] border-l border-[rgba(255,255,255,0.08)]" />
        </aside>
      </main>

      <Footer />

      {/* Mobile filters sheet */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm transform bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-4">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            Фильтры
          </h2>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-4rem)] overflow-y-auto overscroll-contain p-4">
          <div className="flex flex-col gap-6">
            {/* Reset */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleReset()
                  setMobileFiltersOpen(false)
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-[rgba(255,255,255,0.1)] px-3 py-2.5 text-sm text-muted-foreground"
              >
                <X className="h-4 w-4" />
                Сбросить фильтры
              </button>
            )}

            {/* Material type */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Тип материала
              </h3>
              <div className="flex flex-col gap-1">
                {MATERIAL_TYPES.map((type) => (
                  <label
                    key={type}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedTypes.includes(type) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                    />
                    <span className="text-sm text-foreground">
                      {getTypeLabel(type)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Автор</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск..."
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-col gap-1">
                {filteredAuthors.map((author) => (
                  <label
                    key={author.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedAuthorIds.includes(author.id) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedAuthorIds.includes(author.id)}
                      onCheckedChange={() => toggleAuthor(author.id)}
                    />
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="truncate text-sm text-foreground">
                      {author.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
