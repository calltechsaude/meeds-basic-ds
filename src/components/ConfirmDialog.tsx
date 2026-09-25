import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './Button'

export interface ConfirmDialogProps {
  isOpen: boolean
  title: ReactNode
  description?: ReactNode
  confirmLabel?: string
  pendingLabel?: string
  dismissLabel?: string
  destructive?: boolean
  pending?: boolean
  icon?: ReactNode
  onConfirm: () => void
  onDismiss: () => void
}

/** Diálogo de confirmação (substitui window.confirm e os modais de alerta ad-hoc). */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirmar',
  pendingLabel,
  dismissLabel = 'Cancelar',
  destructive = false,
  pending = false,
  icon,
  onConfirm,
  onDismiss,
}: ConfirmDialogProps) {
  const dismissRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    dismissRef.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !pending) onDismiss()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, pending, onDismiss])

  if (!isOpen) return null

  return createPortal(
    <div
      className="animate-fade-in fixed inset-0 z-modal flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={pending ? undefined : onDismiss}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-app-surface p-8 text-center shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={cn(
            'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full',
            destructive ? 'bg-danger-soft text-danger' : 'bg-warning-soft text-warning',
          )}
        >
          {icon ?? <AlertTriangle size={22} />}
        </span>
        <h2 className="text-base font-bold text-app-text">{title}</h2>
        {description ? <p className="mt-2 text-sm text-app-muted">{description}</p> : null}
        <div className="mt-6 flex gap-2">
          <Button
            ref={dismissRef}
            variant="secondary"
            fullWidth
            disabled={pending}
            onClick={onDismiss}
          >
            {dismissLabel}
          </Button>
          <Button
            variant={destructive ? 'danger' : 'primary'}
            fullWidth
            loading={pending}
            onClick={onConfirm}
          >
            {pending && pendingLabel ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
