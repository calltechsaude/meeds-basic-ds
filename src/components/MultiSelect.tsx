import { useMemo } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '../utils/cn'
import { INVALID_CONTROL_CLASS, useFieldContext } from './fieldContext'
import {
  ComboboxPanel,
  COMBOBOX_TRIGGER_CLASS,
  useCombobox,
  type ComboOption,
} from './comboboxCore'

export type MultiSelectOption = ComboOption

export interface MultiSelectProps {
  options: MultiSelectOption[]
  /** Valores selecionados. Muda o conjunto inteiro (imutável) a cada toggle/remoção. */
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  /** Classe de largura/layout — aplicada ao container. */
  className?: string
  /** Fora de um <Field>; dentro dele o estado vem do próprio Field. */
  invalid?: boolean
}

/**
 * Combobox de múltipla seleção: mesmo núcleo do Select, mas escolher não fecha o
 * painel e cada item vira um chip com "X" para remover.
 */
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Selecionar…',
  searchPlaceholder = 'Filtrar…',
  disabled,
  className,
  invalid,
}: MultiSelectProps) {
  const field = useFieldContext()
  const isInvalid = invalid ?? field.isInvalid

  const selectedSet = useMemo(() => new Set(value), [value])
  const selectedOptions = useMemo(
    () => options.filter((option) => selectedSet.has(option.value)),
    [options, selectedSet],
  )

  const toggle = (optionValue: string) => {
    if (selectedSet.has(optionValue)) {
      onChange(value.filter((item) => item !== optionValue))
      return
    }
    onChange([...value, optionValue])
  }

  const combo = useCombobox(options, toggle, disabled)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
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
          'bg-app-surface',
          isInvalid ? INVALID_CONTROL_CLASS : 'border-app-border focus:border-primary focus:ring-primary/20',
          selectedOptions.length > 0 ? 'text-app-text' : 'text-app-muted',
          !disabled && 'cursor-pointer',
        )}
      >
        <span className="truncate">
          {selectedOptions.length > 0 ? `${selectedOptions.length} selecionada(s)` : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn('shrink-0 text-app-muted transition-transform', combo.isOpen && 'rotate-180')}
        />
      </button>

      {selectedOptions.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded-full bg-primary-hover py-1 pl-2.5 pr-1 text-xs font-medium text-primary"
            >
              <span className="truncate">{option.label}</span>
              <button
                type="button"
                onClick={() => toggle(option.value)}
                disabled={disabled}
                aria-label={`Remover ${option.label}`}
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/20 hover:text-primary disabled:cursor-not-allowed"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <ComboboxPanel
        combo={combo}
        searchPlaceholder={searchPlaceholder}
        multiselectable
        isSelected={(v) => selectedSet.has(v)}
        onPick={toggle}
      />
    </div>
  )
}
