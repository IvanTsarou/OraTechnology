"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, X, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CurriculumSidebar } from "@/components/curriculum-sidebar"
import { CurriculumMonth } from "@/components/curriculum-month"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  months,
  getCoursesByMonth,
  curriculumCategories,
  curriculumTeachers,
  studentLevels,
  type StudentLevel,
} from "@/lib/curriculum-data"

export default function CurriculumPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<StudentLevel[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [teacherSearch, setTeacherSearch] = useState("")

  const filteredTeachers = useMemo(() => {
    if (!teacherSearch.trim()) return curriculumTeachers
    const q = teacherSearch.trim().toLowerCase()
    return curriculumTeachers.filter((t) => t.name.toLowerCase().includes(q))
  }, [teacherSearch])

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedTeachers([])
    setSelectedLevels([])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedTeachers.length + selectedLevels.length

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  const toggleTeacher = (id: string) => {
    if (selectedTeachers.includes(id)) {
      setSelectedTeachers(selectedTeachers.filter((t) => t !== id))
    } else {
      setSelectedTeachers([...selectedTeachers, id])
    }
  }

  const toggleLevel = (level: StudentLevel) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
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
              Учебный план
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Расписание курсов
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

        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <CurriculumSidebar
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedTeachers={selectedTeachers}
              onTeachersChange={setSelectedTeachers}
              selectedLevels={selectedLevels}
              onLevelsChange={setSelectedLevels}
              onReset={handleReset}
            />
          </div>

          {/* Main content */}
          <section className="min-w-0 flex-1 pb-16 pt-2 lg:pt-6">
            <div className="mb-6 hidden px-4 lg:block lg:px-8">
              <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                Учебный план
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Годовое расписание онлайн и офлайн курсов Eira — с сентября по
                август.
              </p>
            </div>

            <div className="px-4 lg:px-8">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {months.map((month) => {
                  const courses = getCoursesByMonth(month.key)
                  return (
                    <CurriculumMonth
                      key={month.key}
                      label={month.label}
                      courses={courses}
                      selectedCategories={selectedCategories}
                      selectedTeachers={selectedTeachers}
                      selectedLevels={selectedLevels}
                    />
                  )
                })}
              </div>
            </div>
          </section>
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

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Проект</h3>
              <div className="flex flex-col gap-1">
                {curriculumCategories.map((cat) => (
                  <label
                    key={cat.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedCategories.includes(cat.id) && cat.bgClass
                    )}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    <span
                      className="text-sm"
                      style={
                        selectedCategories.includes(cat.id)
                          ? { color: cat.color }
                          : undefined
                      }
                    >
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Уровень</h3>
              <div className="flex flex-col gap-1">
                {studentLevels.map((level) => (
                  <label
                    key={level.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedLevels.includes(level.id) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedLevels.includes(level.id)}
                      onCheckedChange={() => toggleLevel(level.id)}
                    />
                    <span className="text-sm text-foreground">
                      {level.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Teachers */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Преподаватель
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex flex-col gap-1">
                {filteredTeachers.map((teacher) => (
                  <label
                    key={teacher.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      selectedTeachers.includes(teacher.id) && "bg-primary/10"
                    )}
                  >
                    <Checkbox
                      checked={selectedTeachers.includes(teacher.id)}
                      onCheckedChange={() => toggleTeacher(teacher.id)}
                    />
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                      <Image
                        src={teacher.avatar}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="truncate text-sm text-foreground">
                      {teacher.name}
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
