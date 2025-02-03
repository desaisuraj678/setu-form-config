import { useReducer } from "react"
import type { FormState, FieldCondition } from "../types/formTypes"

type FormAction = { type: "UPDATE_FIELD"; field: string; value: string | number | boolean } | { type: "RESET_FORM" }

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }
    case "RESET_FORM":
      return {}
    default:
      return state
  }
}

export const useFormState = (initialState: FormState = {}) => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const updateField = (field: string, value: string | number | boolean) => {
    dispatch({ type: "UPDATE_FIELD", field, value })
  }

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" })
  }

  const evaluateCondition = (condition: FieldCondition): boolean => {
    const { field, operator, value } = condition
    const fieldValue = state[field]

    switch (operator) {
      case "==":
        return fieldValue === value
      case "!=":
        return fieldValue !== value
      case ">":
        return fieldValue > value
      case "<":
        return fieldValue < value
      case ">=":
        return fieldValue >= value
      case "<=":
        return fieldValue <= value
      default:
        return false
    }
  }

  return { state, updateField, resetForm, evaluateCondition }
}

