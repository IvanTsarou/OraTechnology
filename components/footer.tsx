import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-serif text-sm tracking-wide text-foreground">
            Ora Technology
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Ora Technology. Все права защищены.
        </p>
        <nav className="flex gap-4" aria-label="Footer links">
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Политика конфиденциальности
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Оферта
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  )
}
