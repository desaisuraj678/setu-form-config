export type FieldType = "text" | "number" | "select" | "checkbox" | "radio"

export interface FieldCondition {
  field: string
  operator: "==" | "!=" | ">" | "<" | ">=" | "<="
  value: string | number | boolean
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  options?: string[]
  required?: boolean
  condition?: FieldCondition
}

export interface FormConfig {
  fields: FormField[]
}

export interface FormState {
  [key: string]: string | number | boolean
}

