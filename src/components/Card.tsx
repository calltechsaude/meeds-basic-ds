import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const PADDING = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' }

/** Superfície padrão: bg-app-surface + borda. Convenção de raio: 2xl para cards. */
export function Card({ padding = 'md', className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-app-border bg-app-surface',
        PADDING[padding],
        className,
      )}
      {...rest}
    />
  )
}

export interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode
  icon?: ReactNode
  actions?: ReactNode
}

/** Card de seção com header (ícone + título + ações), padrão de Settings/forms. */
export function SectionCard({ title, icon, actions, className, children, ...rest }: SectionCardProps) {
  return (
    <section
      className={cn('rounded-2xl border border-app-border bg-app-surface p-6', className)}
      {...rest}
    >
      <header className="mb-4 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          {icon ? <span className="text-primary">{icon}</span> : null}
          <h2 className="text-sm font-semibold text-app-text">{title}</h2>
        </span>
        {actions}
      </header>
      {children}
    </section>
  )
}

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
}

/** Tile de KPI (duplicado em Dashboard e GeneralTab do admin). */
export function KpiCard({ label, value, hint, className, ...rest }: KpiCardProps) {
  return (
    <div
      className={cn('flex flex-col gap-1 rounded-2xl border border-app-border bg-app-surface p-4', className)}
      {...rest}
    >
      <SectionLabel>{label}</SectionLabel>
      <span className="text-3xl font-extrabold leading-none text-app-text">{value}</span>
      {hint ? <span className="text-xs text-app-muted">{hint}</span> : null}
    </div>
  )
}

/** Label "eyebrow" uppercase (usada em KPIs, tabelas e listas). */
export function SectionLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn('text-[11px] font-semibold uppercase tracking-wide text-app-muted', className)}>
      {children}
    </span>
  )
}
