"use client"

import Image from "next/image"
import Link from "next/link"
import type { LibraryItem } from "@/lib/library-data"
import { getTypeLabel } from "@/lib/library-data"

interface LibraryCardProps {
  item: LibraryItem
  index: number
}

export function LibraryCard({ item, index }: LibraryCardProps) {
  return (
    <article
      className="library-card glass-card group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f35]/60 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.5)] px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {getTypeLabel(item.type)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-base font-semibold leading-snug text-foreground tracking-wide line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <Link
            href={`/teachers/${item.authorId}`}
            className="flex min-w-0 items-center gap-2 transition-colors hover:text-primary"
          >
            <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
              <Image
                src={item.authorAvatar}
                alt={item.authorName}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="truncate">{item.authorName}</span>
          </Link>
          <time className="shrink-0 text-xs">{item.date}</time>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </article>
  )
}
