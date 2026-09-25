import { cn } from '../utils/cn'
import { initialsOf } from '../utils/initials'

export type AvatarVariant = 'soft' | 'solid' | 'on-brand'

export interface AvatarProps {
  name: string
  size?: number
  variant?: AvatarVariant
  className?: string
}

const VARIANT: Record<AvatarVariant, string> = {
  soft: 'bg-primary/15 text-primary',
  solid: 'bg-primary text-white',
  'on-brand': 'bg-white/20 text-white',
}

/** Avatar de iniciais (padrão repetido em Sidebar, Topbar, filas e histórico). */
export function Avatar({ name, size = 40, variant = 'soft', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'flex shrink-0 select-none items-center justify-center rounded-full font-bold',
        VARIANT[variant],
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.max(11, Math.round(size * 0.34)) }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  )
}
