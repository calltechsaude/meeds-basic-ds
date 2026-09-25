import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange, className, placeholder = 'Buscar…', ...rest }: SearchInputProps) {
  return (
    <span className={cn('relative block', className)}>
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-app-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-app-border bg-transparent py-2.5 pl-9 pr-3.5 text-sm text-app-text outline-none transition-colors placeholder:text-app-muted focus:border-primary focus:bg-app-surface"
        {...rest}
      />
    </span>
  )
}
