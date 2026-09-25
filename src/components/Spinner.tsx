import { Loader2 } from 'lucide-react'
import { cn } from '../utils/cn'

export interface SpinnerProps {
  size?: number
  className?: string
}

/** Spinner único do DS (substitui spans com border animada e RefreshCw girando). */
export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn('animate-spin text-primary', className)}
      aria-label="Carregando"
    />
  )
}

/** Spinner centralizado para áreas de loading de página/lista. */
export function CenteredSpinner({ size = 28, className }: SpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <Spinner size={size} />
    </div>
  )
}
