"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Plus, Minus, Heart, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type Artifact,
  getMagicDirectionLabel,
  getMagicDirectionColor,
  getStoneLabel,
  getMaterialLabel,
  getAvailabilityLabel,
  getJewelryTypeLabel,
} from "@/lib/artifacts-data"

interface ArtifactCardProps {
  artifact: Artifact
  viewMode: "grid" | "list"
  cartQuantity: number
  isFavorite: boolean
  onAddToCart: () => void
  onUpdateQuantity: (delta: number) => void
  onToggleFavorite: () => void
}

export function ArtifactCard({
  artifact,
  viewMode,
  cartQuantity,
  isFavorite,
  onAddToCart,
  onUpdateQuantity,
  onToggleFavorite,
}: ArtifactCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAnimating(true)
    onAddToCart()
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite()
  }

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation()
    onUpdateQuantity(delta)
  }

  const directionColor = getMagicDirectionColor(artifact.magicDirection)
  const isInStock = artifact.availability === "in_stock"
  const hasRealImage = artifact.image && !artifact.image.includes("placeholder")

  if (viewMode === "list") {
    return (
      <>
        <div
          onClick={() => setIsModalOpen(true)}
          className="group flex cursor-pointer gap-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 transition-all hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
        >
          {/* Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f0]">
            {hasRealImage ? (
              <Image
                src={artifact.image}
                alt={artifact.name}
                fill
                className="object-contain p-1"
                sizes="96px"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${directionColor}30 0%, ${directionColor}10 50%, rgba(30,30,40,0.8) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl opacity-40">✧</span>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${directionColor}20`,
                    color: directionColor,
                  }}
                >
                  {getMagicDirectionLabel(artifact.magicDirection)}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    isInStock
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-500/20 text-gray-400"
                  )}
                >
                  {getAvailabilityLabel(artifact.availability)}
                </span>
              </div>
            <h3 className="line-clamp-1 font-serif text-base font-medium text-foreground">
              {artifact.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {artifact.description}
            </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                {artifact.price.toLocaleString("ru-RU")} ₽
              </span>

              <div className="flex items-center gap-2">
                {/* Favorite button */}
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                    isFavorite
                      ? "border-pink-500/40 bg-pink-500/20 text-pink-400"
                      : "border-[rgba(255,255,255,0.12)] text-muted-foreground hover:border-pink-500/40 hover:text-pink-400"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                </button>

                {cartQuantity > 0 ? (
                  <div className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10">
                    <button
                      type="button"
                      onClick={(e) => handleQuantityChange(e, -1)}
                      className="flex h-8 w-8 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-medium text-primary">
                      {cartQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleQuantityChange(e, 1)}
                      className="flex h-8 w-8 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={cn(
                      "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110",
                      isAnimating && "scale-95"
                    )}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <ArtifactModal
          artifact={artifact}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cartQuantity={cartQuantity}
          isFavorite={isFavorite}
          onAddToCart={onAddToCart}
          onUpdateQuantity={onUpdateQuantity}
          onToggleFavorite={onToggleFavorite}
        />
      </>
    )
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
      >
        {/* Image */}
        <div className={cn("relative aspect-square overflow-hidden", hasRealImage && "bg-[#f5f5f0]")}>
          {hasRealImage ? (
            <Image
              src={artifact.image}
              alt={artifact.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${directionColor}30 0%, ${directionColor}10 50%, rgba(30,30,40,0.8) 100%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30 transition-opacity group-hover:opacity-50">✧</span>
              </div>
            </>
          )}

          {/* Availability badge */}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium",
              isInStock
                ? "bg-emerald-500/20 text-emerald-400 backdrop-blur-sm"
                : "bg-gray-500/20 text-gray-400 backdrop-blur-sm"
            )}
          >
            {getAvailabilityLabel(artifact.availability)}
          </span>

          {/* Favorite button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={cn(
              "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all",
              isFavorite
                ? "bg-pink-500/30 text-pink-400"
                : "bg-black/30 text-white/70 hover:bg-pink-500/30 hover:text-pink-400"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 font-serif text-base font-medium leading-tight text-foreground">
            {artifact.name}
          </h3>

          {/* Magic direction tag */}
          <span
            className="mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${directionColor}20`,
              color: directionColor,
            }}
          >
            {getMagicDirectionLabel(artifact.magicDirection)}
          </span>

          {/* Description preview */}
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {artifact.description}
          </p>

          {/* Price */}
          <p className="mt-3 text-xl font-semibold text-foreground">
            {artifact.price.toLocaleString("ru-RU")} ₽
          </p>

          {/* Add to cart button */}
          <div className="mt-4">
            {cartQuantity > 0 ? (
              <div className="flex items-center justify-center gap-1 rounded-lg border border-primary/30 bg-primary/10">
                <button
                  type="button"
                  onClick={(e) => handleQuantityChange(e, -1)}
                  className="flex h-10 w-10 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-base font-medium text-primary">
                  {cartQuantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleQuantityChange(e, 1)}
                  className="flex h-10 w-10 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110",
                  isAnimating && "scale-95"
                )}
              >
                <ShoppingCart className={cn("h-4 w-4", isAnimating && "animate-bounce")} />
                В корзину
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ArtifactModal
        artifact={artifact}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartQuantity={cartQuantity}
        isFavorite={isFavorite}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateQuantity}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  )
}

interface ArtifactModalProps {
  artifact: Artifact
  isOpen: boolean
  onClose: () => void
  cartQuantity: number
  isFavorite: boolean
  onAddToCart: () => void
  onUpdateQuantity: (delta: number) => void
  onToggleFavorite: () => void
}

function ArtifactModal({
  artifact,
  isOpen,
  onClose,
  cartQuantity,
  isFavorite,
  onAddToCart,
  onUpdateQuantity,
  onToggleFavorite,
}: ArtifactModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  if (!isOpen) return null

  const handleAddToCart = () => {
    setIsAnimating(true)
    onAddToCart()
    setTimeout(() => setIsAnimating(false), 500)
  }

  const directionColor = getMagicDirectionColor(artifact.magicDirection)
  const isInStock = artifact.availability === "in_stock"
  const hasRealImage = artifact.image && !artifact.image.includes("placeholder")

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-background shadow-2xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white lg:right-4 lg:top-4 lg:bg-[rgba(255,255,255,0.1)] lg:text-muted-foreground lg:hover:bg-[rgba(255,255,255,0.15)] lg:hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Image only */}
        <div className={cn(
          "relative w-full shrink-0 lg:w-[550px]",
          hasRealImage ? "bg-[#f5f5f0]" : ""
        )}>
          <div className="relative aspect-square w-full lg:h-full lg:min-h-[500px]">
            {hasRealImage ? (
              <Image
                src={artifact.image}
                alt={artifact.name}
                fill
                className="object-contain p-8"
                sizes="550px"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${directionColor}40 0%, ${directionColor}15 50%, rgba(30,30,40,0.9) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">✧</span>
                </div>
              </>
            )}

            {/* Availability badge */}
            <span
              className={cn(
                "absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm",
                isInStock
                  ? "bg-emerald-500/30 text-emerald-300"
                  : "bg-gray-500/30 text-gray-300"
              )}
            >
              {getAvailabilityLabel(artifact.availability)}
            </span>

            {/* Favorite button */}
            <button
              type="button"
              onClick={onToggleFavorite}
              className={cn(
                "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all",
                isFavorite
                  ? "bg-pink-500/30 text-pink-400"
                  : "bg-black/30 text-white/70 hover:bg-pink-500/30 hover:text-pink-400"
              )}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Right: Info + Description + Actions */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col p-5 lg:p-6">
            {/* Direction tag */}
            <span
              className="inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${directionColor}20`,
                color: directionColor,
              }}
            >
              {getMagicDirectionLabel(artifact.magicDirection)}
            </span>

            {/* Title */}
            <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-foreground">
              {artifact.name}
            </h2>

            {/* Price */}
            <p className="mt-2 text-3xl font-bold text-primary">
              {artifact.price.toLocaleString("ru-RU")} ₽
            </p>

            {/* Specs */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-md bg-[rgba(255,255,255,0.06)] px-2.5 py-1.5">
                {getJewelryTypeLabel(artifact.jewelryType)}
              </span>
              <span className="rounded-md bg-[rgba(255,255,255,0.06)] px-2.5 py-1.5">
                {getStoneLabel(artifact.stone)}
              </span>
              <span className="rounded-md bg-[rgba(255,255,255,0.06)] px-2.5 py-1.5">
                {getMaterialLabel(artifact.material)}
              </span>
            </div>

            {/* Description */}
            <div className="mt-5 flex-1">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Описание
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                {artifact.description.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Add to cart - at bottom */}
            <div className="mt-6 border-t border-[rgba(255,255,255,0.08)] pt-5">
              {cartQuantity > 0 ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(-1)}
                      className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2.5rem] text-center text-lg font-semibold text-primary">
                      {cartQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(1)}
                      className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/20"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-base text-muted-foreground">
                    Итого: <span className="font-semibold text-foreground">{(artifact.price * cartQuantity).toLocaleString("ru-RU")} ₽</span>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    "flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110",
                    isAnimating && "scale-[0.98]"
                  )}
                >
                  <ShoppingCart className={cn("h-5 w-5", isAnimating && "animate-bounce")} />
                  Добавить в корзину
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
