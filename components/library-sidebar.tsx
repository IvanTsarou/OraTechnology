"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { MaterialType } from "@/lib/library-data"
import { getTypeLabel } from "@/lib/library-data"
import type { LibraryAuthor } from "@/lib/library-data"

const MATERIAL_TYPES: MaterialType[] = ["article", "video", "other"]

interface LibrarySidebarProps {
  selectedTypes: MaterialType[]
  onTypesChange: (types: MaterialType[]) => void
  selectedAuthorIds: string[]
  onAuthorIdsChange: (ids: string[]) => void
  authors: LibraryAuthor[]
}

export function LibrarySidebar({
  selectedTypes,
  onTypesChange,
  selectedAuthorIds,
  onAuthorIdsChange,
  authors,
}: LibrarySidebarProps) {
  const [authorSearch, setAuthorSearch] = useState("")

  const filteredAuthors = useMemo(() => {
    if (!authorSearch.trim()) return authors
    const q = authorSearch.trim().toLowerCase()
    return authors.filter((a) => a.name.toLowerCase().includes(q))
  }, [authors, authorSearch])

  const toggleType = (type: MaterialType) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypesChange([...selectedTypes, type])
    }
  }

  const toggleAuthor = (id: string) => {
    if (selectedAuthorIds.includes(id)) {
      onAuthorIdsChange(selectedAuthorIds.filter((aid) => aid !== id))
    } else {
      onAuthorIdsChange([...selectedAuthorIds, id])
    }
  }

  return (
    <aside className="flex w-full flex-col border-r border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] lg:w-64 lg:shrink-0">
      <ScrollArea className="h-full max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-14rem)]">
        <div className="flex flex-col gap-6 p-4">
          {/* Тип материала */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Тип материала
            </h3>
            <div className="flex flex-col gap-2">
              {MATERIAL_TYPES.map((type) => (
                <label
                  key={type}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
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

          {/* Автор */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Автор</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск по имени..."
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
                    "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
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
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                    {author.name}
                  </span>
                  <Link
                    href={`/teachers/${author.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 text-xs text-primary hover:underline"
                  >
                    Профиль
                  </Link>
                </label>
              ))}
              {filteredAuthors.length === 0 && (
                <p className="px-2 py-2 text-sm text-muted-foreground">
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
