"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { blogAuthors, getPostCountByAuthor } from "@/lib/blog-data"

interface BlogAuthorsSidebarProps {
  selectedAuthors: string[]
  onAuthorsChange: (ids: string[]) => void
}

export function BlogAuthorsSidebar({
  selectedAuthors,
  onAuthorsChange,
}: BlogAuthorsSidebarProps) {
  const [search, setSearch] = useState("")

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
    <aside className="flex w-full flex-col border-r border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] lg:w-56 lg:shrink-0">
      <ScrollArea className="h-full max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-sm font-semibold text-foreground">Авторы</h2>

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
                    "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                    isSelected && "bg-primary/10"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
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
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm text-foreground">
                      {author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {postCount} {postCount === 1 ? "публикация" : postCount < 5 ? "публикации" : "публикаций"}
                    </span>
                  </div>
                </label>
              )
            })}
            {filteredAuthors.length === 0 && (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                Авторы не найдены
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
