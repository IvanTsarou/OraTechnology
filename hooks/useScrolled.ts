'use client'

import { useState, useEffect, useCallback } from 'react'

const SCROLL_THRESHOLD = 10

export function useScrolled(threshold = SCROLL_THRESHOLD): boolean {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrolled
}
