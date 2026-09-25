import type { FormHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

/** <form noValidate> com layout em coluna; validação fica por conta do app. */
export function Form({ className, ...rest }: FormHTMLAttributes<HTMLFormElement>) {
  return <form noValidate className={cn('flex flex-col gap-4', className)} {...rest} />
}
