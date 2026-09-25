import type { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '../utils/cn'
import { FieldContext } from './fieldContext'

export interface FieldProps {
  label: ReactNode
  hint?: ReactNode
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

/** Label + controle + hint/erro. Propaga isInvalid ao controle via contexto. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const isInvalid = Boolean(error)
  return (
    <FieldContext.Provider value={{ isInvalid }}>
      <label className={cn('flex flex-col gap-1.5', className)}>
        <span
          className={cn(
            'text-[13px] font-semibold',
            isInvalid ? 'text-danger' : 'text-app-dark',
          )}
        >
          {label}
          {optional && (
            <span className="ml-1.5 text-[11px] font-medium text-app-muted">opcional</span>
          )}
        </span>
        {children}
        {error ? <FieldError message={error} /> : null}
        {!error && hint ? <span className="text-xs text-app-muted">{hint}</span> : null}
      </label>
    </FieldContext.Provider>
  )
}

export function FieldError({ message, className }: { message?: string; className?: string }) {
  if (!message) return null
  return (
    <span
      role="alert"
      className={cn('flex items-center gap-1 text-xs font-medium text-danger', className)}
    >
      <AlertCircle size={12} />
      {message}
    </span>
  )
}
