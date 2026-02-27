import type { NavItem } from '@/types'

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Курсы', href: '/' },
  { label: 'Библиотека', href: '/library' },
  { label: 'Учителя', href: '/teachers' },
  { label: 'Проекты', href: '/projects' },
  { label: 'Учебный план', href: '/curriculum' },
  { label: 'Артефакты', href: '/artifacts' },
  { label: 'Блог', href: '/blog' },
] as const
