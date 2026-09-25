import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import { hashColorStyle } from '../utils/hashColor'

export type BadgeTone =
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'muted'
  | 'hash'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  size?: 'xs' | 'sm'
  /** Obrigatório quando tone="hash": texto que determina a cor. */
  hashKey?: string
}

const TONE: Record<Exclude<BadgeTone, 'hash'>, string> = {
  brand: 'bg-primary/10 text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning-strong',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-app-bg text-app-dark',
  muted: 'bg-app-bg text-app-muted',
}

export function Badge({
  tone = 'neutral',
  size = 'sm',
  hashKey,
  className,
  style,
  children,
  ...rest
}: BadgeProps) {
  const hashStyle: CSSProperties | undefined =
    tone === 'hash' && hashKey ? hashColorStyle(hashKey) : undefined
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        size === 'xs' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-0.5 text-[11px]',
        tone !== 'hash' && TONE[tone],
        className,
      )}
      style={hashStyle ? { ...hashStyle, ...style } : style}
      {...rest}
    >
      {children}
    </span>
  )
}

/** Contador circular (notificações, contagem de fila). */
export function CountBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null
  return (
    <span
      className={cn(
        'inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-2xs font-bold text-white',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}

/** Ponto de status, com pulso opcional. */
export function StatusDot({
  tone = 'success',
  pulse = false,
  className,
}: {
  tone?: 'success' | 'warning' | 'danger' | 'neutral' | 'brand'
  pulse?: boolean
  className?: string
}) {
  const color: Record<string, string> = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    neutral: 'bg-app-muted',
    brand: 'bg-primary',
  }
  return (
    <span
      className={cn(
        'inline-block h-2 w-2 shrink-0 rounded-full',
        color[tone],
        pulse && 'animate-pulse-dot',
        className,
      )}
    />
  )
}
