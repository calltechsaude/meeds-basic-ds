/**
 * Multi-tenant: aplica a cor da marca em runtime sobrescrevendo as CSS vars
 * que o preset consome. Aceita hex (#00c7d2).
 */
export function applyBrand(hex: string, root: HTMLElement = document.documentElement) {
  const rgb = hexToRgbTriplet(hex)
  if (!rgb) return
  root.style.setProperty('--ds-primary', rgb)
  root.style.setProperty('--ds-primary-light', lighten(rgb, 0.12))
  root.style.setProperty('--ds-primary-dark', darken(rgb, 0.3))
  root.style.setProperty('--ds-primary-hover', mixWithWhite(rgb, 0.94))
}

function hexToRgbTriplet(hex: string): string | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return null
  const n = parseInt(m[1], 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

function map(triplet: string, fn: (c: number) => number): string {
  return triplet
    .split(' ')
    .map((c) => Math.round(Math.min(255, Math.max(0, fn(Number(c))))))
    .join(' ')
}

const lighten = (t: string, amount: number) => map(t, (c) => c + (255 - c) * amount)
const darken = (t: string, amount: number) => map(t, (c) => c * (1 - amount))
const mixWithWhite = (t: string, whiteRatio: number) =>
  map(t, (c) => c * (1 - whiteRatio) + 255 * whiteRatio)
