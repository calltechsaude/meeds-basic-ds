import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../utils/cn'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: ReactNode
  subtitle?: ReactNode
  /** Ícone do header, exibido num quadrado tint da marca. */
  icon?: ReactNode
  size?: ModalSize
  footer?: ReactNode
  closeOnBackdrop?: boolean
  children: ReactNode
  className?: string
}

const SIZE: Record<ModalSize, string> = {
  sm: 'max-w-sm', // 384 — alerts
  md: 'max-w-md', // 448 — forms curtos
  lg: 'max-w-3xl', // 768 — históricos
  xl: 'max-w-5xl', // 1024 — viewers
}

/**
 * Modal único do DS (substitui os 10+ chromes de modal recopiados).
 * Fecha com Esc e clique no backdrop; um único z-index (z-modal).
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  size = 'md',
  footer,
  closeOnBackdrop = true,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="animate-fade-in fixed inset-0 z-modal flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'flex max-h-[92vh] w-full flex-col rounded-2xl bg-app-surface shadow-modal',
          SIZE[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start gap-3 border-b border-app-border px-6 py-4">
          {icon ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </span>
          ) : null}
          <span className="flex-1">
            <h2 className="text-base font-bold text-app-text">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-app-muted">{subtitle}</p> : null}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-1 text-app-muted transition-colors hover:bg-app-bg hover:text-app-text"
          >
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer ? (
          <footer className="flex justify-end gap-2 border-t border-app-border px-6 py-4">{footer}</footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
