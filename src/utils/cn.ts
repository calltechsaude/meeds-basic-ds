import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** clsx + tailwind-merge: classes passadas pelo consumidor vencem as da base. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
