import type { CSSProperties } from 'react'

/** Cor determinística para rótulos livres (tags de organização, etc). */
export function hashColorStyle(text: string): CSSProperties {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0
  }
  const hue = Math.abs(hash) % 360
  return {
    color: `hsl(${hue} 65% 45%)`,
    backgroundColor: `hsl(${hue} 70% 50% / 0.16)`,
  }
}
