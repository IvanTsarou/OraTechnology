"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag, Truck, Package, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Artifact, artifacts } from "@/lib/artifacts-data"

export interface CartItem {
  artifactId: string
  quantity: number
}

type DeliveryMethod = "pickup" | "post" | "cdek"

const deliveryOptions: { id: DeliveryMethod; label: string; price: number; time: string; icon: React.ReactNode }[] = [
  { id: "pickup", label: "Самовывоз", price: 0, time: "бесплатно", icon: <User className="h-4 w-4" /> },
  { id: "post", label: "Почта России", price: 350, time: "7–14 дней", icon: <Package className="h-4 w-4" /> },
  { id: "cdek", label: "СДЭК", price: 450, time: "3–5 дней", icon: <Truck className="h-4 w-4" /> },
]

interface ArtifactsCartProps {
  items: CartItem[]
  onUpdateQuantity: (artifactId: string, delta: number) => void
  onRemoveItem: (artifactId: string) => void
  onCheckout: () => void
  isAuthenticated: boolean
  onAuthRequired: () => void
}

export function ArtifactsCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isAuthenticated,
  onAuthRequired,
}: ArtifactsCartProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup")

  const cartArtifacts = items
    .map((item) => {
      const artifact = artifacts.find((a) => a.id === item.artifactId)
      return artifact ? { artifact, quantity: item.quantity } : null
    })
    .filter(Boolean) as { artifact: Artifact; quantity: number }[]

  const subtotal = cartArtifacts.reduce(
    (sum, { artifact, quantity }) => sum + artifact.price * quantity,
    0
  )

  const deliveryPrice = deliveryOptions.find((d) => d.id === deliveryMethod)?.price ?? 0
  const total = subtotal + deliveryPrice
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }
    onCheckout()
  }

  return (
    <div className="flex h-full flex-col bg-[rgba(255,255,255,0.02)] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-lg font-semibold text-foreground">Корзина</h2>
        {totalItems > 0 && (
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
            {totalItems}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Корзина пуста</p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Добавьте артефакты из каталога
          </p>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {cartArtifacts.map(({ artifact, quantity }) => (
              <div
                key={artifact.id}
                className="flex gap-3 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3"
              >
                {/* Mini image */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl opacity-40">✧</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="truncate text-sm font-medium text-foreground">
                      {artifact.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(artifact.id)}
                      className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {artifact.price.toLocaleString("ru-RU")} ₽ / шт.
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded border border-[rgba(255,255,255,0.1)]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(artifact.id, -1)}
                        className="flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-xs font-medium text-foreground">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(artifact.id, 1)}
                        className="flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      {(artifact.price * quantity).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery */}
          <div className="mt-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Способ доставки</h3>
            <div className="space-y-2">
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-all",
                    deliveryMethod === option.id
                      ? "border-primary/40 bg-primary/10"
                      : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]"
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={option.id}
                    checked={deliveryMethod === option.id}
                    onChange={() => setDeliveryMethod(option.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border",
                      deliveryMethod === option.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}
                  >
                    {deliveryMethod === option.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </span>
                  <span className="text-muted-foreground">{option.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm text-foreground">{option.label}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({option.time})</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {option.price === 0 ? "Бесплатно" : `${option.price} ₽`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-2 border-t border-[rgba(255,255,255,0.06)] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Подытог</span>
              <span className="text-foreground">{subtotal.toLocaleString("ru-RU")} ₽</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span className="text-foreground">
                {deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice.toLocaleString("ru-RU")} ₽`}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 text-lg font-semibold">
              <span className="text-foreground">Итого</span>
              <span className="text-primary">{total.toLocaleString("ru-RU")} ₽</span>
            </div>
          </div>

          {/* Checkout button */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Оформить заказ
          </button>
        </>
      )}
    </div>
  )
}
