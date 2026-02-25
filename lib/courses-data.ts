import type { Category } from "@/components/category-bar"
import type { Course } from "@/components/course-card"

export const categories: Category[] = [
  {
    id: "sephirotic",
    label: "Сефиротическая магия",
    teaser:
      "Изучение древа жизни и десяти сефирот как инструментов трансформации сознания и работы с энергией.",
    fullDescription:
      "Сефиротическая магия — это система работы с Древом Жизни, основанная на каббалистической традиции. Каждая сефира представляет собой определённый аспект Вселенной и человеческой души. Курсы этого направления помогут вам освоить медитацию на сефирот, научиться работать с путями между ними и интегрировать эту мощную систему в свою ежедневную практику. Вы научитесь распознавать энергетические паттерны и направлять поток силы через различные уровни бытия.",
  },
  {
    id: "nordic",
    label: "Магия Севера",
    teaser:
      "Скандинавские традиции, работа с рунами, сейд и шаманские практики Севера.",
    fullDescription:
      "Магия Севера охватывает широкий спектр практик, уходящих корнями в скандинавскую и германскую традиции. Здесь вы найдёте курсы по работе с рунами, практике сейда, галдра и шаманским путешествиям. Северная магия учит взаимодействию с природными силами, духами мест и предками. Каждый курс сочетает теоретическую базу с практическими упражнениями, позволяя интегрировать древнюю мудрость в современную жизнь.",
  },
  {
    id: "feminine",
    label: "Женская магия",
    teaser:
      "Пробуждение женской силы, лунные ритуалы и практики работы с женской энергией.",
    fullDescription:
      "Женская магия — это путь к пробуждению сакральной женской силы через работу с лунными циклами, элементами природы и архетипами Богини. Курсы этого направления помогут вам наладить связь с собственным телом, развить интуицию и научиться использовать циклическую природу женской энергии. Практики включают лунные ритуалы, работу с кругом сестёр, медитации на пробуждение Кундалини и техники исцеления женской линии рода.",
  },
  {
    id: "runes",
    label: "Руническая магия",
    teaser:
      "Глубокое изучение рунического алфавита, создание ставов и гадание на рунах.",
    fullDescription:
      "Руническая магия — это искусство работы с древними символами силы, каждый из которых является ключом к определённому аспекту реальности. В наших курсах вы изучите Старший и Младший Футарк, научитесь создавать рунические ставы и формулы, освоите технику рунического гадания и защитные практики. Особое внимание уделяется энергетической настройке на каждую руну и пониманию её глубинного смысла через медитацию и практическую работу.",
  },
  {
    id: "numerology",
    label: "Нумерология",
    teaser:
      "Мистика чисел, вычисление жизненного пути и работа с числовыми вибрациями.",
    fullDescription:
      "Нумерология раскрывает тайный язык чисел, пронизывающий всю ткань реальности. Наши курсы охватывают пифагорейскую, каббалистическую и ведическую нумерологию. Вы научитесь составлять нумерологические карты, определять числа судьбы, жизненного пути и души, а также использовать силу чисел для гармонизации пространства, выбора дат и понимания жизненных циклов. Каждый курс включает практические задания и реальные разборы.",
  },
  {
    id: "energy",
    label: "Энергетические практики",
    teaser:
      "Работа с энергетическим телом, чакрами, аурой и потоками жизненной силы.",
    fullDescription:
      "Энергетические практики — это фундамент любой магической работы. В этом разделе вы найдёте курсы по работе с чакрами, очищению и укреплению ауры, техникам заземления и центрирования, а также продвинутые практики работы с Кундалини и тонкими энергиями. Программы разработаны опытными преподавателями и включают пошаговые инструкции, медитации и упражнения для развития энергетической чувствительности.",
  },
  {
    id: "voodoo",
    label: "Магия Вуду",
    teaser:
      "Традиции Вуду, работа с Лоа, ритуалы на перекрёстке и создание гри-гри.",
    fullDescription:
      "Магия Вуду — это мощная духовная система, зародившаяся в Западной Африке и развившаяся в Гаити и Новом Орлеане. Наши курсы охватывают работу с Лоа (духами), создание алтарей, рисование вевé, использование гри-гри и моджо-мешочков, а также ритуальные практики на перекрёстках. Особое внимание уделяется уважительному подходу к традиции, связи с предками и пониманию космологии Вуду. Каждый курс сочетает глубокое теоретическое знание с безопасными практическими техниками.",
  },
  {
    id: "alchemy",
    label: "Алхимия",
    teaser:
      "Искусство трансмутации, работа с первоматерией и философский камень.",
    fullDescription:
      "Алхимия — это древнее искусство трансформации, объединяющее духовную и материальную работу. В наших курсах вы изучите три стадии Великого Делания — нигредо, альбедо и рубедо, — научитесь работать с алхимическими символами и элементами, постигнете тайны Изумрудной Скрижали и принцип «как вверху, так и внизу». Программы включают практическую спагирию (растительную алхимию), медитативные практики внутренней трансмутации и изучение герметической философии как основы всех магических традиций.",
  },
]

const instructors = [
  { name: "Елена Златоцвет", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=elena&backgroundColor=b6e3f4" },
  { name: "Мирослав Огненный", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=miroslav&backgroundColor=c0aede" },
  { name: "Ирина Лунная", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=irina&backgroundColor=d1d4f9" },
  { name: "Велимир Руновед", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=velimir&backgroundColor=ffd5dc" },
  { name: "Светлана Звёздная", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=svetlana&backgroundColor=ffdfbf" },
  { name: "Арктур Северный", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=arktur&backgroundColor=b6e3f4" },
]

export const coursesByCategory: Record<string, Course[]> = {
  sephirotic: [
    { id: "s1", title: "Основы Сефиротической Магии: Путь по Древу Жизни", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-sephirotic-1.jpg", price: "12 900 \u20BD", lessons: 16 },
    { id: "s2", title: "Продвинутые практики Каббалы: Работа с Путями", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-sephirotic-2.jpg", price: "18 500 \u20BD", lessons: 24 },
    { id: "s3", title: "Медитации на Сефирот: Трансформация через Свет", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-sephirotic-3.jpg", price: "9 900 \u20BD", lessons: 12 },
    { id: "s4", title: "Малкут и Заземление: Фундамент Магической Работы", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-sephirotic-1.jpg", price: "7 500 \u20BD", lessons: 8 },
    { id: "s5", title: "Тиферет: Сердце Древа Жизни и Гармония Сил", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-sephirotic-2.jpg", price: "14 200 \u20BD", lessons: 18 },
    { id: "s6", title: "Кетер и Высшее Сознание: Путь к Единству", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-sephirotic-3.jpg", price: "21 000 \u20BD", lessons: 30 },
    { id: "s7", title: "Столп Милосердия: Хесед, Хокма и Нецах", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-sephirotic-1.jpg", price: "16 800 \u20BD", lessons: 22 },
    { id: "s8", title: "Столп Строгости: Гебура, Бина и Ход", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-sephirotic-2.jpg", price: "16 800 \u20BD", lessons: 22 },
    { id: "s9", title: "Даат: Тайная Сефира и Бездна Познания", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-sephirotic-3.jpg", price: "19 900 \u20BD", lessons: 26 },
    { id: "s10", title: "Ритуалы Каббалистической Магии: Практикум", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-sephirotic-1.jpg", price: "15 500 \u20BD", lessons: 20 },
    { id: "s11", title: "Сефиротическая Астрология: Планеты и Древо", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-sephirotic-2.jpg", price: "13 200 \u20BD", lessons: 16 },
    { id: "s12", title: "Еврейские Буквы Силы: Алфавит и Магия", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-sephirotic-3.jpg", price: "11 900 \u20BD", lessons: 14 },
    { id: "s13", title: "Йесод и Астральный План: Практика Сновидений", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-sephirotic-1.jpg", price: "10 500 \u20BD", lessons: 12 },
    { id: "s14", title: "Защитные Практики Каббалы: Щит Древа Жизни", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-sephirotic-2.jpg", price: "8 900 \u20BD", lessons: 10 },
    { id: "s15", title: "Каббала и Таро: Путешествие Глупца по Древу", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-sephirotic-3.jpg", price: "17 500 \u20BD", lessons: 22 },
  ],
  nordic: [
    { id: "n1", title: "Магия Севера: Сейд и Шаманские Путешествия", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-nordic-1.jpg", price: "14 500 \u20BD", lessons: 18 },
    { id: "n2", title: "Северные Ритуалы: Блот и Жертвоприношения Богам", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-nordic-2.jpg", price: "11 900 \u20BD", lessons: 14 },
    { id: "n3", title: "Скандинавская Космология: Девять Миров", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-nordic-3.jpg", price: "16 000 \u20BD", lessons: 20 },
    { id: "n4", title: "Гальдр: Магия Голоса и Звуковые Заклинания", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-nordic-1.jpg", price: "13 200 \u20BD", lessons: 16 },
    { id: "n5", title: "Вёльва: Практика Северного Пророчества", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-nordic-2.jpg", price: "15 800 \u20BD", lessons: 20 },
    { id: "n6", title: "Путь Воина: Берсерк и Боевая Магия", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-nordic-3.jpg", price: "17 200 \u20BD", lessons: 22 },
    { id: "n7", title: "Один и Руны Мудрости: Жертва на Иггдрасиле", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-nordic-1.jpg", price: "19 500 \u20BD", lessons: 26 },
    { id: "n8", title: "Фрейя и Сила Ванов: Магия Плодородия", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-nordic-2.jpg", price: "12 400 \u20BD", lessons: 14 },
    { id: "n9", title: "Тёмная Хель: Работа с Миром Мёртвых", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-nordic-3.jpg", price: "18 000 \u20BD", lessons: 24 },
    { id: "n10", title: "Альфхейм: Связь с Духами Природы", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-nordic-1.jpg", price: "10 500 \u20BD", lessons: 12 },
    { id: "n11", title: "Мидгард и Заземление: Магия Повседневности", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-nordic-2.jpg", price: "8 900 \u20BD", lessons: 10 },
    { id: "n12", title: "Нидхёгг и Теневая Работа: Тёмная Сторона", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-nordic-3.jpg", price: "16 500 \u20BD", lessons: 20 },
    { id: "n13", title: "Тор и Защитная Магия: Молот Мьёльнир", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-nordic-1.jpg", price: "11 200 \u20BD", lessons: 14 },
    { id: "n14", title: "Норны и Судьба: Плетение Урд, Верданди, Скульд", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-nordic-2.jpg", price: "14 800 \u20BD", lessons: 18 },
    { id: "n15", title: "Рагнарёк: Трансформация через Разрушение", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-nordic-3.jpg", price: "20 000 \u20BD", lessons: 28 },
  ],
  feminine: [
    { id: "f1", title: "Пробуждение Женской Силы: Лунные Мистерии", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-1.jpg", price: "13 900 \u20BD", lessons: 16 },
    { id: "f2", title: "Круг Сестёр: Групповые Ритуалы и Практики", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-feminine-2.jpg", price: "8 900 \u20BD", lessons: 10 },
    { id: "f3", title: "Сакральная Женственность: Архетипы Богини", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-3.jpg", price: "15 500 \u20BD", lessons: 20 },
    { id: "f4", title: "Лунный Календарь: Ритуалы Полнолуний и Новолуний", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-feminine-1.jpg", price: "9 200 \u20BD", lessons: 12 },
    { id: "f5", title: "Геката: Магия Перекрёстков и Теневая Работа", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-feminine-2.jpg", price: "16 800 \u20BD", lessons: 22 },
    { id: "f6", title: "Афродита: Магия Любви и Притяжения", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-3.jpg", price: "12 500 \u20BD", lessons: 14 },
    { id: "f7", title: "Артемида: Дикая Женственность и Свобода", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-feminine-1.jpg", price: "11 800 \u20BD", lessons: 14 },
    { id: "f8", title: "Исцеление Женской Линии Рода: Практики Прощения", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-feminine-2.jpg", price: "14 500 \u20BD", lessons: 18 },
    { id: "f9", title: "Священная Менструация: Циклы и Сила", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-3.jpg", price: "10 200 \u20BD", lessons: 12 },
    { id: "f10", title: "Ведьмин Котёл: Травяная Магия и Зельеварение", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-feminine-1.jpg", price: "13 600 \u20BD", lessons: 16 },
    { id: "f11", title: "Танец Шакти: Движение как Духовная Практика", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-2.jpg", price: "8 500 \u20BD", lessons: 10 },
    { id: "f12", title: "Красная Палатка: Создание Женского Пространства", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-feminine-3.jpg", price: "7 900 \u20BD", lessons: 8 },
    { id: "f13", title: "Инанна: Нисхождение и Возрождение Женской Силы", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-feminine-1.jpg", price: "17 200 \u20BD", lessons: 22 },
    { id: "f14", title: "Магия Зеркала: Практики Самопознания", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-feminine-2.jpg", price: "9 800 \u20BD", lessons: 12 },
    { id: "f15", title: "Дева, Мать, Старуха: Три Лика Богини", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-feminine-3.jpg", price: "18 900 \u20BD", lessons: 26 },
  ],
  runes: [
    { id: "r1", title: "Старший Футарк: Полный Курс Рунической Магии", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-1.jpg", price: "17 900 \u20BD", lessons: 24 },
    { id: "r2", title: "Рунические Ставы: Создание и Активация Формул", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-2.jpg", price: "12 500 \u20BD", lessons: 15 },
    { id: "r3", title: "Руническое Гадание: Искусство Чтения Знаков", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-runes-3.jpg", price: "10 900 \u20BD", lessons: 12 },
    { id: "r4", title: "Младший Футарк: Скандинавские Руны Викингов", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-1.jpg", price: "15 200 \u20BD", lessons: 20 },
    { id: "r5", title: "Руна Феху: Привлечение Изобилия и Богатства", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-runes-2.jpg", price: "7 900 \u20BD", lessons: 8 },
    { id: "r6", title: "Руна Альгиз: Защитные Рунические Практики", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-3.jpg", price: "8 500 \u20BD", lessons: 10 },
    { id: "r7", title: "Биндруны: Составные Руны и их Магия", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-runes-1.jpg", price: "14 800 \u20BD", lessons: 18 },
    { id: "r8", title: "Рунические Амулеты: Создание Талисманов", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-runes-2.jpg", price: "11 200 \u20BD", lessons: 14 },
    { id: "r9", title: "Рунескрипт: Рунические Заклинания и Висы", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-3.jpg", price: "16 500 \u20BD", lessons: 22 },
    { id: "r10", title: "Руны и Стихии: Элементальная Руническая Магия", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-runes-1.jpg", price: "13 800 \u20BD", lessons: 16 },
    { id: "r11", title: "Эрилаз: Мастерство Рунического Мага", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-2.jpg", price: "22 000 \u20BD", lessons: 30 },
    { id: "r12", title: "Руны на Теле: Рунические Практики Исцеления", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-runes-3.jpg", price: "10 200 \u20BD", lessons: 12 },
    { id: "r13", title: "Утарк: Альтернативный Порядок Рун", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-runes-1.jpg", price: "18 500 \u20BD", lessons: 24 },
    { id: "r14", title: "Руны и Асатру: Духовная Практика Севера", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-runes-2.jpg", price: "14 200 \u20BD", lessons: 18 },
    { id: "r15", title: "Рунический Оракул: Продвинутое Гадание", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-runes-3.jpg", price: "12 800 \u20BD", lessons: 16 },
  ],
  numerology: [
    { id: "num1", title: "Основы Нумерологии: Числа Судьбы и Жизненного Пути", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-1.jpg", price: "9 500 \u20BD", lessons: 12 },
    { id: "num2", title: "Каббалистическая Нумерология: Тайны Чисел", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-numerology-2.jpg", price: "14 900 \u20BD", lessons: 18 },
    { id: "num3", title: "Нумерология Пространства: Числовая Гармония Дома", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-3.jpg", price: "7 900 \u20BD", lessons: 8 },
    { id: "num4", title: "Ведическая Нумерология: Числа и Карма", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-numerology-1.jpg", price: "13 200 \u20BD", lessons: 16 },
    { id: "num5", title: "Мастер-Числа 11, 22, 33: Высшая Вибрация", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-2.jpg", price: "16 500 \u20BD", lessons: 20 },
    { id: "num6", title: "Нумерология Имени: Сила Букв и Звуков", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-numerology-3.jpg", price: "8 800 \u20BD", lessons: 10 },
    { id: "num7", title: "Нумерология Отношений: Совместимость Чисел", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-1.jpg", price: "10 500 \u20BD", lessons: 12 },
    { id: "num8", title: "Числовые Циклы: Прогнозирование Событий", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-numerology-2.jpg", price: "15 800 \u20BD", lessons: 20 },
    { id: "num9", title: "Сакральная Геометрия и Числа: Узоры Вселенной", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-numerology-3.jpg", price: "18 200 \u20BD", lessons: 24 },
    { id: "num10", title: "Нумерология Бизнеса: Числа Успеха", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-1.jpg", price: "12 900 \u20BD", lessons: 14 },
    { id: "num11", title: "Пифагорейская Нумерология: Древняя Школа", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-numerology-2.jpg", price: "14 200 \u20BD", lessons: 18 },
    { id: "num12", title: "Числовые Медитации: Вибрации Исцеления", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-numerology-3.jpg", price: "9 200 \u20BD", lessons: 10 },
    { id: "num13", title: "Квадрат Пифагора: Глубинный Анализ Личности", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-numerology-1.jpg", price: "11 500 \u20BD", lessons: 14 },
    { id: "num14", title: "Нумерология Дат: Выбор Идеального Времени", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-numerology-2.jpg", price: "7 500 \u20BD", lessons: 8 },
    { id: "num15", title: "Числовая Магия: Ритуалы с Числами Силы", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-numerology-3.jpg", price: "19 900 \u20BD", lessons: 26 },
  ],
  energy: [
    { id: "e1", title: "Работа с Чакрами: Полное Раскрытие Энергоцентров", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-energy-1.jpg", price: "11 500 \u20BD", lessons: 14 },
    { id: "e2", title: "Целительный Поток: Энергетическое Исцеление Руками", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-energy-2.jpg", price: "13 900 \u20BD", lessons: 16 },
    { id: "e3", title: "Кундалини: Пробуждение Змеиной Силы", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-energy-3.jpg", price: "19 900 \u20BD", lessons: 28 },
    { id: "e4", title: "Аура: Видение, Очищение и Укрепление", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-energy-1.jpg", price: "10 200 \u20BD", lessons: 12 },
    { id: "e5", title: "Рэйки I-II: Каналы Универсальной Энергии", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-energy-2.jpg", price: "15 500 \u20BD", lessons: 20 },
    { id: "e6", title: "Рэйки III: Мастерский Уровень", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-energy-3.jpg", price: "22 000 \u20BD", lessons: 30 },
    { id: "e7", title: "Праническое Целительство: Энергия Жизни", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-energy-1.jpg", price: "14 800 \u20BD", lessons: 18 },
    { id: "e8", title: "Заземление и Центрирование: Фундамент Практики", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-energy-2.jpg", price: "6 900 \u20BD", lessons: 8 },
    { id: "e9", title: "Энергетическая Защита: Щиты и Барьеры", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-energy-3.jpg", price: "12 400 \u20BD", lessons: 14 },
    { id: "e10", title: "Тонкие Тела: Анатомия Энергетического Существа", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-energy-1.jpg", price: "16 200 \u20BD", lessons: 20 },
    { id: "e11", title: "Меридианы и Цигун: Восточная Энергетическая Работа", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-energy-2.jpg", price: "13 500 \u20BD", lessons: 16 },
    { id: "e12", title: "Кристаллотерапия: Камни и Энергия", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-energy-3.jpg", price: "11 800 \u20BD", lessons: 14 },
    { id: "e13", title: "Звукотерапия: Поющие Чаши и Вибрации", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-energy-1.jpg", price: "9 900 \u20BD", lessons: 12 },
    { id: "e14", title: "Энергия Мест: Геомантия и Лей-Линии", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-energy-2.jpg", price: "17 500 \u20BD", lessons: 22 },
    { id: "e15", title: "Астральная Проекция: Выход из Тела", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-energy-3.jpg", price: "21 000 \u20BD", lessons: 28 },
  ],
  voodoo: [
    { id: "v1", title: "Основы Вуду: Космология и Духовная Система", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-voodoo-1.jpg", price: "14 500 \u20BD", lessons: 18 },
    { id: "v2", title: "Лоа: Знакомство с Духами Вуду", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-voodoo-2.jpg", price: "16 200 \u20BD", lessons: 22 },
    { id: "v3", title: "Вевé: Священные Символы и их Рисование", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-voodoo-3.jpg", price: "11 800 \u20BD", lessons: 14 },
    { id: "v4", title: "Алтарь Вуду: Создание Священного Пространства", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-voodoo-1.jpg", price: "9 500 \u20BD", lessons: 10 },
    { id: "v5", title: "Барон Самеди: Работа с Духами Мёртвых", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-voodoo-2.jpg", price: "19 900 \u20BD", lessons: 26 },
    { id: "v6", title: "Эрзули Фреда: Магия Любви и Красоты", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-voodoo-3.jpg", price: "13 200 \u20BD", lessons: 16 },
    { id: "v7", title: "Гри-Гри и Моджо: Создание Магических Мешочков", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-voodoo-1.jpg", price: "8 900 \u20BD", lessons: 10 },
    { id: "v8", title: "Папа Легба: Открытие Дверей и Перекрёстки", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-voodoo-2.jpg", price: "15 800 \u20BD", lessons: 20 },
    { id: "v9", title: "Ритуалы Нового Орлеана: Традиция Худу", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-voodoo-3.jpg", price: "17 500 \u20BD", lessons: 22 },
    { id: "v10", title: "Работа со Свечами в Вуду: Огненная Магия", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-voodoo-1.jpg", price: "7 900 \u20BD", lessons: 8 },
    { id: "v11", title: "Дамбалла: Мудрость Змея и Начало Всего", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-voodoo-2.jpg", price: "18 200 \u20BD", lessons: 24 },
    { id: "v12", title: "Защитные Практики Вуду: Обереги и Щиты", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-voodoo-3.jpg", price: "10 500 \u20BD", lessons: 12 },
    { id: "v13", title: "Петро и Рада: Два Лика Силы", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-voodoo-1.jpg", price: "21 000 \u20BD", lessons: 28 },
    { id: "v14", title: "Магия Трав в Вуду: Зелья и Омовения", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-voodoo-2.jpg", price: "12 400 \u20BD", lessons: 14 },
    { id: "v15", title: "Вуду и Предки: Почитание Рода и Связь с Духами", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-voodoo-3.jpg", price: "14 800 \u20BD", lessons: 18 },
  ],
  alchemy: [
    { id: "a1", title: "Основы Алхимии: Великое Делание и его Стадии", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-alchemy-1.jpg", price: "15 500 \u20BD", lessons: 20 },
    { id: "a2", title: "Нигредо: Чёрная Стадия Трансформации", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-alchemy-2.jpg", price: "12 900 \u20BD", lessons: 16 },
    { id: "a3", title: "Альбедо: Очищение и Белая Стадия", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-alchemy-3.jpg", price: "12 900 \u20BD", lessons: 16 },
    { id: "a4", title: "Рубедо: Красная Стадия и Философский Камень", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-alchemy-1.jpg", price: "18 500 \u20BD", lessons: 24 },
    { id: "a5", title: "Изумрудная Скрижаль: Тайны Гермеса Трисмегиста", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-alchemy-2.jpg", price: "16 200 \u20BD", lessons: 22 },
    { id: "a6", title: "Спагирия: Растительная Алхимия на Практике", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-alchemy-3.jpg", price: "14 800 \u20BD", lessons: 18 },
    { id: "a7", title: "Четыре Элемента: Огонь, Вода, Воздух, Земля", instructor: instructors[4].name, avatar: instructors[4].avatar, image: "/images/course-alchemy-1.jpg", price: "9 200 \u20BD", lessons: 12 },
    { id: "a8", title: "Символизм Алхимии: Язык Птиц и Тайные Образы", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-alchemy-2.jpg", price: "13 500 \u20BD", lessons: 16 },
    { id: "a9", title: "Внутренняя Алхимия: Трансмутация Сознания", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-alchemy-3.jpg", price: "17 200 \u20BD", lessons: 22 },
    { id: "a10", title: "Алхимия Металлов: Семь Планетарных Сил", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-alchemy-1.jpg", price: "15 800 \u20BD", lessons: 20 },
    { id: "a11", title: "Парацельс и Ятрохимия: Целительная Алхимия", instructor: instructors[0].name, avatar: instructors[0].avatar, image: "/images/course-alchemy-2.jpg", price: "11 500 \u20BD", lessons: 14 },
    { id: "a12", title: "Алхимическая Лаборатория: Практикум Делания", instructor: instructors[3].name, avatar: instructors[3].avatar, image: "/images/course-alchemy-3.jpg", price: "22 000 \u20BD", lessons: 30 },
    { id: "a13", title: "Фламель и Философский Камень: История и Практика", instructor: instructors[1].name, avatar: instructors[1].avatar, image: "/images/course-alchemy-1.jpg", price: "10 900 \u20BD", lessons: 12 },
    { id: "a14", title: "Алхимия и Юнг: Психологическая Трансмутация", instructor: instructors[2].name, avatar: instructors[2].avatar, image: "/images/course-alchemy-2.jpg", price: "14 200 \u20BD", lessons: 18 },
    { id: "a15", title: "Эликсир Бессмертия: Высшая Цель Алхимии", instructor: instructors[5].name, avatar: instructors[5].avatar, image: "/images/course-alchemy-3.jpg", price: "24 900 \u20BD", lessons: 32 },
  ],
}
