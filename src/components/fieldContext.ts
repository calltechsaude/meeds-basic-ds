import { createContext, useContext } from 'react'

export interface FieldContextValue {
  isInvalid: boolean
}

export const FieldContext = createContext<FieldContextValue>({ isInvalid: false })

export function useFieldContext() {
  return useContext(FieldContext)
}

/** Classes aplicadas a controles quando o Field tem erro. */
export const INVALID_CONTROL_CLASS =
  'border-danger focus:border-danger focus:ring-danger/20'
