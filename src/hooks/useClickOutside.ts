import { useEffect, type RefObject } from 'react'

/** Chama handler ao clicar fora do elemento referenciado. */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return
    function onPointerDown(event: PointerEvent) {
      const el = ref.current
      if (el && !el.contains(event.target as Node)) handler()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [ref, handler, enabled])
}
