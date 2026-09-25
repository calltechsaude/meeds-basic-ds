import type { CSSProperties } from 'react'
import { cn } from '../utils/cn'

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  radius?: number | string
  className?: string
  style?: CSSProperties
}

export function Skeleton({ width, height = 14, radius = 8, className, style }: SkeletonProps) {
  return (
    <span
      className={cn('block animate-pulse bg-app-border', className)}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  )
}
