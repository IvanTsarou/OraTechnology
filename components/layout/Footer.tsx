import { Sparkles } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Политика', href: '#' },
  { label: 'Оферта', href: '#' },
  { label: 'Контакты', href: '#' },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="safe-bottom border-t border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.15)]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-serif text-sm tracking-wide text-foreground">
              Ora Technology
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer links">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-primary active:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground sm:mt-4 sm:text-left">
          &copy; {currentYear} Ora Technology. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
