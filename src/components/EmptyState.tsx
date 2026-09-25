import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../utils/cn'
import { Button } from './Button'

export interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  tone?: 'neutral' | 'danger'
  className?: string
}

/** Estado vazio (padrão repetido ~40x entre os apps). */
export function EmptyState({ icon, title, description, action, tone = 'neutral', className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg border border-dashed border-app-border bg-app-surface px-4 py-10 text-center',
        className,
      )}
    >
      {icon ? (
        <span
          className={cn(
            'mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-full',
            tone === 'danger' ? 'bg-danger-soft text-danger' : 'bg-primary/10 text-primary',
          )}
        >
          {icon}
        </span>
      ) : null}
      <p className="text-sm font-medium text-app-dark">{title}</p>
      {description ? <p className="text-xs text-app-muted">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}

export interface ErrorStateProps {
  title?: ReactNode
  description?: ReactNode
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

/** Estado de erro com retry (Dashboard/GeneralTab do admin). */
export function ErrorState({
  title = 'Algo deu errado',
  description,
  onRetry,
  retryLabel = 'Tentar de novo',
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-app-border bg-app-surface p-8 text-center',
        className,
      )}
    >
      <AlertTriangle size={28} className="text-danger" />
      <p className="text-sm font-semibold text-app-text">{title}</p>
      {description ? <p className="text-sm text-app-muted">{description}</p> : null}
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  )
}
