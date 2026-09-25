import { Moon, Sun } from 'lucide-react'
import { cn } from '../utils/cn'
import { useTheme } from '../hooks/useTheme'

export interface ThemeToggleProps {
  storageKey?: string
  className?: string
}

/** Switch claro/escuro. Usar com themeInitScript() no index.html para evitar flash. */
export function ThemeToggle({ storageKey, className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme(storageKey)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className={cn(
        'relative flex h-7 w-12 items-center rounded-full px-1 transition-colors',
        isDark ? 'bg-primary' : 'bg-white/30',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full bg-white text-app-darker shadow transition-transform',
          isDark && 'translate-x-5',
        )}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  )
}
