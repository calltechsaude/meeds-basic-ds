import type { ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../utils/cn'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  onDismiss?: () => void
  className?: string
}

const TONE: Record<AlertTone, { box: string; Icon: typeof Info }> = {
  info: { box: 'bg-primary/10 text-primary-dark border-primary/20', Icon: Info },
  success: { box: 'bg-success-soft text-success border-success/20', Icon: CheckCircle2 },
  warning: { box: 'bg-warning-soft text-warning-strong border-warning/30', Icon: AlertTriangle },
  danger: { box: 'bg-danger-soft text-danger border-danger/20', Icon: AlertCircle },
}

/** Callout inline (unifica ~20 caixas de erro/aviso copiadas nos apps). */
export function Alert({ tone = 'info', title, children, onDismiss, className }: AlertProps) {
  const { box, Icon } = TONE[tone]
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm', box, className)}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children}
      </div>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} aria-label="Fechar" className="shrink-0 opacity-70 hover:opacity-100">
          <X size={14} />
        </button>
      ) : null}
    </div>
  )
}
