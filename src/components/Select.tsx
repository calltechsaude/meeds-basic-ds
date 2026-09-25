import {
  Children,
  isValidElement,
  useMemo,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../utils/cn'
import { INVALID_CONTROL_CLASS, useFieldContext } from './fieldContext'
import {
  ComboboxPanel,
  COMBOBOX_TRIGGER_CLASS,
  useCombobox,
  type ComboOption,
} from './comboboxCore'

// `default`: fundo de superfície (forms). `filter`: transparente, combina com o
// SearchInput ao lado nos filtros de lista.
export type SelectVariant = 'default' | 'filter'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectVariant
  searchPlaceholder?: string
  /** Classe de largura/layout — aplicada ao container (o controle preenche 100%). */
  className?: string
  /** Mapa value → cor hex. Quando presente, exibe bolinha colorida antes de cada label. */
  optionColors?: Record<string, string>
  /** Fora de um <Field>; dentro dele o estado vem do próprio Field. */
  invalid?: boolean
}

const VARIANT_BG: Record<SelectVariant, string> = {
  default: 'bg-app-surface',
  filter: 'bg-transparent',
}

const FALLBACK_DOT_COLOR = '#6b7280'

// Lê os <option> filhos (mantém a API de <select>) → lista {value, label}.
function extractOptions(children: ReactNode): ComboOption[] {
  const items: ComboOption[] = []
  Children.toArray(children).forEach((child) => {
    if (!isValidElement(child) || child.type !== 'option') return
    const { value, children: label } = child.props as { value?: string | number; children?: ReactNode }
    items.push({ value: String(value ?? ''), label: typeof label === 'string' ? label : String(label ?? '') })
  })
  return items
}

/**
 * Combobox com busca mantendo a API de <select> (value/onChange/<option>).
 * Painel em portal com navegação por teclado (↑↓/Enter/Esc).
 */
export function Select({
  className,
  children,
  variant = 'default',
  value,
  onChange,
  disabled,
  searchPlaceholder = 'Filtrar…',
  optionColors,
  invalid,
}: SelectProps) {
  const field = useFieldContext()
  const isInvalid = invalid ?? field.isInvalid
  const options = useMemo(() => extractOptions(children), [children])

  const currentValue = value != null ? String(value) : ''
  const selected = options.find((option) => option.value === currentValue)
  const display = selected?.label ?? options[0]?.label ?? 'Selecionar'

  const choose = (optionValue: string) => {
    // Sintetiza um change-event p/ manter compatível quem lê event.target.value.
    onChange?.({ target: { value: optionValue } } as unknown as ChangeEvent<HTMLSelectElement>)
    combo.close()
  }

  const combo = useCombobox(options, choose, disabled)

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        ref={combo.triggerRef}
        disabled={disabled}
        onClick={combo.toggleOpen}
        role="combobox"
        aria-expanded={combo.isOpen}
        aria-haspopup="listbox"
        aria-invalid={isInvalid ? 'true' : undefined}
        className={cn(
          COMBOBOX_TRIGGER_CLASS,
          isInvalid ? INVALID_CONTROL_CLASS : 'border-app-border focus:border-primary focus:ring-primary/20',
          VARIANT_BG[variant],
          selected ? 'text-app-text' : 'text-app-muted',
          !disabled && 'cursor-pointer',
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          {optionColors && selected ? (
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: optionColors[selected.value] ?? FALLBACK_DOT_COLOR }}
            />
          ) : null}
          <span className="truncate">{display}</span>
        </span>
        <ChevronDown
          size={16}
          className={cn('shrink-0 text-app-muted transition-transform', combo.isOpen && 'rotate-180')}
        />
      </button>

      <ComboboxPanel
        combo={combo}
        searchPlaceholder={searchPlaceholder}
        isSelected={(v) => v === currentValue}
        onPick={choose}
        renderPrefix={
          optionColors
            ? (option) => (
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: optionColors[option.value] ?? FALLBACK_DOT_COLOR }}
                />
              )
            : undefined
        }
      />
    </div>
  )
}
