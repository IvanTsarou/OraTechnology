"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  curriculumCategories,
  curriculumTeachers,
  studentLevels,
  type StudentLevel,
} from "@/lib/curriculum-data"

interface CurriculumSidebarProps {
  selectedCategories: string[]
  onCategoriesChange: (ids: string[]) => void
  selectedTeachers: string[]
  onTeachersChange: (ids: string[]) => void
  selectedLevels: StudentLevel[]
  onLevelsChange: (levels: StudentLevel[]) => void
  onReset: () => void
}

export function CurriculumSidebar({
  selectedCategories,
  onCategoriesChange,
  selectedTeachers,
  onTeachersChange,
  selectedLevels,
  onLevelsChange,
  onReset,
}: CurriculumSidebarProps) {
  const [teacherSearch, setTeacherSearch] = useState("")

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedTeachers.length > 0 ||
    selectedLevels.length > 0

  const filteredTeachers = useMemo(() => {
    if (!teacherSearch.trim()) return curriculumTeachers
    const q = teacherSearch.trim().toLowerCase()
    return curriculumTeachers.filter((t) => t.name.toLowerCase().includes(q))
  }, [teacherSearch])

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== id))
    } else {
      onCategoriesChange([...selectedCategories, id])
    }
  }

  const toggleTeacher = (id: string) => {
    if (selectedTeachers.includes(id)) {
      onTeachersChange(selectedTeachers.filter((t) => t !== id))
    } else {
      onTeachersChange([...selectedTeachers, id])
    }
  }

  const toggleLevel = (level: StudentLevel) => {
    if (selectedLevels.includes(level)) {
      onLevelsChange(selectedLevels.filter((l) => l !== level))
    } else {
      onLevelsChange([...selectedLevels, level])
    }
  }

  return (
    <aside className="flex w-full flex-col overflow-hidden border-r border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] lg:w-64 lg:shrink-0">
      <ScrollArea className="h-full max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-5 p-4">
          {/* Reset button */}
          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center gap-2 rounded-lg border border-[rgba(255,255,255,0.1)] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Сбросить фильтры
            </button>
          )}

          {/* Категория / Проект */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Проект</h3>
            <div className="flex flex-col gap-1">
              {curriculumCategories.map((cat) => (
                <label
                  key={cat.id}
                  className={cn(
                    "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                    selectedCategories.includes(cat.id) && cat.bgClass
                  )}
                >
                  <Checkbox
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() => toggleCategory(cat.id)}
                    className="shrink-0"
                  />
                  <span
                    className="truncate text-sm"
                    style={{
                      color: selectedCategories.includes(cat.id)
                        ? cat.color
                        : undefined,
                    }}
                  >
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Уровень */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Уровень</h3>
            <div className="flex flex-col gap-1">
              {studentLevels.map((level) => (
                <label
                  key={level.id}
                  className={cn(
                    "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                    selectedLevels.includes(level.id) && "bg-primary/10"
                  )}
                >
                  <Checkbox
                    checked={selectedLevels.includes(level.id)}
                    onCheckedChange={() => toggleLevel(level.id)}
                    className="shrink-0"
                  />
                  <span className="truncate text-sm text-foreground">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Учитель */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Учитель</h3>
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
                    "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                    selectedTeachers.includes(teacher.id) && "bg-primary/10"
                  )}
                >
                  <Checkbox
                    checked={selectedTeachers.includes(teacher.id)}
                    onCheckedChange={() => toggleTeacher(teacher.id)}
                    className="shrink-0"
                  />
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                    <Image
                      src={teacher.avatar}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  </div>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                    {teacher.name}
                  </span>
                </label>
              ))}
              {filteredTeachers.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Никого не найдено
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
