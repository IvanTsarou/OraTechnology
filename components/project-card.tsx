"use client"

import Image from "next/image"
import type { Project } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  isActive: boolean
  onClick: () => void
}

export function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "project-card glass-card flex shrink-0 flex-col overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-0.5",
        "w-[280px] sm:w-[320px]",
        isActive
          ? "ring-2 ring-primary/50 shadow-[0_0_20px_rgba(94,234,212,0.15)]"
          : "opacity-90 hover:opacity-100 hover:ring-1 hover:ring-[rgba(255,255,255,0.15)]"
      )}
    >
      <div className="group relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#232946]/70 to-transparent" />
        <h3 className="absolute bottom-3 left-3 right-3 font-serif text-lg font-semibold tracking-wide text-foreground drop-shadow-md">
          {project.name}
        </h3>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
      </div>
    </button>
  )
}
