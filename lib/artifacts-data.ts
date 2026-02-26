export type AvailabilityStatus = "in_stock" | "on_order"

export type MagicDirection =
  | "protection"
  | "love"
  | "abundance"
  | "intuition"
  | "healing"
  | "power"

export type JewelryType =
  | "bracelet"
  | "pendant"
  | "earrings"
  | "brooch"
  | "ring"
  | "rosary"
  | "amulet"

export type Stone =
  | "amethyst"
  | "labradorite"
  | "moonstone"
  | "obsidian"
  | "tourmaline"
  | "rose_quartz"
  | "malachite"
  | "tiger_eye"
  | "garnet"
  | "lapis_lazuli"

export type Material =
  | "silver_925"
  | "gilded_bronze"
  | "copper"
  | "brass"
  | "nickel_silver"

export interface Artifact {
  id: string
  name: string
  description: string
  price: number
  availability: AvailabilityStatus
  magicDirection: MagicDirection
  jewelryType: JewelryType
  stone: Stone
  material: Material
  image: string
}

export const magicDirections: { id: MagicDirection; label: string; color: string }[] = [
  { id: "protection", label: "Защита и охрана", color: "#6366f1" },
  { id: "love", label: "Любовь и привязанность", color: "#ec4899" },
  { id: "abundance", label: "Достаток и изобилие", color: "#f59e0b" },
  { id: "intuition", label: "Интуиция и ясновидение", color: "#8b5cf6" },
  { id: "healing", label: "Исцеление и баланс", color: "#10b981" },
  { id: "power", label: "Сила и воля", color: "#ef4444" },
]

export const jewelryTypes: { id: JewelryType; label: string }[] = [
  { id: "bracelet", label: "Браслет" },
  { id: "pendant", label: "Подвеска" },
  { id: "earrings", label: "Серьги" },
  { id: "brooch", label: "Брошь" },
  { id: "ring", label: "Кольцо" },
  { id: "rosary", label: "Чётки" },
  { id: "amulet", label: "Амулет" },
]

export const stones: { id: Stone; label: string }[] = [
  { id: "amethyst", label: "Аметист" },
  { id: "labradorite", label: "Лабрадор" },
  { id: "moonstone", label: "Лунный камень" },
  { id: "obsidian", label: "Обсидиан" },
  { id: "tourmaline", label: "Турмалин" },
  { id: "rose_quartz", label: "Розовый кварц" },
  { id: "malachite", label: "Малахит" },
  { id: "tiger_eye", label: "Тигровый глаз" },
  { id: "garnet", label: "Гранат" },
  { id: "lapis_lazuli", label: "Лазурит" },
]

export const materials: { id: Material; label: string }[] = [
  { id: "silver_925", label: "Серебро 925" },
  { id: "gilded_bronze", label: "Позолоченная бронза" },
  { id: "copper", label: "Медь" },
  { id: "brass", label: "Латунь" },
  { id: "nickel_silver", label: "Нейзильбер" },
]

export const availabilityOptions: { id: AvailabilityStatus | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "in_stock", label: "В наличии" },
  { id: "on_order", label: "Под заказ" },
]

export function getMagicDirectionLabel(id: MagicDirection): string {
  return magicDirections.find((d) => d.id === id)?.label ?? id
}

export function getMagicDirectionColor(id: MagicDirection): string {
  return magicDirections.find((d) => d.id === id)?.color ?? "#888"
}

export function getJewelryTypeLabel(id: JewelryType): string {
  return jewelryTypes.find((t) => t.id === id)?.label ?? id
}

export function getStoneLabel(id: Stone): string {
  return stones.find((s) => s.id === id)?.label ?? id
}

export function getMaterialLabel(id: Material): string {
  return materials.find((m) => m.id === id)?.label ?? id
}

export function getAvailabilityLabel(status: AvailabilityStatus): string {
  return status === "in_stock" ? "В наличии" : "Под заказ"
}

export const artifacts: Artifact[] = [
  {
    id: "art-vch-009",
    name: "Источник ВЧ",
    description: "Артефакты с ВИА выполнены на метеоритах египетской пустыни локация плато Гиза, плато Абу Сир, плато Саккара. Метеориты представляют из себя носитель того что в магии называется — скрытый огонь, то есть некая энергия содержащаяся в объекте, ёмкостью и размером не совпадающая с потенциалом имеющейся внутри энергии.\n\nОтрицательная энергия необходима для насыщения ВЧ тела и последующих процессов трансформации того уровня, который вы сейчас проходите, используется для перехода на следующий уровень.\n\nТак же уникальным является наличие энергии в них в таком формате, который не свойственен материальным объектам планеты — это связано с потенциалом энергии скрытой в камне, возникающим в момент его удара на землю. За счет этого выделяется огромное количество энергии, входящей во внутреннюю структуру камня.\n\nЭти камни являются не разряжаемыми и используются в магии как источник ВЧ энергии для активации и поддержки своих внутренних процессов. Особенно хорошо они работают при изучении огненных культов (солярных), также используются в рунной магии.\n\nАртефакт используется для закрепления состояния работы с каналом Инитаксы и поддержания процессов насыщения отрицательной энергией тела и сознания.",
    price: 8000,
    availability: "in_stock",
    magicDirection: "power",
    jewelryType: "amulet",
    stone: "obsidian",
    material: "brass",
    image: "/images/artifact-istochnik-vch.png",
  },
  {
    id: "art-1",
    name: 'Амулет "Огонь Гизы"',
    description: "Артефакт выполнен на метеорите египетской пустыни, локация — плато Гиза. Метеорит является носителем скрытого огня — энергии, ёмкостью и размером не совпадающей с потенциалом имеющейся внутри силы. Уникальность камня в формате энергии, не свойственном материальным объектам планеты — потенциал возникает в момент удара о землю, когда огромное количество энергии входит во внутреннюю структуру камня. Артефакт не разряжается и используется как источник ВЧ энергии для активации внутренних процессов. Особенно эффективен при работе с солярными культами и рунной магией.",
    price: 12500,
    availability: "in_stock",
    magicDirection: "power",
    jewelryType: "amulet",
    stone: "obsidian",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-2",
    name: 'Подвеска "Канал Инитаксы"',
    description: "Артефакт используется для закрепления состояния работы с каналом Инитаксы и поддержания процессов насыщения отрицательной энергией тела и сознания. Выполнен на метеорите с плато Абу Сир. Отрицательная энергия необходима для насыщения ВЧ тела и последующих процессов трансформации того уровня, который вы сейчас проходите, используется для перехода на следующий уровень развития.",
    price: 14800,
    availability: "on_order",
    magicDirection: "intuition",
    jewelryType: "pendant",
    stone: "labradorite",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-3",
    name: 'Кольцо "Саккара"',
    description: "Метеоритное кольцо с плато Саккара. Камень содержит скрытый огонь — энергию в формате, не свойственном земным объектам. Потенциал возникает в момент удара метеорита о землю, когда колоссальная энергия входит во внутреннюю структуру камня. Артефакт является неразряжаемым источником ВЧ энергии для поддержки трансформационных процессов.",
    price: 9800,
    availability: "in_stock",
    magicDirection: "power",
    jewelryType: "ring",
    stone: "obsidian",
    material: "gilded_bronze",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-4",
    name: 'Браслет "Лунный страж"',
    description: "Защитный браслет с лунным камнем, усиливающий интуицию и оберегающий от негативных энергий. Камень настроен на работу с лунными циклами и женской энергией.",
    price: 3200,
    availability: "in_stock",
    magicDirection: "protection",
    jewelryType: "bracelet",
    stone: "moonstone",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-5",
    name: 'Серьги "Розовый рассвет"',
    description: "Нежные серьги с розовым кварцем для привлечения любви и гармонии в отношениях. Камень резонирует с сердечной чакрой, помогая исцелить эмоциональные травмы и открыться новым чувствам.",
    price: 2800,
    availability: "in_stock",
    magicDirection: "love",
    jewelryType: "earrings",
    stone: "rose_quartz",
    material: "gilded_bronze",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-6",
    name: 'Чётки "Солярный путь"',
    description: "Метеоритные чётки для практиков огненных культов. Выполнены на фрагментах метеорита с плато Гиза. Каждая бусина содержит скрытый огонь — неразряжаемый источник ВЧ энергии. Используются в рунной магии и солярных медитациях для насыщения тонких тел и активации внутренних процессов трансформации.",
    price: 18500,
    availability: "on_order",
    magicDirection: "power",
    jewelryType: "rosary",
    stone: "garnet",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-7",
    name: 'Подвеска "Глаз бури"',
    description: "Мощный талисман с лабрадором для развития ясновидения и усиления интуиции. Лабрадор известен как камень магов — он открывает доступ к скрытым знаниям и усиливает экстрасенсорные способности.",
    price: 4500,
    availability: "in_stock",
    magicDirection: "intuition",
    jewelryType: "pendant",
    stone: "labradorite",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-8",
    name: 'Брошь "Сердце леса"',
    description: "Целительная брошь с малахитом, восстанавливающая энергетический баланс. Малахит — камень трансформации, помогающий очистить и активировать все чакры.",
    price: 1900,
    availability: "in_stock",
    magicDirection: "healing",
    jewelryType: "brooch",
    stone: "malachite",
    material: "copper",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-9",
    name: 'Амулет "Чёрный щит"',
    description: "Мощный защитный амулет с обсидианом, отражающий негативные воздействия. Обсидиан — вулканическое стекло, рождённое в огне земли, создаёт непроницаемый энергетический барьер вокруг носителя.",
    price: 2100,
    availability: "in_stock",
    magicDirection: "protection",
    jewelryType: "amulet",
    stone: "obsidian",
    material: "nickel_silver",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-10",
    name: 'Браслет "Врата Абу Сир"',
    description: "Артефакт с метеоритом плато Абу Сир. Метеорит представляет собой носитель скрытого огня — энергии, ёмкость которой не совпадает с физическим размером камня. Энергия в формате, не свойственном земным объектам, возникает в момент удара о землю. Браслет используется для насыщения ВЧ тела отрицательной энергией, необходимой для процессов трансформации и перехода на следующий уровень.",
    price: 11200,
    availability: "in_stock",
    magicDirection: "power",
    jewelryType: "bracelet",
    stone: "tourmaline",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-11",
    name: 'Кольцо "Золотой поток"',
    description: "Кольцо изобилия с тигровым глазом для привлечения финансовой удачи. Тигровый глаз усиливает решительность и помогает достигать материальных целей.",
    price: 3800,
    availability: "in_stock",
    magicDirection: "abundance",
    jewelryType: "ring",
    stone: "tiger_eye",
    material: "gilded_bronze",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-12",
    name: 'Подвеска "Звёздный мост"',
    description: "Талисман ясновидения с аметистом для медитаций и духовных практик. Аметист — камень высшего сознания, открывающий каналы связи с тонкими мирами и усиливающий интуитивное восприятие.",
    price: 3600,
    availability: "in_stock",
    magicDirection: "intuition",
    jewelryType: "pendant",
    stone: "amethyst",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-13",
    name: 'Серьги "Пламя страсти"',
    description: "Яркие серьги с гранатом для усиления привлекательности и страсти. Гранат — камень огненной энергии, пробуждающий жизненную силу и сексуальность.",
    price: 3100,
    availability: "in_stock",
    magicDirection: "love",
    jewelryType: "earrings",
    stone: "garnet",
    material: "gilded_bronze",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-14",
    name: 'Амулет "Око мудрости"',
    description: "Древний амулет с лазуритом для развития третьего глаза. Лазурит — камень истины и просветления, использовавшийся жрецами Древнего Египта для связи с высшими силами. Усиливает ментальные способности и открывает доступ к скрытым знаниям.",
    price: 4200,
    availability: "on_order",
    magicDirection: "intuition",
    jewelryType: "amulet",
    stone: "lapis_lazuli",
    material: "brass",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-15",
    name: 'Кольцо "Северный страж"',
    description: "Защитное кольцо с турмалином, создающее энергетический щит. Чёрный турмалин — один из сильнейших защитных камней, поглощающий и трансмутирующий негативную энергию.",
    price: 2900,
    availability: "in_stock",
    magicDirection: "protection",
    jewelryType: "ring",
    stone: "tourmaline",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-16",
    name: 'Брошь "Денежный магнит"',
    description: "Брошь процветания с тигровым глазом для притяжения богатства и удачи в делах.",
    price: 1800,
    availability: "in_stock",
    magicDirection: "abundance",
    jewelryType: "brooch",
    stone: "tiger_eye",
    material: "brass",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-17",
    name: 'Чётки "Лунная дорога"',
    description: "Медитативные чётки с лунным камнем для работы с подсознанием и лунными энергиями. Каждая бусина настроена на определённую фазу луны, помогая синхронизировать практику с космическими ритмами.",
    price: 4800,
    availability: "on_order",
    magicDirection: "intuition",
    jewelryType: "rosary",
    stone: "moonstone",
    material: "silver_925",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-18",
    name: 'Подвеска "Сердце розы"',
    description: "Романтическая подвеска с розовым кварцем для исцеления сердечных ран и привлечения безусловной любви.",
    price: 2600,
    availability: "in_stock",
    magicDirection: "love",
    jewelryType: "pendant",
    stone: "rose_quartz",
    material: "copper",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-19",
    name: 'Браслет "Огненный дракон"',
    description: "Браслет силы воли с гранатом для преодоления препятствий. Гранат активирует корневую чакру, даруя стабильность, выносливость и несгибаемую решимость в достижении целей.",
    price: 3400,
    availability: "in_stock",
    magicDirection: "power",
    jewelryType: "bracelet",
    stone: "garnet",
    material: "nickel_silver",
    image: "/images/artifact-placeholder.jpg",
  },
  {
    id: "art-20",
    name: 'Амулет "Врата изобилия"',
    description: "Мощный амулет с лазуритом для открытия денежных потоков. Лазурит усиливает намерение и помогает материализовать желания, связанные с процветанием и успехом.",
    price: 5500,
    availability: "on_order",
    magicDirection: "abundance",
    jewelryType: "amulet",
    stone: "lapis_lazuli",
    material: "gilded_bronze",
    image: "/images/artifact-placeholder.jpg",
  },
]

export const PRICE_MIN = 500
export const PRICE_MAX = 15000
