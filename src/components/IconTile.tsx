import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export type IconTileTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral'

export interface IconTileProps {
  children: ReactNode
  size?: number
  tone?: IconTileTone
  shape?: 'square' | 'circle'
  className?: string
}

const TONE: Record<IconTileTone, string> = {
  brand: 'bg-primary/10 text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-app-bg text-app-dark',
}

/** Ícone em quadrado/círculo tint (headers de modal, ActionCards, stats, empty states). */
export function IconTile({ children, size = 40, tone = 'brand', shape = 'square', className }: IconTileProps) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center',
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        TONE[tone],
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}
