"use client"

import dynamic from "next/dynamic"

const MainScene = dynamic(() => import("@/components/main/main-scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1f3a]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="font-serif text-lg text-foreground/70">Загрузка...</p>
      </div>
    </div>
  ),
})

export default function MainPage() {
  return <MainScene />
}
