"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseGrid } from "@/components/course-grid"
import { LibraryGrid } from "@/components/library-grid"
import { CourseCard } from "@/components/course-card"
import { LibraryCard } from "@/components/library-card"
import type { Teacher } from "@/lib/teachers-data"
import {
  getCoursesByTeacherId,
  getLibraryItemsByTeacherId,
  teacherReviews,
} from "@/lib/teachers-data"
import { Star } from "lucide-react"
import Image from "next/image"

interface TeacherProfileTabsProps {
  teacher: Teacher
}

export function TeacherProfileTabs({ teacher }: TeacherProfileTabsProps) {
  const courses = getCoursesByTeacherId(teacher.id)
  const materials = getLibraryItemsByTeacherId(teacher.id)
  const reviews = teacherReviews[teacher.id] || []

  return (
    <Tabs defaultValue="courses" className="w-full">
      <TabsList className="mb-6 bg-[rgba(255,255,255,0.04)]">
        <TabsTrigger value="courses">
          Курсы ({courses.length})
        </TabsTrigger>
        <TabsTrigger value="materials">
          Материалы ({materials.length})
        </TabsTrigger>
        <TabsTrigger value="reviews">
          Отзывы ({reviews.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="courses" className="mt-0">
        {courses.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} linkToTeacherId={teacher.id} />
            ))}
          </div>
        ) : (
          <p className="px-4 text-muted-foreground lg:px-8">
            У этого учителя пока нет курсов в каталоге.
          </p>
        )}
      </TabsContent>

      <TabsContent value="materials" className="mt-0">
        {materials.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {materials.map((item, index) => (
              <LibraryCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <p className="px-4 text-muted-foreground lg:px-8">
            У этого автора пока нет материалов в библиотеке.
          </p>
        )}
      </TabsContent>

      <TabsContent value="reviews" className="mt-0">
        {reviews.length > 0 ? (
          <ul className="mx-auto max-w-3xl space-y-6 px-4 lg:px-8">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]">
                    <Image
                      src={review.authorAvatar}
                      alt={review.authorName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-foreground">
                        {review.authorName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i <= review.rating
                              ? "fill-[#fbbf24] text-[#fbbf24]"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {review.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 text-muted-foreground lg:px-8">
            Отзывов пока нет.
          </p>
        )}
      </TabsContent>
    </Tabs>
  )
}
