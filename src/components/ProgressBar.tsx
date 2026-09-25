import { cn } from '../utils/cn'

export interface ProgressBarProps {
  /** 0 a 100 */
  value: number
  tone?: 'auto' | 'brand' | 'success' | 'warning' | 'danger'
  className?: string
}

/** Barra de progresso. tone="auto": vermelho <40, laranja <70, verde >=70. */
export function ProgressBar({ value, tone = 'brand', className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const autoTone = clamped < 40 ? 'bg-danger' : clamped < 70 ? 'bg-warning' : 'bg-success'
  const fill: Record<string, string> = {
    auto: autoTone,
    brand: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-app-bg', className)}
    >
      <div className={cn('h-full rounded-full transition-all', fill[tone])} style={{ width: `${clamped}%` }} />
    </div>
  )
}
