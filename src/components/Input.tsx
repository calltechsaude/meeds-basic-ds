import { forwardRef, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { cn } from '../utils/cn'
import { INVALID_CONTROL_CLASS, useFieldContext } from './fieldContext'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const CONTROL_BASE_CLASS =
  'w-full rounded-[10px] border-[1.5px] bg-app-bg px-3.5 py-2.5 text-sm text-app-text outline-none transition-colors placeholder:text-app-muted focus:bg-app-surface disabled:cursor-not-allowed disabled:bg-app-bg disabled:text-app-muted'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref,
) {
  const { isInvalid } = useFieldContext()
  const showInvalid = invalid ?? isInvalid
  return (
    <input
      ref={ref}
      className={cn(
        CONTROL_BASE_CLASS,
        showInvalid ? INVALID_CONTROL_CLASS : 'border-app-border focus:border-primary',
        className,
      )}
      {...rest}
    />
  )
})

/** Input de senha com alternância mostrar/ocultar (duplicado 5x nos apps). */
export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(function PasswordInput(
  { className, ...rest },
  ref,
) {
  const [visible, setVisible] = useState(false)
  return (
    <span className="relative block w-full">
      <Input ref={ref} type={visible ? 'text' : 'password'} className={cn('pr-10', className)} {...rest} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-app-muted hover:text-app-text"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </span>
  )
})

/** Input travado com cadeado (LockedField do doctor/Settings). */
export const LockedInput = forwardRef<HTMLInputElement, InputProps>(function LockedInput(
  { className, ...rest },
  ref,
) {
  return (
    <span className="relative block w-full">
      <Input ref={ref} disabled className={cn('pr-10', className)} {...rest} />
      <Lock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-app-muted" />
    </span>
  )
})

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...rest },
  ref,
) {
  const { isInvalid } = useFieldContext()
  const showInvalid = invalid ?? isInvalid
  return (
    <textarea
      ref={ref}
      className={cn(
        CONTROL_BASE_CLASS,
        'min-h-[96px] resize-y',
        showInvalid ? INVALID_CONTROL_CLASS : 'border-app-border focus:border-primary',
        className,
      )}
      {...rest}
    />
  )
})
