"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ChevronDown, ArrowRight, Volume2, VolumeX } from "lucide-react"

const SCROLL_SCREENS = 7
const SCROLL_HEIGHT = `${SCROLL_SCREENS * 100}vh`

export default function MainScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (audioRef.current && !isMuted && audioLoaded) {
      audioRef.current.play().catch(() => {
        setIsMuted(true)
      })
    }
  }, [audioLoaded, isMuted])

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      const volume = 0.3 + scrollProgress * 0.4
      audioRef.current.volume = Math.min(volume, 0.7)
    }
  }, [scrollProgress, isMuted])

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {})
        audioRef.current.volume = 0.3
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollHeight = containerRef.current.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Easing функции для разных фаз анимации
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  
  const easedProgress = easeOutCubic(scrollProgress)
  const zoomProgress = easeInOutQuart(scrollProgress)
  const depthProgress = easeOutExpo(scrollProgress)

  // Глубина движения: 1.0 -> 2.8 (финиш на башне крупным планом)
  const scale = 1 + zoomProgress * 1.8
  
  // Вертикальный путь: начинаем снизу (80%), заканчиваем на башне (30%)
  // Башня находится в верхней центральной части изображения
  const positionY = 80 - easedProgress * 50
  
  // Горизонтальное движение: держим центр на башне (50%)
  // Небольшое покачивание для динамики, но финиш строго по центру
  const horizontalWobble = Math.sin(easedProgress * Math.PI) * 5 * (1 - easedProgress)
  const positionX = 50 + horizontalWobble

  // Фазы анимации для текстовых блоков
  const phases = useMemo(() => ({
    intro: scrollProgress < 0.15,
    journey: scrollProgress >= 0.15 && scrollProgress < 0.5,
    approach: scrollProgress >= 0.5 && scrollProgress < 0.75,
    arrival: scrollProgress >= 0.75,
  }), [scrollProgress])

  return (
    <div
      ref={containerRef}
      className={`relative transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <audio
        ref={audioRef}
        src="/audio/ambient-mountains.mp3"
        loop
        preload="auto"
        onCanPlayThrough={() => setAudioLoaded(true)}
      />

      <div style={{ height: SCROLL_HEIGHT }}>
        <div className="fixed inset-0 overflow-hidden bg-[#0a0c12]">
          
          {/* Градиент неба - более глубокий */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(
                to bottom,
                hsl(220, 30%, ${12 - depthProgress * 5}%) 0%,
                hsl(225, 25%, ${18 - depthProgress * 8}%) ${30 - depthProgress * 15}%,
                hsl(230, 20%, ${15 - depthProgress * 6}%) ${60 - depthProgress * 20}%,
                hsl(235, 25%, ${8 - depthProgress * 3}%) 100%
              )`,
            }}
          />

          {/* Видео-фон (если загружено) */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              transform: `scale(${scale * 1.1})`,
              transformOrigin: `${positionX}% ${positionY}%`,
              opacity: videoLoaded ? 0.4 + depthProgress * 0.3 : 0,
              filter: `brightness(${0.7 + depthProgress * 0.3}) saturate(${1.1 + depthProgress * 0.2})`,
            }}
            src="/video-square-mp4_14999540.mp4"
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
          />

          {/* Основное изображение высокого качества */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${positionX}% ${positionY}%`,
            }}
          >
            <Image
              src="/M3_Photoreal_Featured_equirectangular_jpg_sunrise_over_the_dense.jpg"
              alt="Кристальный монолит в горах"
              fill
              className="object-cover"
              style={{
                objectPosition: `${positionX}% ${positionY}%`,
                filter: `brightness(${0.85 + depthProgress * 0.15}) contrast(${1.05 + depthProgress * 0.1})`,
              }}
              priority
              quality={100}
              sizes="100vw"
            />
          </div>

          {/* Параллакс-слой: туманные горы на заднем плане */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              transform: `scale(${1 + zoomProgress * 0.3}) translateY(${depthProgress * -50}px)`,
              opacity: Math.max(0, 0.6 - depthProgress * 0.8),
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to top,
                  transparent 0%,
                  rgba(100, 120, 150, 0.15) 30%,
                  rgba(80, 100, 140, 0.1) 60%,
                  transparent 100%
                )`,
                filter: "blur(20px)",
              }}
            />
          </div>

          {/* Параллакс-слой: передний план */}
          <div
            className="absolute inset-0 pointer-events-none will-change-transform"
            style={{
              transform: `scale(${1 + zoomProgress * 2}) translateY(${depthProgress * 100}px)`,
              opacity: Math.max(0, 0.4 - depthProgress * 0.6),
            }}
          >
            <div 
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: `linear-gradient(
                  to top,
                  rgba(15, 20, 30, 0.95) 0%,
                  rgba(20, 25, 35, 0.6) 50%,
                  transparent 100%
                )`,
              }}
            />
          </div>

          {/* Свечение монолита */}
          <MonolithGlow progress={easedProgress} depth={depthProgress} />

          {/* Атмосферные лучи */}
          <LightRays progress={easedProgress} />

          {/* Энергетические частицы */}
          <EnergyParticles progress={scrollProgress} />

          {/* Снежные частицы */}
          <SnowParticles progress={scrollProgress} />

          {/* Туман в долине */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "70%",
              background: `linear-gradient(to top, 
                rgba(10, 15, 25, 0.98) 0%, 
                rgba(15, 20, 30, 0.8) 20%,
                rgba(20, 25, 40, 0.5) 40%,
                rgba(25, 30, 45, 0.2) 60%,
                transparent 100%
              )`,
              opacity: Math.max(0, 1 - easedProgress * 1.5),
              transform: `translateY(${depthProgress * 30}%)`,
            }}
          />

          {/* Виньетка */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse at ${positionX}% ${Math.max(20, positionY - 15)}%, 
                transparent 0%, 
                transparent ${15 + easedProgress * 20}%, 
                rgba(0, 0, 0, ${0.7 - easedProgress * 0.3}) 100%
              )`,
            }}
          />

          {/* Цветовая коррекция */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background: `linear-gradient(
                ${135 + depthProgress * 45}deg,
                rgba(100, 140, 200, ${0.08 + depthProgress * 0.05}) 0%,
                rgba(150, 100, 180, ${0.05 + depthProgress * 0.03}) 50%,
                rgba(200, 150, 100, ${0.06 + depthProgress * 0.04}) 100%
              )`,
            }}
          />

          {/* Текстовые секции */}
          <TextSections progress={scrollProgress} phases={phases} />

          {/* Навигация */}
          <Navigation progress={scrollProgress} />

          {/* Кнопка музыки */}
          <MusicButton 
            isMuted={isMuted} 
            onToggle={toggleMusic} 
            audioLoaded={audioLoaded}
            progress={scrollProgress}
          />

          {/* Индикатор скролла */}
          <ScrollIndicator progress={scrollProgress} />

          {/* Финальный экран */}
          <FinalCTA progress={scrollProgress} />

          {/* Прогресс-бар */}
          <ProgressBar progress={scrollProgress} />
        </div>
      </div>
    </div>
  )
}

function TextSections({ progress }: { progress: number; phases?: Record<string, boolean> }) {
  const sections = [
    { 
      trigger: 0.05, 
      end: 0.18,
      title: "Путь начинается",
      subtitle: "Древние горы хранят тайны тысячелетий"
    },
    { 
      trigger: 0.25, 
      end: 0.38,
      title: "Сквозь туман времени",
      subtitle: "Каждый шаг приближает к истине"
    },
    { 
      trigger: 0.45, 
      end: 0.58,
      title: "Энергия пробуждается",
      subtitle: "Башня зовёт избранных"
    },
  ]

  return (
    <>
      {sections.map((section, i) => {
        const sectionProgress = Math.max(0, Math.min(1, (progress - section.trigger) / (section.end - section.trigger)))
        const isVisible = progress >= section.trigger && progress <= section.end
        const fadeIn = Math.min(1, sectionProgress * 3)
        const fadeOut = Math.max(0, 1 - (sectionProgress - 0.7) * 3.33)
        const opacity = isVisible ? fadeIn * fadeOut : 0

        return (
          <div
            key={i}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            style={{ opacity }}
          >
            <div 
              className="text-center px-6 max-w-4xl"
              style={{
                transform: `translateY(${(1 - opacity) * 40}px) scale(${0.95 + opacity * 0.05})`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <h2
                className="font-serif text-3xl font-bold tracking-wider text-white sm:text-4xl lg:text-5xl"
                style={{
                  textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(94,234,212,0.2)",
                  letterSpacing: "0.08em",
                }}
              >
                {section.title}
              </h2>
              <p
                className="mt-4 text-lg text-white/70 sm:text-xl lg:text-2xl font-light"
                style={{
                  textShadow: "0 2px 20px rgba(0,0,0,0.9)",
                }}
              >
                {section.subtitle}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

function MonolithGlow({ progress, depth }: { progress: number; depth: number }) {
  return (
    <>
      {/* Основное свечение башни - центрировано */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "35%",
          width: "30vw",
          height: "50vh",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(
            ellipse at center,
            rgba(220, 230, 255, ${0.1 + progress * 0.25}) 0%,
            rgba(180, 200, 240, ${0.05 + progress * 0.15}) 25%,
            rgba(140, 170, 220, ${0.02 + progress * 0.08}) 50%,
            transparent 70%
          )`,
          filter: `blur(${35 - progress * 15}px)`,
        }}
      />
      
      {/* Вертикальный луч от вершины башни */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "0",
          width: "4px",
          height: "45%",
          transform: "translateX(-50%)",
          background: `linear-gradient(
            to bottom,
            rgba(255, 255, 255, ${progress * 0.2}) 0%,
            rgba(220, 230, 255, ${progress * 0.4}) 30%,
            rgba(200, 215, 245, ${progress * 0.3}) 60%,
            transparent 100%
          )`,
          filter: "blur(3px)",
          opacity: depth * 0.8,
        }}
      />

      {/* Свечение на гранях башни */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "30%",
          width: "15vw",
          height: "40vh",
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(
            135deg,
            rgba(255, 200, 150, ${progress * 0.15}) 0%,
            transparent 30%,
            transparent 70%,
            rgba(200, 220, 255, ${progress * 0.1}) 100%
          )`,
          filter: `blur(${20 - progress * 8}px)`,
          opacity: 0.6 + progress * 0.4,
        }}
      />

      {/* Блики на гранях - симметрично относительно центра */}
      {[
        { left: "48%", top: "25%", height: "25%", delay: 0 },
        { left: "52%", top: "28%", height: "20%", delay: 0.3 },
        { left: "50%", top: "20%", height: "30%", delay: 0.6 },
      ].map((flare, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: flare.left,
            top: flare.top,
            width: "2px",
            height: flare.height,
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              rgba(255, 255, 255, ${progress * 0.6}) 50%,
              transparent 100%
            )`,
            filter: "blur(1px)",
            opacity: 0.4 + progress * 0.6,
            animation: `shimmer ${2.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${flare.delay}s`,
          }}
        />
      ))}
    </>
  )
}

function LightRays({ progress }: { progress: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.25 + progress * 0.5 }}
    >
      {/* Лучи от заката */}
      <div
        className="absolute"
        style={{
          right: "-15%",
          top: "5%",
          width: "70%",
          height: "60%",
          background: `linear-gradient(
            ${-35 + progress * 15}deg,
            transparent 0%,
            rgba(255, 180, 140, 0.1) 30%,
            rgba(255, 150, 100, 0.06) 50%,
            transparent 100%
          )`,
          filter: "blur(50px)",
          transform: `rotate(${progress * 5}deg)`,
        }}
      />
      
      {/* Холодный свет */}
      <div
        className="absolute"
        style={{
          left: "-10%",
          top: "10%",
          width: "50%",
          height: "50%",
          background: `linear-gradient(
            ${35 - progress * 15}deg,
            transparent 0%,
            rgba(140, 170, 220, 0.08) 40%,
            transparent 100%
          )`,
          filter: "blur(40px)",
          transform: `rotate(${-progress * 5}deg)`,
        }}
      />

      {/* Божественные лучи сверху */}
      <div
        className="absolute"
        style={{
          left: "40%",
          top: "-10%",
          width: "20%",
          height: "60%",
          background: `linear-gradient(
            to bottom,
            rgba(255, 255, 255, ${progress * 0.08}) 0%,
            rgba(200, 220, 255, ${progress * 0.04}) 50%,
            transparent 100%
          )`,
          filter: "blur(30px)",
          transform: `scaleY(${1 + progress * 0.5})`,
        }}
      />
    </div>
  )
}

function EnergyParticles({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    interface Particle {
      x: number
      y: number
      size: number
      opacity: number
      hue: number
      angle: number
      radius: number
      orbitSpeed: number
      layer: number
    }

    const particles: Particle[] = []
    const centerX = canvas.width * 0.5
    const centerY = canvas.height * 0.35

    // Больше частиц для глубины
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2
      const layer = Math.floor(Math.random() * 3)
      const radius = 80 + layer * 60 + Math.random() * 80
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * 0.5,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        hue: 190 + Math.random() * 80,
        angle,
        radius,
        orbitSpeed: (Math.random() - 0.5) * 0.008 * (1 + layer * 0.3),
        layer,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentProgress = progressRef.current

      particles.forEach((p) => {
        p.angle += p.orbitSpeed * (1 + currentProgress * 1.5)
        
        const targetRadius = p.radius * (1 - currentProgress * 0.6)
        const layerOffset = p.layer * 20 * currentProgress
        
        p.x = centerX + Math.cos(p.angle) * targetRadius
        p.y = centerY + Math.sin(p.angle) * targetRadius * 0.5 - layerOffset
        
        p.y += Math.sin(p.angle * 3 + Date.now() / 1000) * 8

        const alpha = p.opacity * (0.2 + currentProgress * 0.8) * (1 - p.layer * 0.2)
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5)
        gradient.addColorStop(0, `hsla(${p.hue}, 75%, 75%, ${alpha})`)
        gradient.addColorStop(0.4, `hsla(${p.hue}, 65%, 65%, ${alpha * 0.4})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 55%, 55%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 85%, 85%, ${alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        opacity: 0.3 + progress * 0.7,
        mixBlendMode: "screen",
      }}
    />
  )
}

function SnowParticles({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    interface Snowflake {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      wobble: number
    }

    const snowflakes: Snowflake[] = []
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.5 + 0.15,
        wobble: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentProgress = progressRef.current

      snowflakes.forEach((s) => {
        s.wobble += 0.02
        s.y += s.speedY * (0.4 + currentProgress * 0.8)
        s.x += s.speedX + Math.sin(s.wobble) * 0.4

        if (s.y > canvas.height) {
          s.y = -5
          s.x = Math.random() * canvas.width
        }
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * (0.4 + currentProgress * 0.4)})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

function Navigation({ progress }: { progress: number }) {
  return (
    <header
      className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between p-6 pointer-events-none"
      style={{
        opacity: progress < 0.85 ? 1 : 1 - (progress - 0.85) * 6,
      }}
    >
      <Link
        href="/"
        className="pointer-events-auto flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <Sparkles className="h-8 w-8 text-primary drop-shadow-lg" />
        <span
          className="font-serif text-xl tracking-wide text-white"
          style={{ textShadow: "0 2px 15px rgba(0,0,0,0.9)" }}
        >
          Ora Technology
        </span>
      </Link>

      <Link
        href="/"
        className="pointer-events-auto rounded-full border border-white/10 bg-black/40 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition-all hover:bg-black/60 hover:border-white/20"
      >
        Пропустить
      </Link>
    </header>
  )
}

function MusicButton({ 
  isMuted, 
  onToggle, 
  audioLoaded,
  progress 
}: { 
  isMuted: boolean
  onToggle: () => void
  audioLoaded: boolean
  progress: number
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:bg-black/60 hover:border-white/20 hover:scale-110"
      style={{
        opacity: progress < 0.9 ? 1 : 1 - (progress - 0.9) * 10,
        boxShadow: isMuted ? "none" : "0 0 30px rgba(94,234,212,0.3)",
      }}
      aria-label={isMuted ? "Включить музыку" : "Выключить музыку"}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6 text-white/70" />
      ) : (
        <Volume2 className="h-6 w-6 text-primary animate-pulse" />
      )}
      
      {!audioLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full animate-spin rounded-full border-2 border-transparent border-t-primary/50" />
        </div>
      )}
      
      {!isMuted && (
        <div className="absolute -inset-2 pointer-events-none">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-1 animate-ping rounded-full bg-primary/10" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        </div>
      )}
    </button>
  )
}

function ScrollIndicator({ progress }: { progress: number }) {
  return (
    <div
      className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3 pointer-events-none"
      style={{
        opacity: progress < 0.05 ? 1 : Math.max(0, 1 - progress * 15),
      }}
    >
      <span
        className="text-sm font-medium text-white/70 tracking-wide"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
      >
        Прокрутите вниз
      </span>
      <div className="flex flex-col items-center">
        <ChevronDown className="h-5 w-5 animate-bounce text-white/60" />
        <ChevronDown className="h-5 w-5 -mt-3 animate-bounce text-white/40" style={{ animationDelay: "0.1s" }} />
      </div>
    </div>
  )
}

function FinalCTA({ progress }: { progress: number }) {
  const isVisible = progress > 0.75
  const opacity = isVisible ? (progress - 0.75) * 4 : 0
  const clampedOpacity = Math.min(opacity, 1)

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ opacity: clampedOpacity }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
          opacity: clampedOpacity,
        }}
      />
      
      <div className="relative text-center px-6">
        <h1
          className="font-serif text-4xl font-bold tracking-wider text-white sm:text-5xl lg:text-7xl"
          style={{
            textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 80px rgba(94,234,212,0.3)",
            transform: `translateY(${(1 - clampedOpacity) * 60}px) scale(${0.9 + clampedOpacity * 0.1})`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            letterSpacing: "0.12em",
          }}
        >
          Ora Technology
        </h1>
        <p
          className="mt-6 text-lg text-white/80 sm:text-xl lg:text-2xl font-light"
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            transform: `translateY(${(1 - clampedOpacity) * 50}px)`,
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Откройте врата к древним знаниям
        </p>
        <div
          className="mt-10 pointer-events-auto"
          style={{
            transform: `translateY(${(1 - clampedOpacity) * 40}px)`,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary/80 px-10 py-5 text-lg font-medium text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: "0 0 60px rgba(94,234,212,0.4), 0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <Sparkles className="h-5 w-5" />
            <span>Войти</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 h-[3px] bg-white/5">
      <div
        className="h-full transition-all duration-150"
        style={{ 
          width: `${progress * 100}%`,
          background: "linear-gradient(to right, rgba(94,234,212,0.6), rgba(167,139,250,0.9), rgba(244,114,182,0.7))",
          boxShadow: "0 0 25px rgba(167,139,250,0.6), 0 0 50px rgba(94,234,212,0.3)",
        }}
      />
    </div>
  )
}
