"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { ProjectCard } from "./project-card"
import type { Project } from "@/lib/projects-data"

interface ProjectBarProps {
  projects: Project[]
  activeProjectId: string
  onProjectChange: (id: string) => void
}

export function ProjectBar({
  projects,
  activeProjectId,
  onProjectChange,
}: ProjectBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const activeProject = projects.find((p) => p.id === activeProjectId)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" })
  }

  return (
    <section className="w-full">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:left-4"
            aria-label="Влево"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm transition-colors hover:text-primary lg:right-4"
            aria-label="Вправо"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-4 overflow-x-auto py-2"
          role="tablist"
          aria-label="Проекты"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={project.id === activeProjectId}
              onClick={() => {
                onProjectChange(project.id)
                setExpanded(false)
              }}
            />
          ))}
        </div>
      </div>

      {/* Полное описание выбранного проекта */}
      {activeProject && (
        <div className="mx-auto mt-4 max-w-7xl px-4 lg:px-8">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full cursor-pointer rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-4 text-left transition-colors hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)]"
            aria-expanded={expanded}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {expanded
                  ? activeProject.fullDescription
                  : activeProject.shortDescription}
              </p>
              <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-primary">
                {expanded ? (
                  <>
                    Свернуть <ChevronUp className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Подробнее <ChevronDown className="h-3.5 w-3.5" />
                  </>
                )}
              </span>
            </div>
          </button>
        </div>
      )}
    </section>
  )
}
