"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectBar } from "@/components/project-bar"
import { CourseGrid } from "@/components/course-grid"
import { projects, getCoursesByProjectId } from "@/lib/projects-data"
import type { Course } from "@/components/course-card"

export default function ProjectsPage() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const [courses, setCourses] = useState<Course[]>(
    getCoursesByProjectId(projects[0].id)
  )
  const [animationKey, setAnimationKey] = useState(projects[0].id)

  useEffect(() => {
    setCourses([])
    const timer = setTimeout(() => {
      setCourses(getCoursesByProjectId(activeProjectId))
      setAnimationKey(activeProjectId + Date.now())
    }, 150)
    return () => clearTimeout(timer)
  }, [activeProjectId])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Карточки проектов + описание */}
        <section className="pb-6 pt-8">
          <ProjectBar
            projects={projects}
            activeProjectId={activeProjectId}
            onProjectChange={setActiveProjectId}
          />
        </section>

        {/* Карточки курсов внутри проекта */}
        <section className="pb-16 pt-2">
          {courses.length > 0 ? (
            <CourseGrid courses={courses} animationKey={animationKey} />
          ) : (
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center justify-center py-20">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
