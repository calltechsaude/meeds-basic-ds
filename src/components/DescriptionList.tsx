import type { ReactNode } from 'react'
import { cn } from '../utils/cn'
import { SectionLabel } from './Card'

export interface InfoRowProps {
  label: ReactNode
  children: ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
}

/** Par rótulo/valor (InfoRow do doctor, DetailRow do web, Row do HistoryModal). */
export function InfoRow({ label, children, direction = 'horizontal', className }: InfoRowProps) {
  if (direction === 'vertical') {
    return (
      <div className={cn('flex flex-col gap-0.5', className)}>
        <SectionLabel>{label}</SectionLabel>
        <span className="text-sm text-app-text">{children}</span>
      </div>
    )
  }
  return (
    <div className={cn('flex items-center justify-between gap-4 py-1.5', className)}>
      <SectionLabel>{label}</SectionLabel>
      <span className="text-right text-sm text-app-text">{children}</span>
    </div>
  )
}
