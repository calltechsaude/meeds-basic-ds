import type { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

/**
 * Padrão "tabela em linhas-card" (listStyles.ts do admin).
 * ListHeader = linha de cabeçalho; ListItem = card por linha.
 */
export function ListHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-app-muted',
        className,
      )}
      {...rest}
    />
  )
}

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function ListItem({ interactive, className, ...rest }: ListItemProps) {
  return (
    <div
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        'overflow-hidden rounded-lg border border-app-border bg-app-surface',
        interactive &&
          'cursor-pointer outline-none transition-colors hover:bg-app-bg focus-visible:bg-app-bg',
        className,
      )}
      {...rest}
    />
  )
}
