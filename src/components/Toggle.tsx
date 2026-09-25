import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

/** Switch (mesmo Toggle do admin/doctor/web unificado). */
export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  ariaLabel,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center justify-between gap-4',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {(label || description) && (
        <span className="flex flex-col">
          {label ? <span className="text-sm font-medium text-app-text">{label}</span> : null}
          {description ? <span className="text-xs text-app-muted">{description}</span> : null}
        </span>
      )}
      <input
        type="checkbox"
        role="switch"
        aria-label={ariaLabel}
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40',
          "after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:content-['']",
          checked ? 'bg-primary after:translate-x-5' : 'bg-gray-400',
        )}
      />
    </label>
  )
}
