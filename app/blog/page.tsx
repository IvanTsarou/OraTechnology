"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { BlogAuthorsSidebar } from "@/components/blog-authors-sidebar"
import { BlogFiltersSidebar } from "@/components/blog-filters-sidebar"
import { blogPosts, filterPostsByDate, type DatePreset } from "@/lib/blog-data"

export default function BlogPage() {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [datePreset, setDatePreset] = useState<DatePreset>("all")

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

  const handleReset = () => {
    setSelectedAuthors([])
    setSearchQuery("")
    setSelectedCategories([])
    setDatePreset("all")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Mobile filters toggle - shown on small screens */}
        <div className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 lg:hidden">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
              Фильтры
              <span className="text-xs text-muted-foreground">
                {filteredPosts.length} публикаций
              </span>
            </summary>
            <div className="mt-4 space-y-4">
              {/* Compact mobile filters */}
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
          </details>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left sidebar - Authors (hidden on mobile) */}
          <div className="hidden lg:block">
            <BlogAuthorsSidebar
              selectedAuthors={selectedAuthors}
              onAuthorsChange={setSelectedAuthors}
            />
          </div>

          {/* Main content */}
          <section className="min-w-0 flex-1 pb-16 pt-6">
            <div className="mb-6 px-4 lg:px-6">
              <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                Блог
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Статьи, практики и новости от преподавателей Eira
              </p>
            </div>

            <div className="px-4 lg:px-6">
              {filteredPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                    Попробуйте изменить параметры поиска или сбросить фильтры
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

          {/* Right sidebar - Filters (hidden on mobile, shown on tablet at top) */}
          <div className="hidden lg:block">
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
