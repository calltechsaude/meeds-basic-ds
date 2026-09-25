import type { ReactNode } from 'react'
import { cn } from '../utils/cn'
import { CountBadge } from './Badge'

export interface TabItem<K extends string = string> {
  key: K
  label: ReactNode
  icon?: ReactNode
  count?: number
  disabled?: boolean
}

export interface TabsProps<K extends string = string> {
  items: TabItem<K>[]
  value: K
  onChange: (key: K) => void
  variant?: 'underline' | 'pill'
  className?: string
}

/**
 * Abas. `underline` = sublinhado na cor da marca (Dashboard, HistoryModal).
 * `pill` = segmentado em pills (QueueTabs, filtros de período).
 */
export function Tabs<K extends string = string>({
  items,
  value,
  onChange,
  variant = 'underline',
  className,
}: TabsProps<K>) {
  if (variant === 'pill') {
    return (
      <div role="tablist" className={cn('flex items-center gap-1 rounded-xl bg-app-bg p-1', className)}>
        {items.map((item) => (
          <TabButton key={item.key} item={item} active={item.key === value} onChange={onChange} className={cn(
            'rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors',
            item.key === value ? 'bg-primary text-white shadow-sm' : 'text-app-muted hover:text-app-text',
          )} />
        ))}
      </div>
    )
  }
  return (
    <div role="tablist" className={cn('flex items-center gap-1 border-b border-app-border', className)}>
      {items.map((item) => (
        <TabButton key={item.key} item={item} active={item.key === value} onChange={onChange} className={cn(
          '-mb-px flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors',
          item.key === value
            ? 'border-primary text-primary'
            : 'border-transparent text-app-muted hover:text-app-text',
        )} />
      ))}
    </div>
  )
}

function TabButton<K extends string>({
  item,
  active,
  onChange,
  className,
}: {
  item: TabItem<K>
  active: boolean
  onChange: (key: K) => void
  className: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={item.disabled}
      onClick={() => onChange(item.key)}
      className={cn(className, item.disabled && 'cursor-not-allowed opacity-50')}
    >
      {item.icon}
      {item.label}
      {typeof item.count === 'number' ? <CountBadge count={item.count} /> : null}
    </button>
  )
}
