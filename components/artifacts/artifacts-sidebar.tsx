"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  magicDirections,
  jewelryTypes,
  stones,
  materials,
  availabilityOptions,
  PRICE_MIN,
  PRICE_MAX,
  type MagicDirection,
  type JewelryType,
  type Stone,
  type Material,
  type AvailabilityStatus,
} from "@/lib/artifacts-data"

interface ArtifactsSidebarProps {
  availability: AvailabilityStatus | "all"
  onAvailabilityChange: (value: AvailabilityStatus | "all") => void
  selectedDirections: MagicDirection[]
  onDirectionsChange: (ids: MagicDirection[]) => void
  selectedTypes: JewelryType[]
  onTypesChange: (ids: JewelryType[]) => void
  selectedStones: Stone[]
  onStonesChange: (ids: Stone[]) => void
  selectedMaterials: Material[]
  onMaterialsChange: (ids: Material[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  onReset: () => void
}

interface AccordionSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function AccordionSection({ title, defaultOpen = true, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[rgba(255,255,255,0.06)] pb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function ArtifactsSidebar({
  availability,
  onAvailabilityChange,
  selectedDirections,
  onDirectionsChange,
  selectedTypes,
  onTypesChange,
  selectedStones,
  onStonesChange,
  selectedMaterials,
  onMaterialsChange,
  priceRange,
  onPriceRangeChange,
  onReset,
}: ArtifactsSidebarProps) {
  const [stoneSearch, setStoneSearch] = useState("")

  const hasFilters =
    availability !== "all" ||
    selectedDirections.length > 0 ||
    selectedTypes.length > 0 ||
    selectedStones.length > 0 ||
    selectedMaterials.length > 0 ||
    priceRange[0] !== PRICE_MIN ||
    priceRange[1] !== PRICE_MAX

  const filteredStones = useMemo(() => {
    if (!stoneSearch.trim()) return stones
    const q = stoneSearch.trim().toLowerCase()
    return stones.filter((s) => s.label.toLowerCase().includes(q))
  }, [stoneSearch])

  const toggleDirection = (id: MagicDirection) => {
    if (selectedDirections.includes(id)) {
      onDirectionsChange(selectedDirections.filter((d) => d !== id))
    } else {
      onDirectionsChange([...selectedDirections, id])
    }
  }

  const toggleType = (id: JewelryType) => {
    if (selectedTypes.includes(id)) {
      onTypesChange(selectedTypes.filter((t) => t !== id))
    } else {
      onTypesChange([...selectedTypes, id])
    }
  }

  const toggleStone = (id: Stone) => {
    if (selectedStones.includes(id)) {
      onStonesChange(selectedStones.filter((s) => s !== id))
    } else {
      onStonesChange([...selectedStones, id])
    }
  }

  const toggleMaterial = (id: Material) => {
    if (selectedMaterials.includes(id)) {
      onMaterialsChange(selectedMaterials.filter((m) => m !== id))
    } else {
      onMaterialsChange([...selectedMaterials, id])
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-[rgba(255,255,255,0.02)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-foreground">Фильтры</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Сбросить всё
          </button>
        )}
      </div>

      {/* Наличие */}
      <AccordionSection title="Наличие">
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onAvailabilityChange(opt.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                availability === opt.id
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-[rgba(255,255,255,0.1)] text-muted-foreground hover:border-[rgba(255,255,255,0.2)] hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Направление магии */}
      <AccordionSection title="Направление магии">
        <div className="flex flex-col gap-1">
          {magicDirections.map((dir) => (
            <label
              key={dir.id}
              className={cn(
                "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                selectedDirections.includes(dir.id) && "bg-[rgba(255,255,255,0.06)]"
              )}
            >
              <Checkbox
                checked={selectedDirections.includes(dir.id)}
                onCheckedChange={() => toggleDirection(dir.id)}
                className="shrink-0"
              />
              <span
                className="truncate text-sm"
                style={{
                  color: selectedDirections.includes(dir.id) ? dir.color : undefined,
                }}
              >
                {dir.label}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Тип украшения */}
      <AccordionSection title="Тип украшения">
        <div className="flex flex-col gap-1">
          {jewelryTypes.map((type) => (
            <label
              key={type.id}
              className={cn(
                "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                selectedTypes.includes(type.id) && "bg-primary/10"
              )}
            >
              <Checkbox
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => toggleType(type.id)}
                className="shrink-0"
              />
              <span className="truncate text-sm text-foreground">{type.label}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Камень */}
      <AccordionSection title="Камень">
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск камня..."
              value={stoneSearch}
              onChange={(e) => setStoneSearch(e.target.value)}
              className="h-9 pl-9 text-sm"
            />
          </div>
          <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
            {filteredStones.map((stone) => (
              <label
                key={stone.id}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                  selectedStones.includes(stone.id) && "bg-primary/10"
                )}
              >
                <Checkbox
                  checked={selectedStones.includes(stone.id)}
                  onCheckedChange={() => toggleStone(stone.id)}
                  className="shrink-0"
                />
                <span className="truncate text-sm text-foreground">{stone.label}</span>
              </label>
            ))}
            {filteredStones.length === 0 && (
              <p className="py-2 text-center text-xs text-muted-foreground">
                Ничего не найдено
              </p>
            )}
          </div>
        </div>
      </AccordionSection>

      {/* Материал */}
      <AccordionSection title="Материал">
        <div className="flex flex-col gap-1">
          {materials.map((mat) => (
            <label
              key={mat.id}
              className={cn(
                "flex min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 transition-colors hover:bg-[rgba(255,255,255,0.04)]",
                selectedMaterials.includes(mat.id) && "bg-primary/10"
              )}
            >
              <Checkbox
                checked={selectedMaterials.includes(mat.id)}
                onCheckedChange={() => toggleMaterial(mat.id)}
                className="shrink-0"
              />
              <span className="truncate text-sm text-foreground">{mat.label}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Цена */}
      <AccordionSection title="Цена">
        <div className="space-y-4">
          {/* Range slider */}
          <div className="relative px-1">
            <div className="relative h-2 rounded-full bg-[rgba(255,255,255,0.1)]">
              <div
                className="absolute h-full rounded-full bg-primary/60"
                style={{
                  left: `${((priceRange[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                  right: `${100 - ((priceRange[1] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100}
              value={priceRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val <= priceRange[1]) {
                  onPriceRangeChange([val, priceRange[1]])
                }
              }}
              className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100}
              value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= priceRange[0]) {
                  onPriceRangeChange([priceRange[0], val])
                }
              }}
              className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
            />
          </div>

          {/* Number inputs */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="number"
                min={PRICE_MIN}
                max={priceRange[1]}
                step={100}
                value={priceRange[0]}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val >= PRICE_MIN && val <= priceRange[1]) {
                    onPriceRangeChange([val, priceRange[1]])
                  }
                }}
                className="h-9 text-center text-sm"
              />
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex-1">
              <Input
                type="number"
                min={priceRange[0]}
                max={PRICE_MAX}
                step={100}
                value={priceRange[1]}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val <= PRICE_MAX && val >= priceRange[0]) {
                    onPriceRangeChange([priceRange[0], val])
                  }
                }}
                className="h-9 text-center text-sm"
              />
            </div>
            <span className="text-xs text-muted-foreground">₽</span>
          </div>
        </div>
      </AccordionSection>
    </div>
  )
}
