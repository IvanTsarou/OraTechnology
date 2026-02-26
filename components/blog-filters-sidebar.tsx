"use client"

import { Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { blogCategories, type DatePreset } from "@/lib/blog-data"

const datePresets: { id: DatePreset; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "today", label: "Сегодня" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "year", label: "Год" },
]

interface BlogFiltersSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategories: string[]
  onCategoriesChange: (ids: string[]) => void
  datePreset: DatePreset
  onDatePresetChange: (preset: DatePreset) => void
  onReset: () => void
  resultsCount: number
}

export function BlogFiltersSidebar({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  datePreset,
  onDatePresetChange,
  onReset,
  resultsCount,
}: BlogFiltersSidebarProps) {
  const hasFilters =
    searchQuery.trim() !== "" ||
    selectedCategories.length > 0 ||
    datePreset !== "all"

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== id))
    } else {
      onCategoriesChange([...selectedCategories, id])
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-[rgba(255,255,255,0.02)] p-4">
      {/* Results count & Reset */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          Найдено:{" "}
          <span className="font-medium text-foreground">{resultsCount}</span>
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Сброс
          </button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Поиск</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="По тексту..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Категории</h3>
        <div className="flex flex-col gap-1">
          {blogCategories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id)
            return (
              <label
                key={cat.id}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                  isSelected && "bg-primary/10"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleCategory(cat.id)}
                  className="shrink-0"
                />
                <span className="truncate text-sm text-foreground">{cat.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Date presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Дата</h3>
        <div className="flex flex-wrap gap-2">
          {datePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onDatePresetChange(preset.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                datePreset === preset.id
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-[rgba(255,255,255,0.1)] text-muted-foreground hover:border-[rgba(255,255,255,0.2)] hover:text-foreground"
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
