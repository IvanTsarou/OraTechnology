"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Search, Grid3X3, List, X, Filter, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtifactsSidebar } from "@/components/artifacts/artifacts-sidebar"
import { ArtifactCard } from "@/components/artifacts/artifact-card"
import { ArtifactsCart, type CartItem } from "@/components/artifacts/artifacts-cart"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  artifacts,
  PRICE_MIN,
  PRICE_MAX,
  getMagicDirectionLabel,
  getJewelryTypeLabel,
  getStoneLabel,
  getMaterialLabel,
  type MagicDirection,
  type JewelryType,
  type Stone,
  type Material,
  type AvailabilityStatus,
} from "@/lib/artifacts-data"

type SortOption = "popular" | "price_asc" | "price_desc" | "new"
type ViewMode = "grid" | "list"

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "popular", label: "По популярности" },
  { id: "price_asc", label: "По цене ↑" },
  { id: "price_desc", label: "По цене ↓" },
  { id: "new", label: "Новинки" },
]

const CART_STORAGE_KEY = "ora_artifacts_cart"
const FAVORITES_STORAGE_KEY = "ora_artifacts_favorites"

export default function ArtifactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const [availability, setAvailability] = useState<AvailabilityStatus | "all">("all")
  const [selectedDirections, setSelectedDirections] = useState<MagicDirection[]>([])
  const [selectedTypes, setSelectedTypes] = useState<JewelryType[]>([])
  const [selectedStones, setSelectedStones] = useState<Stone[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX])

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch {
        // ignore
      }
    }
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const handleReset = () => {
    setAvailability("all")
    setSelectedDirections([])
    setSelectedTypes([])
    setSelectedStones([])
    setSelectedMaterials([])
    setPriceRange([PRICE_MIN, PRICE_MAX])
  }

  const activeFilters = useMemo(() => {
    const filters: { type: string; id: string; label: string }[] = []

    if (availability !== "all") {
      filters.push({
        type: "availability",
        id: availability,
        label: availability === "in_stock" ? "В наличии" : "Под заказ",
      })
    }

    selectedDirections.forEach((id) => {
      filters.push({ type: "direction", id, label: getMagicDirectionLabel(id) })
    })

    selectedTypes.forEach((id) => {
      filters.push({ type: "type", id, label: getJewelryTypeLabel(id) })
    })

    selectedStones.forEach((id) => {
      filters.push({ type: "stone", id, label: getStoneLabel(id) })
    })

    selectedMaterials.forEach((id) => {
      filters.push({ type: "material", id, label: getMaterialLabel(id) })
    })

    if (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX) {
      filters.push({
        type: "price",
        id: "price",
        label: `${priceRange[0].toLocaleString("ru-RU")} — ${priceRange[1].toLocaleString("ru-RU")} ₽`,
      })
    }

    return filters
  }, [availability, selectedDirections, selectedTypes, selectedStones, selectedMaterials, priceRange])

  const removeFilter = (type: string, id: string) => {
    switch (type) {
      case "availability":
        setAvailability("all")
        break
      case "direction":
        setSelectedDirections((prev) => prev.filter((d) => d !== id))
        break
      case "type":
        setSelectedTypes((prev) => prev.filter((t) => t !== id))
        break
      case "stone":
        setSelectedStones((prev) => prev.filter((s) => s !== id))
        break
      case "material":
        setSelectedMaterials((prev) => prev.filter((m) => m !== id))
        break
      case "price":
        setPriceRange([PRICE_MIN, PRICE_MAX])
        break
    }
  }

  const filteredArtifacts = useMemo(() => {
    let result = [...artifacts]

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((a) => a.name.toLowerCase().includes(q))
    }

    if (availability !== "all") {
      result = result.filter((a) => a.availability === availability)
    }

    if (selectedDirections.length > 0) {
      result = result.filter((a) => selectedDirections.includes(a.magicDirection))
    }

    if (selectedTypes.length > 0) {
      result = result.filter((a) => selectedTypes.includes(a.jewelryType))
    }

    if (selectedStones.length > 0) {
      result = result.filter((a) => selectedStones.includes(a.stone))
    }

    if (selectedMaterials.length > 0) {
      result = result.filter((a) => selectedMaterials.includes(a.material))
    }

    result = result.filter((a) => a.price >= priceRange[0] && a.price <= priceRange[1])

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "new":
        result.reverse()
        break
      default:
        break
    }

    return result
  }, [searchQuery, availability, selectedDirections, selectedTypes, selectedStones, selectedMaterials, priceRange, sortBy])

  const getCartQuantity = useCallback(
    (artifactId: string) => {
      return cartItems.find((item) => item.artifactId === artifactId)?.quantity ?? 0
    },
    [cartItems]
  )

  const addToCart = useCallback((artifactId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.artifactId === artifactId)
      if (existing) {
        return prev.map((item) =>
          item.artifactId === artifactId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { artifactId, quantity: 1 }]
    })
  }, [])

  const updateCartQuantity = useCallback((artifactId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.artifactId === artifactId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    })
  }, [])

  const removeFromCart = useCallback((artifactId: string) => {
    setCartItems((prev) => prev.filter((item) => item.artifactId !== artifactId))
  }, [])

  const isFavorite = useCallback(
    (artifactId: string) => favorites.includes(artifactId),
    [favorites]
  )

  const toggleFavorite = useCallback((artifactId: string) => {
    setFavorites((prev) =>
      prev.includes(artifactId)
        ? prev.filter((id) => id !== artifactId)
        : [...prev, artifactId]
    )
  }, [])

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Mobile header */}
        <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-6 lg:hidden">
          <div>
            <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
              Артефакты
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">«Золотой Рассвет»</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm font-medium text-foreground"
            >
              <Filter className="h-4 w-4" />
              {activeFilters.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileCartOpen(true)}
              className="relative flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              🛒
              {totalCartItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-primary">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Left Sidebar - Filters */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-r border-[rgba(255,255,255,0.08)]">
              <ArtifactsSidebar
                availability={availability}
                onAvailabilityChange={setAvailability}
                selectedDirections={selectedDirections}
                onDirectionsChange={setSelectedDirections}
                selectedTypes={selectedTypes}
                onTypesChange={setSelectedTypes}
                selectedStones={selectedStones}
                onStonesChange={setSelectedStones}
                selectedMaterials={selectedMaterials}
                onMaterialsChange={setSelectedMaterials}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                onReset={handleReset}
              />
            </div>
          </aside>

          {/* Main Content */}
          <section className="min-w-0 flex-1 pb-16 pt-2 lg:pt-6">
            <div className="px-4 lg:px-8">
              {/* Desktop header */}
              <div className="mb-6 hidden lg:block">
                <h1 className="font-serif text-2xl font-semibold tracking-wide text-foreground">
                  Артефакты «Золотой Рассвет»
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Магические украшения ручной работы с натуральными камнями для защиты, любви, изобилия и духовного развития.
                </p>
              </div>

              {/* Search, Sort, View controls */}
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:w-64 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Поиск по названию..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    Найдено: <span className="font-medium text-foreground">{filteredArtifacts.length}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-10 rounded-lg border border-[rgba(255,255,255,0.12)] bg-transparent px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-background">
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex rounded-lg border border-[rgba(255,255,255,0.12)]">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center transition-colors",
                        viewMode === "grid"
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center transition-colors",
                        viewMode === "list"
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filters tags */}
              {activeFilters.length > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {activeFilters.map((filter) => (
                    <span
                      key={`${filter.type}-${filter.id}`}
                      className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {filter.label}
                      <button
                        type="button"
                        onClick={() => removeFilter(filter.type, filter.id)}
                        className="rounded-full p-0.5 transition-colors hover:bg-primary/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Сбросить все
                  </button>
                </div>
              )}

              {/* Results count (mobile) */}
              <p className="mb-4 text-sm text-muted-foreground sm:hidden">
                Найдено: <span className="font-medium text-foreground">{filteredArtifacts.length}</span> товаров
              </p>

              {/* Products grid/list */}
              {filteredArtifacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <SlidersHorizontal className="mb-4 h-12 w-12 text-muted-foreground/30" />
                  <p className="text-lg font-medium text-foreground">Ничего не найдено</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Попробуйте изменить параметры фильтрации
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 rounded-lg border border-[rgba(255,255,255,0.12)] px-4 py-2 text-sm text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div
                  className={cn(
                    "transition-all duration-300",
                    viewMode === "grid"
                      ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  )}
                >
                  {filteredArtifacts.map((artifact) => (
                    <ArtifactCard
                      key={artifact.id}
                      artifact={artifact}
                      viewMode={viewMode}
                      cartQuantity={getCartQuantity(artifact.id)}
                      isFavorite={isFavorite(artifact.id)}
                      onAddToCart={() => addToCart(artifact.id)}
                      onUpdateQuantity={(delta) => updateCartQuantity(artifact.id, delta)}
                      onToggleFavorite={() => toggleFavorite(artifact.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Right Sidebar - Cart */}
          <aside className="hidden w-72 shrink-0 xl:block">
            <div className="sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto border-l border-[rgba(255,255,255,0.08)]">
              <ArtifactsCart
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={() => alert("Оформление заказа...")}
                isAuthenticated={false}
                onAuthRequired={() => setShowAuthModal(true)}
              />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* Mobile filters sheet */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm transform bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-4">
          <h2 className="font-serif text-lg font-semibold text-foreground">Фильтры</h2>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto overscroll-contain">
          <ArtifactsSidebar
            availability={availability}
            onAvailabilityChange={setAvailability}
            selectedDirections={selectedDirections}
            onDirectionsChange={setSelectedDirections}
            selectedTypes={selectedTypes}
            onTypesChange={setSelectedTypes}
            selectedStones={selectedStones}
            onStonesChange={setSelectedStones}
            selectedMaterials={selectedMaterials}
            onMaterialsChange={setSelectedMaterials}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Mobile cart sheet */}
      {mobileCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={() => setMobileCartOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm transform bg-background shadow-2xl transition-transform duration-300 ease-out xl:hidden",
          mobileCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-4">
          <h2 className="font-serif text-lg font-semibold text-foreground">Корзина</h2>
          <button
            type="button"
            onClick={() => setMobileCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto overscroll-contain">
          <ArtifactsCart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => alert("Оформление заказа...")}
            isAuthenticated={false}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        </div>
      </div>

      {/* Auth modal placeholder */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl border border-[rgba(255,255,255,0.1)] bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 font-serif text-xl font-semibold text-foreground">
              Требуется авторизация
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Для оформления заказа необходимо войти в личный кабинет или зарегистрироваться.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="flex-1 rounded-lg border border-[rgba(255,255,255,0.12)] py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)]"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false)
                  window.location.href = "/account"
                }}
                className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
