import { categories } from "./courses-data"
import { coursesByCategory } from "./courses-data"
import { libraryItems } from "./library-data"
import type { Course } from "@/components/course-card"
import type { LibraryItem } from "@/lib/library-data"

export interface Teacher {
  id: string
  name: string
  photo: string
  specializations: string[]
  categoryIds: string[]
  bioShort: string
  bioLong: string
  rating: number
  reviewCount: number
}

export interface TeacherReview {
  id: string
  authorName: string
  authorAvatar: string
  date: string
  rating: number
  text: string
}

const avatar = (seed: string, bg?: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=${bg || "b6e3f4"}`

export const teachers: Teacher[] = [
  {
    id: "elena",
    name: "Елена Златоцвет",
    photo: avatar("elena"),
    specializations: ["Каббала и сефиротическая магия", "Энергетические практики"],
    categoryIds: ["sephirotic", "energy", "numerology"],
    bioShort:
      "Практик каббалы и энергетических традиций с двадцатилетним стажем. Ведёт курсы по Древу Жизни и работе с чакрами. Фокус на безопасном и поэтапном освоении практик.",
    bioLong:
      "Елена Златоцвет посвятила изучению каббалистической и энергетических традиций более двадцати лет. Начала путь с западной герметической традиции и постепенно углубилась в сефиротическую магию и работу с тонкими телами. В ORA ведёт курсы по Древу Жизни, заземлению и Рэйки. Уделяет особое внимание безопасности и адаптации древних знаний под современный ритм жизни. Считает, что магия — это прежде всего осознанность и ответственность перед собой и миром.",
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: "miroslav",
    name: "Мирослав Огненный",
    photo: avatar("miroslav", "c0aede"),
    specializations: ["Алхимия", "Магия Вуду"],
    categoryIds: ["alchemy", "voodoo", "sephirotic"],
    bioShort:
      "Исследователь алхимии и традиций Вуду. Преподаёт стадии Великого Делания и работу с Лоа. Делает упор на уважении к традициям и этике практики.",
    bioLong:
      "Мирослав Огненный совмещает практику западной алхимии с изучением традиций Вуду и худу. Изучал герметическую философию и спагирию в Европе, затем углубился в космологию Лоа и ритуальную практику. В своих курсах раскрывает связи между внутренней трансмутацией и ритуалом, учит создавать гри-гри и работать с духами уважительно и осознанно. Подчёркивает важность контекста и культуры в любой магической системе.",
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "irina",
    name: "Ирина Лунная",
    photo: avatar("irina", "d1d4f9"),
    specializations: ["Женская магия", "Лунные ритуалы"],
    categoryIds: ["feminine", "nordic", "sephirotic"],
    bioShort:
      "Практик женской и лунной магии, ведущая кругов и ритуалов. Помогает выстраивать связь с циклами и архетипами Богини через ритуал и тело.",
    bioLong:
      "Ирина Лунная более пятнадцати лет ведёт практики женской магии и лунных ритуалов. Организует круги сестёр и обучает работе с архетипами Девы, Матери и Старухи. В курсах ORA сочетает лунный календарь, ритуалы полнолуний и новолуний с практиками исцеления женской линии рода. Убеждена, что связь с циклом и телом — основа любой дальнейшей магической работы.",
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "velimir",
    name: "Велимир Руновед",
    photo: avatar("velimir", "ffd5dc"),
    specializations: ["Руническая магия", "Магия Севера"],
    categoryIds: ["runes", "nordic"],
    bioShort:
      "Мастер рунической магии и северных традиций. Преподаёт Старший и Младший Футарк, сейд и гальдр. Акцент на практике и личном опыте с рунами.",
    bioLong:
      "Велимир Руновед специализируется на рунической магии и скандинавской традиции. Изучает руны и северный сейд более двадцати лет, ведёт курсы по Старшему и Младшему Футарку, созданию ставов и руническому гаданию. В программах ORA также затрагивает гальдр и сейд. Учит не только значению символов, но и настройке на руну через медитацию и практику. Считает руны живым языком силы, а не только алфавитом.",
    rating: 4.8,
    reviewCount: 112,
  },
  {
    id: "svetlana",
    name: "Светлана Звёздная",
    photo: avatar("svetlana", "ffdfbf"),
    specializations: ["Нумерология", "Женская магия"],
    categoryIds: ["numerology", "feminine", "sephirotic"],
    bioShort:
      "Нумеролог и практик женской магии. Ведёт курсы по числам судьбы, квадрату Пифагора и архетипам. Связывает числа с жизненными циклами и выборами.",
    bioLong:
      "Светлана Звёздная объединяет нумерологию пифагорейской и ведической школ с практиками женской магии. Преподаёт расчёт чисел жизненного пути, души и имени, квадрат Пифагора и нумерологию дат. В курсах для ORA добавляет связь чисел с архетипами и циклами. Помогает использовать нумерологию не только для анализа, но и для гармонизации решений и пространства.",
    rating: 4.7,
    reviewCount: 87,
  },
  {
    id: "arktur",
    name: "Арктур Северный",
    photo: avatar("arktur", "b6e3f4"),
    specializations: ["Магия Севера", "Скандинавская космология"],
    categoryIds: ["nordic", "runes", "energy"],
    bioShort:
      "Практик северной традиции и скандинавской космологии. Ведёт курсы по Девяти мирам, сейду и работе с богами Севера. Фокус на мифе и ритуале.",
    bioLong:
      "Арктур Северный углублённо занимается магией Севера и скандинавской космологией. Преподаёт устройство Девяти миров, сейд, блот и работу с Одином, Тором и Фрейей. В ORA ведёт курсы по северным ритуалам и шаманским путешествиям. Сочетает исторический контекст с живой практикой и учит выстраивать отношения с силами Севера осознанно и безопасно.",
    rating: 4.8,
    reviewCount: 76,
  },
  {
    id: "daria",
    name: "Дарья Огнева",
    photo: avatar("daria", "d1d4f9"),
    specializations: ["Энергетические практики", "Рэйки"],
    categoryIds: ["energy", "feminine"],
    bioShort:
      "Мастер Рэйки и энергетического целительства. Ведёт инициации и курсы по работе с чакрами и аурой. Делает упор на практике и самодиагностике.",
    bioLong:
      "Дарья Огнева — мастер Рэйки и практик энергетического целительства. Ведёт инициации I–III ступеней и обучает работе с чакрами, аурой и меридианами. В курсах ORA даёт техники заземления, очищения поля и защиты. Учит не только передаче энергии, но и чувствованию тонких тел и построению здоровой личной практики.",
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: "nikolai",
    name: "Николай Каменев",
    photo: avatar("nikolai", "c0aede"),
    specializations: ["Алхимия", "Каббала"],
    categoryIds: ["alchemy", "sephirotic"],
    bioShort:
      "Исследователь алхимии и каббалы. Преподаёт Великое Делание и связь алхимических стадий с внутренней трансформацией и герметической философией.",
    bioLong:
      "Николай Каменев изучает алхимию и каббалу в контексте герметической традиции. Ведёт курсы по стадиям нигредо, альбедо и рубедо, Изумрудной скрижали и внутренней алхимии. В ORA также преподаёт связь Древа Жизни с алхимическими принципами. Уделяет внимание как символике и текстам, так и практической спагирии и медитативным техникам трансмутации.",
    rating: 4.7,
    reviewCount: 53,
  },
]

export const teacherReviews: Record<string, TeacherReview[]> = {
  elena: [
    { id: "er1", authorName: "Анна К.", authorAvatar: avatar("anna1"), date: "20 фев 2025", rating: 5, text: "Курс по сефиротам изменил мою практику. Елена объясняет сложное простым языком и всегда отвечает на вопросы." },
    { id: "er2", authorName: "Михаил С.", authorAvatar: avatar("mikhail1"), date: "15 фев 2025", rating: 5, text: "Очень структурировано и по делу. Рекомендую тем, кто только начинает путь по Древу." },
    { id: "er3", authorName: "Ольга В.", authorAvatar: avatar("olga1"), date: "8 фев 2025", rating: 4, text: "Понравился баланс теории и практики. Хотелось бы больше медитаций в записи." },
  ],
  miroslav: [
    { id: "mr1", authorName: "Дмитрий Л.", authorAvatar: avatar("dmitry1"), date: "18 фев 2025", rating: 5, text: "Глубокий подход к алхимии и вуду. Мирослав знает тему и умеет передать уважение к традиции." },
    { id: "mr2", authorName: "Екатерина Р.", authorAvatar: avatar("kate1"), date: "10 фев 2025", rating: 5, text: "Курс по гри-гри — один из лучших. Всё по шагам, без воды." },
  ],
  irina: [
    { id: "ir1", authorName: "Мария Д.", authorAvatar: avatar("maria1"), date: "22 фев 2025", rating: 5, text: "Ирина создаёт безопасное пространство. Лунные практики вошли в жизнь естественно." },
    { id: "ir2", authorName: "Светлана М.", authorAvatar: avatar("svetlana2"), date: "14 фев 2025", rating: 5, text: "Рекомендую всем, кто хочет наладить связь с циклом и собой." },
  ],
  velimir: [
    { id: "vr1", authorName: "Алексей Т.", authorAvatar: avatar("alex1"), date: "19 фев 2025", rating: 5, text: "Руны от Велимира — это не просто гадание, а целая система. Очень доволен." },
    { id: "vr2", authorName: "Наталья К.", authorAvatar: avatar("nata1"), date: "11 фев 2025", rating: 4, text: "Много практики, мало воды. Ставы работают." },
  ],
  svetlana: [
    { id: "sr1", authorName: "Игорь П.", authorAvatar: avatar("igor1"), date: "16 фев 2025", rating: 5, text: "Нумерология наконец разложена по полочкам. Светлана умеет структурировать." },
  ],
  arktur: [
    { id: "ar1", authorName: "Виктор Н.", authorAvatar: avatar("viktor1"), date: "12 фев 2025", rating: 5, text: "Северная традиция подана живо и с уважением. Курс по Девяти мирам — огонь." },
  ],
  daria: [
    { id: "dr1", authorName: "Татьяна С.", authorAvatar: avatar("tanya1"), date: "21 фев 2025", rating: 5, text: "Рэйки с Дарьей — это про силу и мягкость одновременно. Инициация прошла глубоко." },
  ],
  nikolai: [
    { id: "nr1", authorName: "Павел К.", authorAvatar: avatar("pavel1"), date: "17 фев 2025", rating: 4, text: "Алхимия от Николая — для тех, кто готов думать и практиковать. Сложно, но того стоит." },
  ],
}

const nameToId: Record<string, string> = {
  "Елена Златоцвет": "elena",
  "Мирослав Огненный": "miroslav",
  "Ирина Лунная": "irina",
  "Велимир Руновед": "velimir",
  "Светлана Звёздная": "svetlana",
  "Арктур Северный": "arktur",
}

export function getTeacherIdByName(instructorName: string): string | undefined {
  return nameToId[instructorName]
}

export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id)
}

const allCourses: Course[] = Object.values(coursesByCategory).flat()

export function getCoursesByTeacherId(teacherId: string): Course[] {
  const teacher = getTeacherById(teacherId)
  if (!teacher) return []
  return allCourses.filter((c) => c.instructor === teacher.name)
}

export function getLibraryItemsByTeacherId(teacherId: string): LibraryItem[] {
  return libraryItems.filter((item) => item.authorId === teacherId)
}

export const teacherCategories = [
  { id: "all", label: "Все направления" },
  ...categories.map((c) => ({ id: c.id, label: c.label })),
]

export function getTeacherCourseCount(teacherId: string): number {
  return getCoursesByTeacherId(teacherId).length
}

export function getTeacherMaterialCount(teacherId: string): number {
  return getLibraryItemsByTeacherId(teacherId).length
}
