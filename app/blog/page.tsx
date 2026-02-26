"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, X, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { BlogAuthorsSidebar } from "@/components/blog-authors-sidebar"
import { BlogFiltersSidebar } from "@/components/blog-filters-sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  blogPosts,
  blogAuthors,
  blogCategories,
  filterPostsByDate,
  getPostCountByAuthor,
  type DatePreset,
} from "@/lib/blog-data"

const datePresets: { id: DatePreset; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "year", label: "Год" },
]

export default function BlogPage() {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [datePreset, setDatePreset] = useState<DatePreset>("all")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [authorSearch, setAuthorSearch] = useState("")

  const filteredPosts = useMemo(() => {
    let posts = blogPosts

    if (selectedAuthors.length > 0) {
      posts = posts.filter((p) => selectedAuthors.includes(p.authorId))
    }

    if (selectedCategories.length > 0) {
      posts = posts.filter((p) => selectedCategories.includes(p.categoryId))
    }

    posts = filterPostsByDate(posts, datePreset)

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      )
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [selectedAuthors, selectedCategories, datePreset, searchQuery])

  const filteredAuthors = useMemo(() => {
    if (!authorSearch.trim()) return blogAuthors
    const q = authorSearch.trim().toLowerCase()
    return blogAuthors.filter((a) => a.name.toLowerCase().includes(q))
  }, [authorSearch])

  const handleReset = () => {
    setSelectedAuthors([])
    setSearchQuery("")
    setSelectedCategories([])
    setDatePreset("all")
  }

  const activeFiltersCount =
    selectedAuthors.length +
    selectedCategories.length +
    (datePreset !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  const toggleAuthor = (id: string) => {
    if (selectedAuthors.includes(id)) {
      setSelectedAuthors(selectedAuthors.filter((a) => a !== id))
    } else {
      setSelectedAuthors([...selectedAuthors, id])
    }
  }

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Mobile header with filters button */}
        <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-6 lg:hidden">
          <div>
            <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
              Блог
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredPosts.length} публикаций
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

        <div className="flex">
          {/* Left sidebar - Authors (desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-r border-[rgba(255,255,255,0.08)]">
              <BlogAuthorsSidebar
              selectedAuthors={selectedAuthors}
              onAuthorsChange={setSelectedAuthors}
              onReset={() => setSelectedAuthors([])}
            />
            </div>
          </aside>

          {/* Main content - centered max-w-7xl */}
          <div className="min-w-0 flex-1">
            <section className="pb-16 pt-2 lg:pt-6">
              <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-6 hidden lg:block">
                  <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                    Блог
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Статьи, практики и новости от преподавателей Eira
                  </p>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 text-6xl opacity-30">📝</div>
                    <p className="text-lg font-medium text-foreground">
                      Публикации не найдены
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Попробуйте изменить параметры поиска
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/30"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right sidebar - Filters (desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-l border-[rgba(255,255,255,0.08)]">
              <BlogFiltersSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              datePreset={datePreset}
              onDatePresetChange={setDatePreset}
              onReset={handleReset}
              resultsCount={filteredPosts.length}
            />
            </div>
          </aside>
        </div>
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

            {/* Search */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Поиск</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Категории
              </h3>
              <div className="flex flex-col gap-1">
                {blogCategories.map((cat) => (
                  <label
                    key={cat.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedCategories.includes(cat.id) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    <span className="text-sm text-foreground">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Период</h3>
              <div className="flex flex-wrap gap-2">
                {datePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setDatePreset(preset.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                      datePreset === preset.id
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-[rgba(255,255,255,0.1)] text-muted-foreground"
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Авторы</h3>
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
                      selectedAuthors.includes(author.id) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedAuthors.includes(author.id)}
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        {author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getPostCountByAuthor(author.id)} публ.
                      </p>
                    </div>
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
