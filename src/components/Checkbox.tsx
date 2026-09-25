import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
  className?: string
}

export function Checkbox({ checked, onChange, label, disabled, className }: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-2.5',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40',
          checked ? 'border-primary bg-primary text-white' : 'border-app-border bg-app-surface text-transparent',
        )}
      >
        <Check size={14} strokeWidth={3} />
      </span>
      {label ? <span className="text-sm text-app-text">{label}</span> : null}
    </label>
  )
}
