"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { blogAuthors, getPostCountByAuthor } from "@/lib/blog-data"

interface BlogAuthorsSidebarProps {
  selectedAuthors: string[]
  onAuthorsChange: (ids: string[]) => void
  onReset: () => void
}

export function BlogAuthorsSidebar({
  selectedAuthors,
  onAuthorsChange,
  onReset,
}: BlogAuthorsSidebarProps) {
  const [search, setSearch] = useState("")

  const hasFilters = selectedAuthors.length > 0

  const filteredAuthors = useMemo(() => {
    if (!search.trim()) return blogAuthors
    const q = search.trim().toLowerCase()
    return blogAuthors.filter((a) => a.name.toLowerCase().includes(q))
  }, [search])

  const toggleAuthor = (id: string) => {
    if (selectedAuthors.includes(id)) {
      onAuthorsChange(selectedAuthors.filter((a) => a !== id))
    } else {
      onAuthorsChange([...selectedAuthors, id])
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-[rgba(255,255,255,0.02)] p-4">
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

      {/* Авторы */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Авторы</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск автора..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-col gap-1">
          {filteredAuthors.map((author) => {
            const postCount = getPostCountByAuthor(author.id)
            const isSelected = selectedAuthors.includes(author.id)

            return (
              <label
                key={author.id}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                  isSelected && "bg-primary/10"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleAuthor(author.id)}
                  className="shrink-0"
                />
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {postCount} публ.
                  </p>
                </div>
              </label>
            )
          })}
          {filteredAuthors.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Авторы не найдены
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
