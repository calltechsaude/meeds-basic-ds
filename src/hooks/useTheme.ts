import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const DEFAULT_STORAGE_KEY = 'meeds-theme'

function readStoredTheme(storageKey: string): Theme {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage indisponível */
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

/** Controla a classe `.dark` no <html> e persiste no localStorage. */
export function useTheme(storageKey: string = DEFAULT_STORAGE_KEY) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme(storageKey))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(storageKey, theme)
    } catch {
      /* ignore */
    }
  }, [theme, storageKey])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}

/** Script anti-FOUC: colocar inline no <head> do index.html do app. */
export function themeInitScript(storageKey: string = DEFAULT_STORAGE_KEY): string {
  return `(function(){try{var t=localStorage.getItem('${storageKey}');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`
}
