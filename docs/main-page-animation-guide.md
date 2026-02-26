# Руководство по созданию качественной анимации для главной страницы

## Обзор вариантов

| Вариант | Сложность | Качество | Стоимость | Время |
|---------|-----------|----------|-----------|-------|
| Видео | ★☆☆ | ★★★ | $0-500 | 1-3 дня |
| 3D Панорама | ★★☆ | ★★★ | $0-50 | 1-2 дня |
| Parallax слои | ★★☆ | ★★☆ | $0-100 | 2-4 дня |
| Полноценная 3D сцена | ★★★ | ★★★ | $100-1000 | 1-2 недели |

---

## Вариант 1: Видео

**Самый простой способ получить качественный результат.**

### Требования к файлу

| Параметр | Значение |
|----------|----------|
| Формат | MP4 (H.264) + WebM (VP9) |
| Разрешение | 1920×1080 или 3840×2160 (4K) |
| Длительность | 15-30 секунд (loop) |
| Битрейт | 8-15 Mbps |
| Размер файла | До 15-20 MB |

### Где получить видео

#### Stock библиотеки
- **Envato Elements** (elements.envato.com) — подписка ~$16/мес
- **Artgrid** (artgrid.io) — премиум footage
- **Storyblocks** (storyblocks.com) — безлимитные скачивания
- **Pexels/Pixabay** — бесплатно, но ограниченный выбор

Поисковые запросы: `mountain aerial`, `crystal landscape`, `mystical mountains`, `aurora borealis timelapse`

#### AI-генерация видео

**Runway Gen-3** (runway.ml)
- Лучший для image-to-video
- Загружаешь картинку → описываешь движение камеры
- Пример промпта: `Slow cinematic camera push forward and upward towards the crystal peak, gentle snow particles, ethereal lighting`
- Стоимость: ~$15 за 100 секунд генерации

**Pika Labs** (pika.art)
- Хороший контроль движения камеры
- Бесплатный тариф с ограничениями

**Luma Dream Machine** (lumalabs.ai)
- Отлично работает с пейзажами
- Реалистичное движение

**Kling AI** (klingai.com)
- Длинные видео до 2 минут
- Хорошая детализация

#### Заказ у специалиста
- **Fiverr** — от $50 за простую анимацию
- **Upwork** — $100-500 за качественный loop
- **Behance/Dribbble** — поиск моушн-дизайнеров

### Реализация на сайте

```tsx
<video 
  autoPlay 
  muted 
  loop 
  playsInline
  poster="/images/main-fallback.jpg"
  className="fixed inset-0 h-full w-full object-cover"
>
  <source src="/video/main-bg.webm" type="video/webm" />
  <source src="/video/main-bg.mp4" type="video/mp4" />
</video>
```

---

## Вариант 2: 3D Панорама (360° фото)

**Интерактивный вариант с возможностью управления камерой.**

### Требования к файлу

| Параметр | Значение |
|----------|----------|
| Тип | Equirectangular проекция |
| Соотношение сторон | 2:1 |
| Разрешение | 8192×4096 px (минимум) |
| Формат | JPEG или PNG |

### Где создать панораму

**Blockade Labs Skybox** (skybox.blockadelabs.com)
- Генерация 360° панорам по текстовому описанию
- Бесплатный тариф с водяными знаками
- Премиум: ~$10/мес

Пример промпта:
```
Mystical arctic mountain peak with glowing crystal monolith at the center,
aurora borealis dancing in the night sky, gentle snow particles falling,
ethereal blue and purple lighting, cinematic atmosphere, photorealistic, 8k quality,
ice crystals reflecting light, distant frozen peaks, magical winter landscape
```

**Leonardo.ai** (leonardo.ai)
- Режим 360° генерации
- Высокое качество текстур

**Midjourney + конвертация**
- Сгенерировать панорамное изображение в Midjourney
- Конвертировать в 360° через Skybox AI

### Реализация на сайте

Используется Three.js — камера помещается внутрь сферы с текстурой панорамы:

```tsx
import * as THREE from 'three'

// Создаём сферу и инвертируем её (текстура внутри)
const geometry = new THREE.SphereGeometry(500, 60, 40)
geometry.scale(-1, 1, 1)

// Загружаем панораму как текстуру
const texture = new THREE.TextureLoader().load('/panorama/main-360.jpg')
const material = new THREE.MeshBasicMaterial({ map: texture })

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Камера вращается/перемещается по скроллу
```

---

## Вариант 3: Parallax с несколькими слоями

**Улучшенная версия текущей реализации.**

### Требования к файлам

Нужно подготовить 4-6 отдельных слоёв:

| Слой | Описание | Скорость движения |
|------|----------|-------------------|
| 1 | Небо, звёзды, северное сияние | 0.1x (почти статичный) |
| 2 | Дальние горы | 0.3x |
| 3 | Средние горы | 0.5x |
| 4 | Ближние скалы/кристаллы | 0.8x |
| 5 | Передний план (снег, туман) | 1.0x |
| 6 | Частицы, эффекты | 1.2x |

### Параметры файлов

| Параметр | Значение |
|----------|----------|
| Формат | PNG с альфа-каналом |
| Разрешение | 2560×1440 px или выше |
| Ширина | На 20-30% шире экрана |

### Где создать слои

**Вручную в Photoshop/GIMP:**
1. Открыть исходное изображение
2. Выделить объекты (горы, небо) инструментом выделения или AI
3. Разнести по отдельным слоям
4. Экспортировать каждый слой как PNG

**Автоматическое разделение:**
- **Remove.bg** — отделение переднего плана
- **Photoshop AI** (Generative Fill) — умное выделение и разделение
- **Runway** — инструмент Inpainting для создания слоёв

**Генерация отдельных слоёв:**

Midjourney/DALL-E промпты:
```
Layer 1: Night sky with aurora borealis, stars, transparent background, PNG --ar 16:9
Layer 2: Distant snowy mountain silhouettes, misty, transparent background, PNG --ar 16:9
Layer 3: Medium distance rocky peaks with snow, transparent background, PNG --ar 16:9
Layer 4: Close-up crystal formations and ice rocks, transparent background, PNG --ar 16:9
```

---

## Вариант 4: Полноценная 3D сцена

**Максимальное качество и интерактивность.**

### Требования к моделям

| Параметр | Значение |
|----------|----------|
| Формат | GLTF / GLB |
| Полигонов | До 50-100k на всю сцену |
| Текстуры | До 2048×2048, сжатые (KTX2) |
| Анимации | Baked или skeletal |

### Где получить 3D модели

**Готовые модели:**
- **Sketchfab** (sketchfab.com) — огромная библиотека, есть бесплатные
- **TurboSquid** (turbosquid.com) — профессиональные модели
- **CGTrader** (cgtrader.com) — разные ценовые категории

Поисковые запросы: `low poly mountains`, `crystal landscape`, `fantasy terrain`, `ice peaks`

**AI-генерация 3D:**
- **Meshy.ai** — text-to-3D и image-to-3D
- **Luma AI** — фотограмметрия из фото/видео
- **Tripo3D** (tripo3d.ai) — быстрая генерация моделей
- **CSM** (csm.ai) — высокое качество

**Браузерные 3D редакторы:**
- **Spline** (spline.design) — создание сцен с экспортом в React
- **Vectary** (vectary.com) — простой 3D редактор

**Профессиональные инструменты:**
- **Blender** (бесплатный) — полный контроль
- **Cinema 4D** — индустриальный стандарт

### Оптимизация для веба

1. **Сжатие моделей**: используй `gltf-transform` или `glTF Pipeline`
2. **Текстуры**: конвертируй в KTX2 формат
3. **LOD**: несколько уровней детализации для разных расстояний
4. **Draco compression**: сжатие геометрии

```bash
# Оптимизация GLTF
npx @gltf-transform/cli optimize input.glb output.glb --compress draco
```

---

## Рекомендуемый подход

### Для быстрого качественного результата

**Комбинация: Blockade Labs + Runway Gen-3**

1. **Создай 360° панораму** в Blockade Labs:
   ```
   Mystical arctic mountain peak with glowing crystal monolith,
   aurora borealis, snow particles, ethereal blue and purple lighting,
   cinematic, 8k, photorealistic
   ```

2. **Конвертируй в видео** через Runway Gen-3:
   - Загрузи панораму или её часть
   - Промпт для движения: `slow cinematic camera push forward and upward towards the crystal peak, gentle parallax motion`

3. **Зациклируй видео** в DaVinci Resolve (бесплатный) или After Effects

4. **Экспортируй** в два формата:
   - WebM (VP9) — для Chrome, Firefox
   - MP4 (H.264) — для Safari, fallback

---

## Чеклист материалов

### Минимальный набор

- [ ] Основное видео (WebM + MP4), 15-30 сек, 1080p+
- [ ] Fallback изображение (JPEG), 1920×1080
- [ ] Аудио файл (MP3), < 2MB (опционально)

### Расширенный набор

- [ ] Видео в 4K разрешении
- [ ] Несколько вариантов для A/B тестирования
- [ ] Мобильная версия видео (меньший размер/разрешение)
- [ ] Poster-изображение для превью до загрузки видео

---

## Полезные ресурсы

### Генерация контента
- Blockade Labs Skybox: https://skybox.blockadelabs.com
- Runway: https://runway.ml
- Pika Labs: https://pika.art
- Luma AI: https://lumalabs.ai
- Meshy.ai: https://meshy.ai

### Stock материалы
- Envato Elements: https://elements.envato.com
- Artgrid: https://artgrid.io
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

### Инструменты обработки
- DaVinci Resolve (бесплатный): https://blackmagicdesign.com/products/davinciresolve
- Blender (бесплатный): https://blender.org
- Spline (браузерный 3D): https://spline.design

### Оптимизация
- Handbrake (конвертация видео): https://handbrake.fr
- Squoosh (сжатие изображений): https://squoosh.app
- glTF Transform: https://gltf-transform.donmccurdy.com
