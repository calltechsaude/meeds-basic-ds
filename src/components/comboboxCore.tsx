import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, Search } from 'lucide-react'
import { cn } from '../utils/cn'

/** Opção básica dos comboboxes do DS. */
export interface ComboOption {
  value: string
  label: string
}

/**
 * Núcleo compartilhado de Select e MultiSelect: estado de abertura, âncora do
 * painel-portal, busca, item destacado e navegação por teclado.
 * `onPick` decide se fecha (single) ou não (multi).
 */
export function useCombobox(options: ComboOption[], onPick: (value: string) => void, disabled?: boolean) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const [anchor, setAnchor] = useState<DOMRect | null>(null)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return options
    return options.filter((option) => option.label.toLowerCase().includes(normalized))
  }, [options, query])

  const close = () => setIsOpen(false)

  const open = () => {
    if (disabled) return
    setAnchor(triggerRef.current?.getBoundingClientRect() ?? null)
    setQuery('')
    setHighlight(0)
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      close()
    }
    // Scroll fora do painel (página/modal) fecha p/ não desalinhar; scroll DENTRO
    // da lista de opções é ignorado.
    const handleScroll = (event: Event) => {
      if (panelRef.current?.contains(event.target as Node)) return
      close()
    }
    const handleResize = () => close()

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((current) => Math.min(current + 1, filtered.length - 1))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((current) => Math.max(current - 1, 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const option = filtered[highlight] ?? filtered[0]
      if (option) onPick(option.value)
    }
  }

  return {
    isOpen,
    open,
    close,
    toggleOpen: () => (isOpen ? close() : open()),
    anchor,
    query,
    setQuery,
    highlight,
    setHighlight,
    filtered,
    handleKeyDown,
    triggerRef,
    panelRef,
    inputRef,
  }
}

export type ComboboxState = ReturnType<typeof useCombobox>

export interface ComboboxPanelProps {
  combo: ComboboxState
  searchPlaceholder?: string
  emptyMessage?: string
  multiselectable?: boolean
  isSelected: (value: string) => boolean
  onPick: (value: string) => void
  /** Conteúdo extra antes do label da opção (ex.: bolinha de cor). */
  renderPrefix?: (option: ComboOption) => ReactNode
}

/** Painel-portal com busca e lista de opções, compartilhado por Select e MultiSelect. */
export function ComboboxPanel({
  combo,
  searchPlaceholder = 'Filtrar…',
  emptyMessage = 'Nenhuma opção encontrada.',
  multiselectable,
  isSelected,
  onPick,
  renderPrefix,
}: ComboboxPanelProps) {
  const { isOpen, anchor, panelRef, inputRef, query, setQuery, setHighlight, highlight, filtered, handleKeyDown } = combo
  if (!isOpen || !anchor) return null

  return createPortal(
    <div
      ref={panelRef}
      role="listbox"
      aria-multiselectable={multiselectable || undefined}
      // Painel num portal em document.body (fora do DOM de quem abre). Corta a
      // propagação do pointer-down p/ não disparar o click-outside de um container
      // pai, que fecharia o painel antes do clique chegar na opção.
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      style={{ position: 'fixed', top: anchor.bottom + 4, left: anchor.left, width: anchor.width }}
      className="animate-fade-in z-dropdown flex max-h-72 flex-col overflow-hidden rounded-lg border border-app-border bg-app-surface shadow-xl"
    >
      <div className="border-b border-app-border p-2">
        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-app-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setHighlight(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className="w-full rounded-md border border-app-border bg-app-bg py-2 pl-8 pr-2.5 text-sm text-app-text outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      <div className="ds-no-scrollbar min-h-0 flex-1 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <p className="px-3 py-3 text-sm text-app-muted">{emptyMessage}</p>
        ) : (
          filtered.map((option, index) => {
            const selected = isSelected(option.value)
            return (
              <button
                key={`${option.value}-${index}`}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onPick(option.value)}
                onMouseEnter={() => setHighlight(index)}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                  index === highlight ? 'bg-primary-hover text-primary' : 'text-app-text hover:bg-app-bg',
                  selected && 'font-semibold',
                )}
              >
                {renderPrefix?.(option)}
                <span className="flex-1 truncate">{option.label}</span>
                {selected ? <Check size={14} className="shrink-0 text-primary" /> : null}
              </button>
            )
          })
        )}
      </div>
    </div>,
    document.body,
  )
}

/** Classes do botão-gatilho, compartilhadas pelos dois comboboxes. */
export const COMBOBOX_TRIGGER_CLASS =
  'flex w-full items-center justify-between gap-2 rounded-lg border py-2.5 pl-3.5 pr-3 text-sm outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:bg-app-bg disabled:text-app-muted'
