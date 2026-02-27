'use client'

import { useState, useEffect, useCallback, type RefObject } from 'react'
import type { UseScrollIndicatorReturn, ScrollDirection } from '@/types'

const SCROLL_OFFSET = 2
const SCROLL_AMOUNT = 200

interface UseScrollIndicatorOptions {
  scrollRef: RefObject<HTMLElement | null>
}

interface UseScrollIndicatorFullReturn extends UseScrollIndicatorReturn {
  scroll: (direction: ScrollDirection) => void
}

export function useScrollIndicator({
  scrollRef,
}: UseScrollIndicatorOptions): UseScrollIndicatorFullReturn {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > SCROLL_OFFSET)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_OFFSET)
  }, [scrollRef])

  const scroll = useCallback(
    (direction: ScrollDirection) => {
      const el = scrollRef.current
      if (!el) return

      el.scrollBy({
        left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: 'smooth',
      })
    },
    [scrollRef]
  )

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, scrollRef])

  return {
    canScrollLeft,
    canScrollRight,
    checkScroll,
    scroll,
  }
}
