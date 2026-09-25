import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

export type IconButtonVariant = 'ghost' | 'outline' | 'primary' | 'danger' | 'on-brand'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant
  /** Rótulo acessível obrigatório: botão só de ícone precisa de nome. */
  'aria-label': string
}

const VARIANT: Record<IconButtonVariant, string> = {
  ghost: 'p-1.5 text-app-muted hover:bg-app-bg hover:text-app-text',
  outline:
    'flex h-10 w-10 items-center justify-center border border-app-border bg-app-surface text-app-dark hover:text-primary',
  primary: 'p-2 text-primary hover:bg-primary-hover',
  danger: 'p-2 text-danger hover:bg-danger-soft',
  'on-brand': 'p-2 text-white hover:bg-white/10',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT[variant],
        className,
      )}
      {...rest}
    />
  )
})
