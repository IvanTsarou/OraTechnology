# Отчёт по рефакторингу кодовой базы Ora Technology

**Дата:** 27 февраля 2026  
**Версия:** 1.0  
**Стек:** Next.js 16, TypeScript 5, React 18

---

## Содержание

1. [Цели рефакторинга](#цели-рефакторинга)
2. [Новая структура проекта](#новая-структура-проекта)
3. [Типизация](#типизация)
4. [Константы и данные](#константы-и-данные)
5. [Кастомные хуки](#кастомные-хуки)
6. [Компоненты](#компоненты)
7. [Оптимизация производительности](#оптимизация-производительности)
8. [Конфигурация TypeScript](#конфигурация-typescript)
9. [Обратная совместимость](#обратная-совместимость)
10. [Рекомендации по дальнейшему развитию](#рекомендации-по-дальнейшему-развитию)

---

## Цели рефакторинга

- **Строгая типизация** — миграция на TypeScript strict mode
- **Модульная архитектура** — разделение монолитных файлов на переиспользуемые модули
- **Инкапсуляция логики** — вынос бизнес-логики в кастомные хуки
- **Оптимизация рендеринга** — применение React.memo, useCallback, useMemo
- **Единообразие кода** — стандартизация именования и структуры

---

## Новая структура проекта

```
/Users/air/Sites/Ora/
├── types/
│   └── index.ts                    # Централизованные TypeScript интерфейсы
│
├── constants/
│   ├── index.ts                    # Реэкспорт всех констант
│   ├── navigation.ts               # NAV_ITEMS
│   └── courses.ts                  # CATEGORIES, COURSES_BY_CATEGORY, INSTRUCTORS
│
├── hooks/
│   ├── index.ts                    # Реэкспорт всех хуков
│   ├── useScrolled.ts              # Отслеживание скролла
│   ├── useCategoryTransition.ts    # Логика смены категории с анимацией
│   └── useScrollIndicator.ts       # Индикаторы горизонтальной прокрутки
│
├── components/
│   ├── layout/
│   │   ├── index.ts
│   │   ├── Header.tsx              # Глобальный хедер
│   │   └── Footer.tsx              # Глобальный футер
│   │
│   ├── courses/
│   │   ├── index.ts
│   │   ├── CourseCard.tsx          # Карточка курса (memo)
│   │   ├── CoursesGrid.tsx         # Сетка карточек
│   │   ├── CategoryRibbon.tsx      # Лента категорий
│   │   └── CategoryDescription.tsx # Описание категории (accordion)
│   │
│   └── [legacy files]              # Deprecated файлы с реэкспортами
│
└── app/
    └── page.tsx                    # Главная страница курсов
```

---

## Типизация

### Файл: `types/index.ts`

Все интерфейсы собраны в одном месте и используют `readonly` для иммутабельности:

```typescript
// Навигация
interface NavItem {
  readonly label: string
  readonly href: string
}

// Категории курсов
interface Category {
  readonly id: string
  readonly label: string
  readonly teaser: string
  readonly fullDescription: string
}

// Курсы
interface Course {
  readonly id: string
  readonly title: string
  readonly instructor: string
  readonly avatar: string
  readonly image: string
  readonly price: string
  readonly lessons: number
}

// Props компонентов
interface CategoryBarProps {
  readonly categories: readonly Category[]
  readonly activeCategory: string
  readonly onCategoryChange: (id: string) => void
}

interface CourseCardProps {
  readonly course: Course
  readonly index: number
  readonly linkToTeacherId?: string
}

interface CourseGridProps {
  readonly courses: readonly Course[]
  readonly animationKey: string
}

// Return types хуков
interface UseCategoryTransitionReturn {
  readonly activeId: string
  readonly courses: readonly Course[]
  readonly animating: boolean
  readonly handleChange: (id: string) => void
}
```

### Принципы типизации

| Правило | Описание |
|---------|----------|
| `interface` vs `type` | Используем `interface` для объектов, `type` для union/utility types |
| `readonly` | Все свойства интерфейсов помечены как readonly |
| `readonly T[]` | Массивы в props используют `readonly` модификатор |
| Без `any` | Запрещено использование `any`, при необходимости — `unknown` |

---

## Константы и данные

### Файл: `constants/navigation.ts`

```typescript
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Курсы', href: '/' },
  { label: 'Библиотека', href: '/library' },
  { label: 'Учителя', href: '/teachers' },
  // ...
] as const
```

### Файл: `constants/courses.ts`

```typescript
export const INSTRUCTORS: readonly Instructor[] = [...]
export const CATEGORIES: readonly Category[] = [...]
export const COURSES_BY_CATEGORY: CoursesByCategory = {...}
export const DEFAULT_CATEGORY_ID = 'sephirotic'
```

### Именование констант

- Константы в `UPPER_SNAKE_CASE`
- Массивы помечены `as const` для литеральных типов
- Фабричная функция `createCourse()` для создания объектов курсов

---

## Кастомные хуки

### `useScrolled(threshold?: number): boolean`

Отслеживает позицию скролла и возвращает `true`, если страница прокручена.

```typescript
// Использование
const scrolled = useScrolled(10)

// Реализация
export function useScrolled(threshold = 10): boolean {
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
```

### `useCategoryTransition(initialId, coursesByCategory)`

Инкапсулирует логику смены категории с анимацией перехода.

```typescript
// Использование
const { activeId, courses, animating, handleChange } = useCategoryTransition(
  DEFAULT_CATEGORY_ID,
  COURSES_BY_CATEGORY
)

// Возвращает
{
  activeId: string,        // Текущая активная категория
  courses: Course[],       // Курсы текущей категории
  animating: boolean,      // Флаг анимации перехода
  handleChange: (id) => void  // Функция смены категории
}
```

### `useScrollIndicator({ scrollRef })`

Управляет индикаторами прокрутки для горизонтальных списков.

```typescript
// Использование
const scrollRef = useRef<HTMLDivElement>(null)
const { canScrollLeft, canScrollRight, scroll } = useScrollIndicator({ scrollRef })

// Возвращает
{
  canScrollLeft: boolean,
  canScrollRight: boolean,
  checkScroll: () => void,
  scroll: (direction: 'left' | 'right') => void
}
```

---

## Компоненты

### `CourseCard` (с React.memo)

```typescript
const CourseCardComponent = ({ course, index, linkToTeacherId }: CourseCardProps) => {
  // Мемоизация стилей анимации
  const animationStyle = useMemo<CSSProperties>(
    () => ({
      animationDelay: `${index * 100}ms`,
      animationFillMode: 'both',
    }),
    [index]
  )

  // Мемоизация блока инструктора
  const instructorBlock = useMemo(() => {...}, [course.avatar, course.instructor, teacherId])

  return <article>...</article>
}

export const CourseCard = memo(CourseCardComponent)
```

### `Header`

- Вынесен `NavLink` как внутренний компонент
- `useCallback` для `toggleMobileMenu` и `closeMobileMenu`
- `useMemo` для массива `navLinks` с предвычисленным `isActive`

### `CategoryRibbon`

- Использует хук `useScrollIndicator`
- Внутренний компонент `CategoryPill` для отдельных кнопок
- `useCallback` для всех обработчиков

---

## Оптимизация производительности

| Техника | Применение |
|---------|------------|
| `React.memo` | `CourseCard`, `CategoryDescription` |
| `useCallback` | Все обработчики событий в компонентах |
| `useMemo` | Вычисляемые данные, стили, JSX-блоки |
| `passive: true` | Все scroll event listeners |
| Cleanup в useEffect | Удаление listeners при размонтировании |

### Пример оптимизации в CourseCard

```typescript
// До (пересоздаётся при каждом рендере)
style={{ animationDelay: `${index * 100}ms` }}

// После (мемоизировано)
const animationStyle = useMemo(() => ({
  animationDelay: `${index * ANIMATION_DELAY_MS}ms`,
  animationFillMode: 'both',
}), [index])
```

---

## Конфигурация TypeScript

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Включённые проверки

| Опция | Описание |
|-------|----------|
| `strict` | Включает все strict-флаги |
| `noImplicitAny` | Запрет неявного any |
| `strictNullChecks` | Строгая проверка null/undefined |
| `noImplicitReturns` | Все пути функции должны возвращать значение |
| `noFallthroughCasesInSwitch` | Запрет проваливания в switch |

---

## Обратная совместимость

Старые файлы сохранены с реэкспортами для плавной миграции:

```typescript
// components/header.tsx
/**
 * @deprecated Use `@/components/layout` instead
 */
export { Header } from './layout'

// components/course-card.tsx
/**
 * @deprecated Use `@/components/courses` instead
 */
export { CourseCard } from './courses'
export type { Course } from '@/types'

// lib/courses-data.ts
/**
 * @deprecated Use `@/constants` instead
 */
export const categories = CATEGORIES
export const coursesByCategory = COURSES_BY_CATEGORY
```

---

## Рекомендации по дальнейшему развитию

### Краткосрочные

1. **Применить паттерн к другим страницам** — Library, Teachers, Blog
2. **Добавить ESLint правила** — `@typescript-eslint/no-explicit-any`, `react-hooks/exhaustive-deps`
3. **Удалить deprecated файлы** после обновления всех импортов

### Среднесрочные

1. **Внедрить Zod** для runtime валидации данных
2. **Добавить unit-тесты** для хуков с React Testing Library
3. **Настроить Storybook** для компонентов

### Долгосрочные

1. **Перейти на Server Components** где возможно
2. **Внедрить React Query** для кэширования данных
3. **Добавить E2E тесты** с Playwright

---

## Статистика изменений

```
26 files changed
+1060 insertions
-769 deletions

Новые файлы:
├── types/index.ts
├── constants/courses.ts
├── constants/navigation.ts
├── constants/index.ts
├── hooks/useScrolled.ts
├── hooks/useCategoryTransition.ts
├── hooks/useScrollIndicator.ts
├── hooks/index.ts
├── components/layout/Header.tsx
├── components/layout/Footer.tsx
├── components/layout/index.ts
├── components/courses/CourseCard.tsx
├── components/courses/CoursesGrid.tsx
├── components/courses/CategoryRibbon.tsx
├── components/courses/CategoryDescription.tsx
└── components/courses/index.ts
```

---

## Заключение

Рефакторинг успешно завершён. Кодовая база теперь:

- ✅ Строго типизирована с TypeScript strict mode
- ✅ Модульно организована с чёткими границами ответственности
- ✅ Оптимизирована для производительности рендеринга
- ✅ Готова к масштабированию и командной разработке
- ✅ Обратно совместима с существующим кодом
