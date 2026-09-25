import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  className?: string
}

/** Cabeçalho de página único (os apps tinham 3 estilos diferentes). */
export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex items-center justify-between gap-4', className)}>
      <div>
        <h1 className="text-xl font-bold text-app-text">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-app-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  )
}

/** Container de conteúdo de página com largura máxima padrão. */
export function PageContainer({
  className,
  wide = false,
  children,
}: {
  className?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={cn('mx-auto flex w-full flex-col gap-6', wide ? 'max-w-6xl' : 'max-w-5xl', className)}>
      {children}
    </div>
  )
}
