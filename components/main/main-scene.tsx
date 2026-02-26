"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ChevronDown, ArrowRight, Volume2, VolumeX } from "lucide-react"

export default function MainScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [audioLoaded, setAudioLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Управление громкостью музыки в зависимости от прогресса
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      // Громкость увеличивается к концу
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

  // Плавные easing функции
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
  
  const easedProgress = easeOutCubic(scrollProgress)
  const zoomProgress = easeInOutQuart(scrollProgress)

  // Камера: начинаем издалека снизу, приближаемся к монолиту
  // Scale: 1.0 -> 1.8 (приближение к монолиту)
  const scale = 1 + zoomProgress * 0.8
  
  // Вертикальное движение: снизу вверх к центру (монолиту)
  // objectPosition Y: 80% (низ, горы) -> 35% (центр, монолит)
  const positionY = 75 - easedProgress * 40
  
  // Небольшое горизонтальное смещение для динамики
  const positionX = 50 + Math.sin(easedProgress * Math.PI) * 3

  return (
    <div
      ref={containerRef}
      className={`relative transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Фоновая музыка */}
      <audio
        ref={audioRef}
        src="/audio/ambient-mountains.mp3"
        loop
        preload="auto"
        onCanPlayThrough={() => setAudioLoaded(true)}
      />

      {/* 7 экранов для скролла */}
      <div className="h-[700vh]">
        {/* Фиксированный viewport */}
        <div className="fixed inset-0 overflow-hidden bg-[#0a0c12]">
          
          {/* Градиент неба */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                #1a1e2e ${10 - easedProgress * 10}%,
                #2a3040 ${40 - easedProgress * 20}%,
                #1e2230 ${70 - easedProgress * 10}%,
                #0f1218 100%
              )`,
            }}
          />

          {/* Основное изображение */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${positionX}% ${positionY}%`,
            }}
          >
            <Image
              src="/photo_2.jpg"
              alt="Кристальный монолит в горах"
              fill
              className="object-cover"
              style={{
                objectPosition: `${positionX}% ${positionY}%`,
              }}
              priority
              quality={100}
            />
          </div>

          {/* Свечение монолита - усиливается при приближении */}
          <MonolithGlow progress={easedProgress} />

          {/* Атмосферные лучи света */}
          <LightRays progress={easedProgress} />

          {/* Частицы энергии вокруг монолита */}
          <EnergyParticles progress={scrollProgress} />

          {/* Снежные частицы */}
          <SnowParticles progress={scrollProgress} />

          {/* Туман в долине - рассеивается */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "60%",
              background: `linear-gradient(to top, 
                rgba(15,18,25,0.95) 0%, 
                rgba(20,25,35,0.7) 30%,
                rgba(25,30,45,0.3) 60%,
                transparent 100%
              )`,
              opacity: Math.max(0, 1 - easedProgress * 1.8),
            }}
          />

          {/* Виньетка - фокус на центре */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse at ${positionX}% ${positionY - 10}%, 
                transparent 0%, 
                transparent ${20 + easedProgress * 15}%, 
                rgba(0,0,0,${0.6 - easedProgress * 0.2}) 100%
              )`,
            }}
          />

          {/* Цветовая коррекция - холодные тона */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(100,130,180,0.1) 0%,
                rgba(80,100,140,0.05) 50%,
                rgba(60,80,120,0.1) 100%
              )`,
            }}
          />

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
          <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/5">
            <div
              className="h-full transition-all duration-150"
              style={{ 
                width: `${scrollProgress * 100}%`,
                background: "linear-gradient(to right, rgba(94,234,212,0.5), rgba(167,139,250,0.8), rgba(244,114,182,0.6))",
                boxShadow: "0 0 20px rgba(167,139,250,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function MonolithGlow({ progress }: { progress: number }) {
  return (
    <>
      {/* Основное свечение монолита */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "25%",
          width: "30vw",
          height: "50vh",
          transform: "translateX(-50%)",
          background: `radial-gradient(
            ellipse at center,
            rgba(200,220,255,${0.1 + progress * 0.15}) 0%,
            rgba(150,180,220,${0.05 + progress * 0.1}) 30%,
            transparent 70%
          )`,
          filter: `blur(${30 - progress * 10}px)`,
        }}
      />
      
      {/* Вертикальный луч от монолита */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "0",
          width: "4px",
          height: "40%",
          transform: "translateX(-50%)",
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(200,220,255,${progress * 0.3}) 30%,
            rgba(180,200,240,${progress * 0.2}) 60%,
            transparent 100%
          )`,
          filter: "blur(3px)",
          opacity: progress,
        }}
      />

      {/* Блики на гранях */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "48%",
          top: "20%",
          width: "2px",
          height: "25%",
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255,255,255,${progress * 0.4}) 50%,
            transparent 100%
          )`,
          filter: "blur(1px)",
          opacity: 0.5 + progress * 0.5,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: "52%",
          top: "22%",
          width: "2px",
          height: "20%",
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255,255,255,${progress * 0.3}) 50%,
            transparent 100%
          )`,
          filter: "blur(1px)",
          opacity: 0.3 + progress * 0.5,
        }}
      />
    </>
  )
}

function LightRays({ progress }: { progress: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.3 + progress * 0.4 }}
    >
      {/* Лучи от заката справа */}
      <div
        className="absolute"
        style={{
          right: "-10%",
          top: "10%",
          width: "60%",
          height: "50%",
          background: `linear-gradient(
            ${-30 + progress * 10}deg,
            transparent 0%,
            rgba(255,180,150,0.08) 40%,
            rgba(255,150,120,0.04) 60%,
            transparent 100%
          )`,
          filter: "blur(40px)",
        }}
      />
      
      {/* Холодный свет слева */}
      <div
        className="absolute"
        style={{
          left: "-5%",
          top: "15%",
          width: "40%",
          height: "40%",
          background: `linear-gradient(
            ${30 - progress * 10}deg,
            transparent 0%,
            rgba(150,180,220,0.06) 50%,
            transparent 100%
          )`,
          filter: "blur(30px)",
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
      targetX: number
      targetY: number
      size: number
      speed: number
      opacity: number
      hue: number
      angle: number
      radius: number
      orbitSpeed: number
    }

    const particles: Particle[] = []
    const centerX = canvas.width * 0.5
    const centerY = canvas.height * 0.35

    // Частицы, орбитирующие вокруг монолита
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 100 + Math.random() * 150
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * 0.6,
        targetX: centerX,
        targetY: centerY,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        hue: 200 + Math.random() * 60, // Голубой-фиолетовый
        angle,
        radius,
        orbitSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentProgress = progressRef.current

      particles.forEach((p) => {
        // Орбитальное движение
        p.angle += p.orbitSpeed * (1 + currentProgress)
        
        // Радиус уменьшается при приближении к монолиту
        const targetRadius = p.radius * (1 - currentProgress * 0.5)
        
        p.x = centerX + Math.cos(p.angle) * targetRadius
        p.y = centerY + Math.sin(p.angle) * targetRadius * 0.6
        
        // Вертикальное смещение
        p.y += Math.sin(p.angle * 3) * 10

        const alpha = p.opacity * (0.3 + currentProgress * 0.7)
        
        // Свечение
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 70%, ${alpha})`)
        gradient.addColorStop(0.5, `hsla(${p.hue}, 60%, 60%, ${alpha * 0.3})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 50%, 50%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Ядро частицы
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha})`
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
        opacity: 0.4 + progress * 0.6,
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
    }

    const snowflakes: Snowflake[] = []
    for (let i = 0; i < 80; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentProgress = progressRef.current

      snowflakes.forEach((s) => {
        s.y += s.speedY * (0.5 + currentProgress)
        s.x += s.speedX + Math.sin(s.y * 0.01) * 0.3

        if (s.y > canvas.height) {
          s.y = -5
          s.x = Math.random() * canvas.width
        }
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity * (0.5 + currentProgress * 0.3)})`
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
      style={{ opacity: 0.6 }}
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
      
      {/* Индикатор загрузки аудио */}
      {!audioLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full animate-spin rounded-full border-2 border-transparent border-t-primary/50" />
        </div>
      )}
      
      {/* Визуализация звуковых волн когда играет */}
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
        opacity: progress < 0.08 ? 1 : Math.max(0, 1 - progress * 10),
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
      {/* Затемнение фона для читаемости */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
          opacity: clampedOpacity,
        }}
      />
      
      <div className="relative text-center px-6">
        <h1
          className="font-serif text-4xl font-bold tracking-wider text-white sm:text-5xl lg:text-7xl"
          style={{
            textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 80px rgba(94,234,212,0.3)",
            transform: `translateY(${(1 - clampedOpacity) * 50}px)`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            letterSpacing: "0.1em",
          }}
        >
          Ora Technology
        </h1>
        <p
          className="mt-6 text-lg text-white/80 sm:text-xl lg:text-2xl font-light"
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            transform: `translateY(${(1 - clampedOpacity) * 40}px)`,
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Откройте врата к древним знаниям
        </p>
        <div
          className="mt-10 pointer-events-auto"
          style={{
            transform: `translateY(${(1 - clampedOpacity) * 30}px)`,
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
