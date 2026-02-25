"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeacherSearchFilters } from "@/components/teacher-search-filters"
import { TeachersGrid } from "@/components/teachers-grid"
import { teachers, teacherCategories } from "@/lib/teachers-data"

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filterKey, setFilterKey] = useState(0)

  const filteredTeachers = useMemo(() => {
    let list = teachers

    if (activeCategory !== "all") {
      list = list.filter((t) => t.categoryIds.includes(activeCategory))
    }

    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.specializations.some((s) => s.toLowerCase().includes(q)) ||
          t.bioShort.toLowerCase().includes(q)
      )
    }

    return list
  }, [searchQuery, activeCategory])

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id)
    setFilterKey((k) => k + 1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="pb-6 pt-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="font-serif text-3xl font-semibold tracking-wide text-foreground">
              Учителя
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Наши преподаватели — практики с многолетним опытом в разных традициях.
              Выберите направление или найдите учителя по имени и специализации.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-7xl px-4 lg:px-8">
            <TeacherSearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={teacherCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        <section className="pb-16 pt-4">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 px-4 lg:px-8">
            <h2 className="sr-only">Каталог учителей</h2>
            <span className="text-sm text-muted-foreground">
              Найдено учителей:{" "}
              <span className="font-medium text-foreground">
                {filteredTeachers.length}
              </span>
            </span>
          </div>

          {filteredTeachers.length > 0 ? (
            <TeachersGrid
              teachers={filteredTeachers}
              filterKey={String(filterKey)}
            />
          ) : (
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-muted-foreground">
                  По вашему запросу учителей не найдено.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Измените поиск или категорию.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
