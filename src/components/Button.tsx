import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../utils/cn'

export type ButtonVariant =
  | 'primary' // sólido na cor da marca (o botão flat copiado nos 3 apps)
  | 'gradient' // gradiente + glow (Button original do admin)
  | 'secondary' // outline neutro
  | 'danger' // sólido vermelho
  | 'danger-outline'
  | 'ghost'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark disabled:bg-primary/40 disabled:hover:bg-primary/40',
  gradient:
    'bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-glow-primary hover:shadow-glow-primary-lg hover:brightness-105 disabled:opacity-50 disabled:shadow-none',
  secondary:
    'border border-app-border bg-app-surface text-app-text hover:bg-primary-hover disabled:opacity-50',
  danger: 'bg-danger text-white hover:bg-danger-dark disabled:opacity-50',
  'danger-outline':
    'border border-danger/30 bg-app-surface text-danger hover:bg-danger-soft disabled:opacity-50',
  ghost: 'bg-transparent text-app-muted hover:bg-app-bg hover:text-app-text disabled:opacity-50',
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-[15px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:cursor-not-allowed',
        VARIANT[variant],
        SIZE[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
})
