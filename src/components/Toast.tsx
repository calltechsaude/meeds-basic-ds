import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../utils/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: number
  type: ToastType
  title: string
  description?: string
}

interface ToastApi {
  show: (type: ToastType, title: string, description?: string) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastApi | null>(null)

const MAX_VISIBLE = 4
const AUTO_DISMISS_MS = 4000

const TONE: Record<ToastType, { icon: typeof Info; box: string }> = {
  success: { icon: CheckCircle2, box: 'bg-success-soft text-success' },
  error: { icon: AlertCircle, box: 'bg-danger-soft text-danger' },
  warning: { icon: AlertTriangle, box: 'bg-warning-soft text-warning-strong' },
  info: { icon: Info, box: 'bg-primary/10 text-primary' },
}

/**
 * Provider de toasts desacoplado de store. Uso:
 *   const toast = useToast()
 *   toast.success('Salvo!')
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id))
  }, [])

  const show = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = nextId.current++
      setItems((list) => [...list.slice(-(MAX_VISIBLE - 1)), { id, type, title, description }])
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
    },
    [dismiss],
  )

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (t, d) => show('success', t, d),
      error: (t, d) => show('error', t, d),
      warning: (t, d) => show('warning', t, d),
      info: (t, d) => show('info', t, d),
    }),
    [show],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div className="fixed right-4 top-4 z-toast flex flex-col gap-2">
          {items.map((item) => {
            const { icon: Icon, box } = TONE[item.type]
            return (
              <div
                key={item.id}
                role="status"
                className="animate-slide-in flex w-80 items-start gap-3 rounded-lg border border-app-border bg-app-surface px-4 py-3 shadow-xl"
              >
                <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', box)}>
                  <Icon size={16} />
                </span>
                <span className="flex-1 pt-0.5">
                  <p className="text-sm font-semibold text-app-text">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-xs text-app-muted">{item.description}</p>
                  ) : null}
                </span>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  aria-label="Fechar"
                  className="shrink-0 text-app-muted hover:text-app-text"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast precisa estar dentro de <ToastProvider>')
  return ctx
}
