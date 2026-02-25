export interface UserProfile {
  id: string
  name: string
  avatar: string
  level: string
  bio: string
}

export interface UserCourse {
  id: string
  title: string
  image: string
  category: string
  teacherName: string
  teacherAvatar: string
  progress: number
  totalLessons: number
  completedLessons: number
  startDate: string
  endDate?: string
  isArchived: boolean
}

export interface DiaryReport {
  id: string
  date: string
  courseId?: string
  courseName?: string
  text: string
  preview: string
}

export interface DiaryNote {
  id: string
  title: string
  date: string
  image?: string
  isPublic: boolean
  categoryId?: string
  views?: number
  likes?: number
  commentsCount?: number
  preview: string
  content: string
}

export interface Subscription {
  id: string
  name: string
  avatar: string
  publicationsCount: number
  isSubscribed: boolean
  level?: string
}

export type FavoriteType = "course" | "article" | "blog" | "message" | "comment"

export interface FavoriteItem {
  id: string
  type: FavoriteType
  title: string
  preview: string
  source: string
  sourceAvatar?: string
  image?: string
  addedDate: string
}

export interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
  isRead: boolean
}

export interface Chat {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: ChatMessage[]
}

export type NotificationType = "comment" | "reply" | "like" | "course" | "system"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  text: string
  date: string
  isRead: boolean
  link?: string
}

export interface FeedItem {
  id: string
  type: "article" | "user_post" | "course_promo" | "artifact" | "announcement"
  title: string
  preview: string
  image?: string
  authorName: string
  authorAvatar: string
  date: string
  link?: string
}

export interface UpcomingClass {
  id: string
  courseName: string
  date: string
  time: string
  canJoin: boolean
}

export interface DailyQuote {
  text: string
  author: string
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`

const img = (name: string) => `/images/${name}`

export const currentUser: UserProfile = {
  id: "current",
  name: "Александра Светлова",
  avatar: avatar("alexandra"),
  level: "Продолжающий",
  bio: "Практикую 2 года",
}

export const userCourses: UserCourse[] = [
  {
    id: "uc1",
    title: "Сефиротическая медитация: путь восхождения",
    image: img("course-sephirotic-1.jpg"),
    category: "Сефиротика",
    teacherName: "Елена Златоцвет",
    teacherAvatar: avatar("elena"),
    progress: 65,
    totalLessons: 12,
    completedLessons: 8,
    startDate: "2025-01-15",
    isArchived: false,
  },
  {
    id: "uc2",
    title: "Руны Старшего Футарка: базовый курс",
    image: img("course-runes-1.jpg"),
    category: "Руны",
    teacherName: "Велимир Руновед",
    teacherAvatar: avatar("velimir"),
    progress: 30,
    totalLessons: 10,
    completedLessons: 3,
    startDate: "2025-02-01",
    isArchived: false,
  },
  {
    id: "uc3",
    title: "Лунные ритуалы: женская практика",
    image: img("course-feminine-1.jpg"),
    category: "Женские практики",
    teacherName: "Ирина Лунная",
    teacherAvatar: avatar("irina"),
    progress: 10,
    totalLessons: 8,
    completedLessons: 1,
    startDate: "2025-02-10",
    isArchived: false,
  },
  {
    id: "uc4",
    title: "Основы нумерологии",
    image: img("course-numerology-1.jpg"),
    category: "Нумерология",
    teacherName: "Елена Златоцвет",
    teacherAvatar: avatar("elena"),
    progress: 100,
    totalLessons: 6,
    completedLessons: 6,
    startDate: "2024-09-01",
    endDate: "2024-10-15",
    isArchived: true,
  },
  {
    id: "uc5",
    title: "Введение в алхимию духа",
    image: img("course-alchemy-1.jpg"),
    category: "Алхимия",
    teacherName: "Мирослав Огненный",
    teacherAvatar: avatar("miroslav"),
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    startDate: "2024-07-01",
    endDate: "2024-08-20",
    isArchived: true,
  },
  {
    id: "uc6",
    title: "Северная традиция: путь воина",
    image: img("course-nordic-1.jpg"),
    category: "Северная традиция",
    teacherName: "Велимир Руновед",
    teacherAvatar: avatar("velimir"),
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    isArchived: true,
  },
  {
    id: "uc7",
    title: "Энергетические практики: первый уровень",
    image: img("course-energy-1.jpg"),
    category: "Энергетика",
    teacherName: "Елена Златоцвет",
    teacherAvatar: avatar("elena"),
    progress: 100,
    totalLessons: 5,
    completedLessons: 5,
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    isArchived: true,
  },
  {
    id: "uc8",
    title: "Вуду: основы традиции",
    image: img("course-voodoo-1.jpg"),
    category: "Вуду",
    teacherName: "Мирослав Огненный",
    teacherAvatar: avatar("miroslav"),
    progress: 100,
    totalLessons: 7,
    completedLessons: 7,
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    isArchived: true,
  },
]

export const diaryReports: DiaryReport[] = [
  {
    id: "dr1",
    date: "2025-02-24",
    courseId: "uc1",
    courseName: "Сефиротическая медитация",
    text: "Сегодня практиковала медитацию на Тиферет. Ощущения были очень яркими — золотистый свет, тепло в груди. Важно записать: визуализация стала более устойчивой, удалось удерживать образ около 15 минут.",
    preview: "Сегодня практиковала медитацию на Тиферет. Ощущения были очень яркими...",
  },
  {
    id: "dr2",
    date: "2025-02-22",
    courseId: "uc2",
    courseName: "Руны Старшего Футарка",
    text: "Изучала руну Феху. Медитация на руну принесла интересные образы — поток золотых монет, ощущение изобилия. Нужно продолжить работу с этой энергией.",
    preview: "Изучала руну Феху. Медитация на руну принесла интересные образы...",
  },
  {
    id: "dr3",
    date: "2025-02-20",
    text: "Личная практика заземления. Чувствую, что энергия стала более стабильной после регулярных упражнений. Важно не пропускать утреннюю практику.",
    preview: "Личная практика заземления. Чувствую, что энергия стала более стабильной...",
  },
  {
    id: "dr4",
    date: "2025-02-18",
    courseId: "uc1",
    courseName: "Сефиротическая медитация",
    text: "Работа с Йесод. Сложно было удержать концентрацию, много отвлекающих мыслей. Нужно больше практики с лунными энергиями.",
    preview: "Работа с Йесод. Сложно было удержать концентрацию...",
  },
  {
    id: "dr5",
    date: "2025-02-15",
    courseId: "uc3",
    courseName: "Лунные ритуалы",
    text: "Первое занятие по лунным ритуалам. Узнала о связи фаз луны с женскими циклами. Очень резонирует с моим опытом.",
    preview: "Первое занятие по лунным ритуалам. Узнала о связи фаз луны...",
  },
]

export const diaryNotes: DiaryNote[] = [
  {
    id: "dn1",
    title: "Мой путь в сефиротике: первые шаги",
    date: "2025-02-20",
    image: img("course-sephirotic-2.jpg"),
    isPublic: true,
    categoryId: "practice",
    views: 124,
    likes: 18,
    commentsCount: 5,
    preview: "Делюсь своим опытом изучения Древа Жизни и первыми результатами практики...",
    content: "Делюсь своим опытом изучения Древа Жизни и первыми результатами практики. Когда я только начинала, всё казалось очень сложным...",
  },
  {
    id: "dn2",
    title: "Как я работаю с рунами каждый день",
    date: "2025-02-15",
    isPublic: true,
    categoryId: "practice",
    views: 89,
    likes: 12,
    commentsCount: 3,
    preview: "Рассказываю о своей ежедневной практике с рунами и как она изменила мою жизнь...",
    content: "Рассказываю о своей ежедневной практике с рунами и как она изменила мою жизнь. Каждое утро я вытягиваю руну дня...",
  },
  {
    id: "dn3",
    title: "Личные размышления о пути",
    date: "2025-02-10",
    isPublic: false,
    preview: "Заметки для себя о том, куда я хочу двигаться в практике...",
    content: "Заметки для себя о том, куда я хочу двигаться в практике. Чувствую, что сефиротика — это моё, но хочу также углубиться в руны...",
  },
  {
    id: "dn4",
    title: "Сны и их значение в практике",
    date: "2025-02-05",
    isPublic: false,
    preview: "Записываю интересные сны, которые приходят во время интенсивной практики...",
    content: "Записываю интересные сны, которые приходят во время интенсивной практики. Вчера снился храм с золотыми колоннами...",
  },
]

export const subscriptions: Subscription[] = [
  { id: "sub1", name: "Елена Златоцвет", avatar: avatar("elena"), publicationsCount: 45, isSubscribed: true },
  { id: "sub2", name: "Велимир Руновед", avatar: avatar("velimir"), publicationsCount: 32, isSubscribed: true },
  { id: "sub3", name: "Ирина Лунная", avatar: avatar("irina"), publicationsCount: 28, isSubscribed: true },
  { id: "sub4", name: "Мирослав Огненный", avatar: avatar("miroslav"), publicationsCount: 51, isSubscribed: true },
  { id: "sub5", name: "Анна Светлая", avatar: avatar("anna"), publicationsCount: 15, isSubscribed: true },
  { id: "sub6", name: "Дмитрий Северный", avatar: avatar("dmitry"), publicationsCount: 8, isSubscribed: true },
]

export const allUsers: Subscription[] = [
  ...subscriptions,
  { id: "user1", name: "Ольга Звёздная", avatar: avatar("olga"), publicationsCount: 12, isSubscribed: false, level: "Начинающий" },
  { id: "user2", name: "Сергей Тихий", avatar: avatar("sergey"), publicationsCount: 5, isSubscribed: false, level: "Продолжающий" },
  { id: "user3", name: "Марина Речная", avatar: avatar("marina"), publicationsCount: 23, isSubscribed: false, level: "Продвинутый" },
  { id: "user4", name: "Алексей Горный", avatar: avatar("alexey"), publicationsCount: 7, isSubscribed: false, level: "Начинающий" },
  { id: "user5", name: "Наталья Лесная", avatar: avatar("natalia"), publicationsCount: 19, isSubscribed: false, level: "Мастер" },
]

export const favorites: FavoriteItem[] = [
  { id: "fav1", type: "course", title: "Сефиротическая медитация: путь восхождения", preview: "Глубокое погружение в практику Древа Жизни", source: "Елена Златоцвет", sourceAvatar: avatar("elena"), image: img("course-sephirotic-1.jpg"), addedDate: "2025-02-20" },
  { id: "fav2", type: "article", title: "Руны для начинающих: Старший Футарк", preview: "Полный гид по 24 рунам древнего алфавита", source: "Велимир Руновед", sourceAvatar: avatar("velimir"), addedDate: "2025-02-18" },
  { id: "fav3", type: "blog", title: "Как я нашла свой путь в магии", preview: "История моего духовного пробуждения и первых шагов", source: "Анна Светлая", sourceAvatar: avatar("anna"), image: img("course-feminine-2.jpg"), addedDate: "2025-02-15" },
  { id: "fav4", type: "message", title: "Совет по медитации", preview: "Попробуй начинать с 5 минут и постепенно увеличивать время...", source: "Елена Златоцвет", sourceAvatar: avatar("elena"), addedDate: "2025-02-14" },
  { id: "fav5", type: "comment", title: "Комментарий к статье о рунах", preview: "Очень точно подмечено про связь Феху с материальным миром!", source: "Велимир Руновед", sourceAvatar: avatar("velimir"), addedDate: "2025-02-12" },
  { id: "fav6", type: "course", title: "Лунные ритуалы: женская практика", preview: "Синхронизация с лунными циклами", source: "Ирина Лунная", sourceAvatar: avatar("irina"), image: img("course-feminine-1.jpg"), addedDate: "2025-02-10" },
  { id: "fav7", type: "article", title: "Алхимия духа: нигредо и тень", preview: "Первый этап Великого Делания", source: "Мирослав Огненный", sourceAvatar: avatar("miroslav"), addedDate: "2025-02-08" },
  { id: "fav8", type: "blog", title: "Мой опыт работы с энергиями", preview: "Делюсь практиками, которые помогли мне", source: "Дмитрий Северный", sourceAvatar: avatar("dmitry"), addedDate: "2025-02-05" },
  { id: "fav9", type: "course", title: "Северная традиция: девять миров", preview: "Путешествие по скандинавской космологии", source: "Велимир Руновед", sourceAvatar: avatar("velimir"), image: img("course-nordic-2.jpg"), addedDate: "2025-02-03" },
  { id: "fav10", type: "message", title: "Рекомендация книги", preview: "Советую почитать 'Мистическую Каббалу' Дион Форчун...", source: "Мирослав Огненный", sourceAvatar: avatar("miroslav"), addedDate: "2025-02-01" },
  { id: "fav11", type: "article", title: "Числа судьбы в нумерологии", preview: "Как рассчитать и интерпретировать", source: "Елена Златоцвет", sourceAvatar: avatar("elena"), addedDate: "2025-01-28" },
  { id: "fav12", type: "comment", title: "Ответ на вопрос о практике", preview: "Главное — регулярность. Лучше 10 минут каждый день...", source: "Ирина Лунная", sourceAvatar: avatar("irina"), addedDate: "2025-01-25" },
  { id: "fav13", type: "blog", title: "Трансформация через кризис", preview: "Как сложный период стал точкой роста", source: "Марина Речная", sourceAvatar: avatar("marina"), addedDate: "2025-01-20" },
  { id: "fav14", type: "course", title: "Вуду: основы традиции", preview: "Введение в афро-карибскую магию", source: "Мирослав Огненный", sourceAvatar: avatar("miroslav"), image: img("course-voodoo-1.jpg"), addedDate: "2025-01-15" },
  { id: "fav15", type: "article", title: "Заземление: техники и практики", preview: "Простые способы восстановить связь с землёй", source: "Елена Златоцвет", sourceAvatar: avatar("elena"), addedDate: "2025-01-10" },
]

export const chats: Chat[] = [
  {
    id: "chat1",
    participantId: "sub1",
    participantName: "Елена Златоцвет",
    participantAvatar: avatar("elena"),
    lastMessage: "Отличный вопрос! Давай обсудим на следующем занятии",
    lastMessageTime: "2025-02-24T14:30:00",
    unreadCount: 2,
    messages: [
      { id: "m1", senderId: "current", text: "Здравствуйте, Елена! Хотела уточнить по практике с Тиферет", timestamp: "2025-02-24T14:00:00", isRead: true },
      { id: "m2", senderId: "sub1", text: "Здравствуй! Конечно, спрашивай", timestamp: "2025-02-24T14:15:00", isRead: true },
      { id: "m3", senderId: "current", text: "Сколько времени оптимально удерживать визуализацию?", timestamp: "2025-02-24T14:20:00", isRead: true },
      { id: "m4", senderId: "sub1", text: "Начни с 5-10 минут, постепенно увеличивай", timestamp: "2025-02-24T14:25:00", isRead: false },
      { id: "m5", senderId: "sub1", text: "Отличный вопрос! Давай обсудим на следующем занятии", timestamp: "2025-02-24T14:30:00", isRead: false },
    ],
  },
  {
    id: "chat2",
    participantId: "sub2",
    participantName: "Велимир Руновед",
    participantAvatar: avatar("velimir"),
    lastMessage: "Да, руна Феху очень мощная для работы с изобилием",
    lastMessageTime: "2025-02-23T18:45:00",
    unreadCount: 0,
    messages: [
      { id: "m6", senderId: "current", text: "Добрый день! Подскажите, как лучше работать с Феху?", timestamp: "2025-02-23T18:30:00", isRead: true },
      { id: "m7", senderId: "sub2", text: "Да, руна Феху очень мощная для работы с изобилием", timestamp: "2025-02-23T18:45:00", isRead: true },
    ],
  },
  {
    id: "chat3",
    participantId: "sub5",
    participantName: "Анна Светлая",
    participantAvatar: avatar("anna"),
    lastMessage: "Спасибо за поддержку! 💫",
    lastMessageTime: "2025-02-22T20:10:00",
    unreadCount: 1,
    messages: [
      { id: "m8", senderId: "sub5", text: "Привет! Прочитала твою заметку, очень вдохновляет!", timestamp: "2025-02-22T19:50:00", isRead: true },
      { id: "m9", senderId: "current", text: "Спасибо большое! Рада, что откликнулось", timestamp: "2025-02-22T20:00:00", isRead: true },
      { id: "m10", senderId: "sub5", text: "Спасибо за поддержку! 💫", timestamp: "2025-02-22T20:10:00", isRead: false },
    ],
  },
  {
    id: "chat4",
    participantId: "sub3",
    participantName: "Ирина Лунная",
    participantAvatar: avatar("irina"),
    lastMessage: "Увидимся на занятии в пятницу!",
    lastMessageTime: "2025-02-21T16:00:00",
    unreadCount: 0,
    messages: [
      { id: "m11", senderId: "sub3", text: "Увидимся на занятии в пятницу!", timestamp: "2025-02-21T16:00:00", isRead: true },
    ],
  },
]

export const notifications: Notification[] = [
  { id: "n1", type: "comment", title: "Новый комментарий", text: "Анна Светлая прокомментировала вашу заметку", date: "2025-02-24T15:00:00", isRead: false, link: "/blog/dn1" },
  { id: "n2", type: "like", title: "Новый лайк", text: "Вашу публикацию оценили 5 человек", date: "2025-02-24T12:00:00", isRead: false, link: "/blog/dn1" },
  { id: "n3", type: "course", title: "Новый курс", text: "Елена Златоцвет запустила курс «Продвинутая сефиротика»", date: "2025-02-23T10:00:00", isRead: true, link: "/courses/new" },
  { id: "n4", type: "reply", title: "Ответ на комментарий", text: "Велимир Руновед ответил на ваш комментарий", date: "2025-02-22T18:30:00", isRead: true, link: "/blog/post1" },
  { id: "n5", type: "system", title: "Системное уведомление", text: "Ваш профиль успешно обновлён", date: "2025-02-21T09:00:00", isRead: true },
  { id: "n6", type: "course", title: "Напоминание", text: "Завтра начинается занятие по сефиротике", date: "2025-02-20T20:00:00", isRead: true, link: "/curriculum/uc1" },
  { id: "n7", type: "like", title: "Популярная публикация", text: "Ваша заметка набрала 100 просмотров!", date: "2025-02-19T14:00:00", isRead: true, link: "/blog/dn1" },
]

export const feedItems: FeedItem[] = [
  { id: "f1", type: "article", title: "Новая статья: Тайны Малкут", preview: "Исследуем нижнюю сефиру и её связь с материальным миром...", image: img("course-sephirotic-3.jpg"), authorName: "Елена Златоцвет", authorAvatar: avatar("elena"), date: "2025-02-24T16:00:00" },
  { id: "f2", type: "course_promo", title: "Новый курс: Продвинутая сефиротика", preview: "Глубокое погружение в практику Древа Жизни для опытных практиков", image: img("course-sephirotic-2.jpg"), authorName: "Елена Златоцвет", authorAvatar: avatar("elena"), date: "2025-02-24T12:00:00" },
  { id: "f3", type: "user_post", title: "Мой опыт с руной Ансуз", preview: "Делюсь практикой работы с руной мудрости и вдохновения...", authorName: "Анна Светлая", authorAvatar: avatar("anna"), date: "2025-02-24T10:00:00" },
  { id: "f4", type: "artifact", title: "Новый артефакт: Рунический набор", preview: "Ручная работа, освящённые руны из ясеня", image: img("course-runes-3.jpg"), authorName: "Велимир Руновед", authorAvatar: avatar("velimir"), date: "2025-02-23T18:00:00" },
  { id: "f5", type: "announcement", title: "Весенний ретрит 2025", preview: "Приглашаем на трёхдневный ретрит в горах с 15 по 17 марта", authorName: "Администрация", authorAvatar: avatar("admin"), date: "2025-02-23T14:00:00" },
  { id: "f6", type: "article", title: "Лунный календарь на март", preview: "Благоприятные дни для практик и ритуалов в марте 2025", authorName: "Ирина Лунная", authorAvatar: avatar("irina"), date: "2025-02-23T10:00:00" },
  { id: "f7", type: "user_post", title: "Результаты 30-дневной практики", preview: "Подвожу итоги месяца ежедневных медитаций...", image: img("course-energy-2.jpg"), authorName: "Дмитрий Северный", authorAvatar: avatar("dmitry"), date: "2025-02-22T20:00:00" },
  { id: "f8", type: "course_promo", title: "Скидка 20% на курс по нумерологии", preview: "Только до конца февраля! Изучите язык чисел", image: img("course-numerology-2.jpg"), authorName: "Елена Златоцвет", authorAvatar: avatar("elena"), date: "2025-02-22T12:00:00" },
  { id: "f9", type: "article", title: "Алхимические символы в практике", preview: "Как использовать древние символы в современной работе", authorName: "Мирослав Огненный", authorAvatar: avatar("miroslav"), date: "2025-02-21T16:00:00" },
  { id: "f10", type: "artifact", title: "Свечи для ритуалов", preview: "Натуральный воск, травы, эфирные масла", image: img("course-feminine-3.jpg"), authorName: "Ирина Лунная", authorAvatar: avatar("irina"), date: "2025-02-21T10:00:00" },
]

export const upcomingClasses: UpcomingClass[] = [
  { id: "class1", courseName: "Сефиротическая медитация", date: "2025-02-25", time: "19:00", canJoin: true },
  { id: "class2", courseName: "Руны Старшего Футарка", date: "2025-02-27", time: "18:00", canJoin: false },
  { id: "class3", courseName: "Лунные ритуалы", date: "2025-02-28", time: "20:00", canJoin: false },
]

export const dailyQuote: DailyQuote = {
  text: "Познай самого себя, и ты познаешь Вселенную и богов.",
  author: "Надпись на храме Аполлона в Дельфах",
}

export function getTotalUnreadMessages(): number {
  return chats.reduce((sum, chat) => sum + chat.unreadCount, 0)
}

export function getTotalUnreadNotifications(): number {
  return notifications.filter((n) => !n.isRead).length
}

export function getActiveCourses(): UserCourse[] {
  return userCourses.filter((c) => !c.isArchived)
}

export function getArchivedCourses(): UserCourse[] {
  return userCourses.filter((c) => c.isArchived)
}

export function getPublicNotes(): DiaryNote[] {
  return diaryNotes.filter((n) => n.isPublic)
}

export function getPrivateNotes(): DiaryNote[] {
  return diaryNotes.filter((n) => !n.isPublic)
}

export function getFavoritesByType(type: FavoriteType | "all"): FavoriteItem[] {
  if (type === "all") return favorites
  return favorites.filter((f) => f.type === type)
}

export const favoriteTypeLabels: Record<FavoriteType | "all", string> = {
  all: "Все",
  course: "Курсы",
  article: "Статьи",
  blog: "Блог",
  message: "Сообщения",
  comment: "Комментарии",
}

export const notificationTypeIcons: Record<NotificationType, string> = {
  comment: "💬",
  reply: "↩️",
  like: "❤️",
  course: "📚",
  system: "⚙️",
}

export const feedTypeLabels: Record<FeedItem["type"], string> = {
  article: "Статья",
  user_post: "Публикация",
  course_promo: "Курс",
  artifact: "Артефакт",
  announcement: "Анонс",
}
