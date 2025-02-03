import type React from "react"
import { useState } from "react"
import type { FormConfig, FormField as FormFieldType, FormState } from "../types/formTypes"
import { FormField } from "./FormField"
import { useFormState } from "../hooks/useFormState"

interface FormProps {
  config: FormConfig
  onSubmit: (formData: FormState) => void
}

export const Form: React.FC<FormProps> = ({ config, onSubmit }) => {
  const { state, updateField, resetForm, evaluateCondition } = useFormState()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    config.fields.forEach((field) => {
      if (field.required && !state[field.id]) {
        newErrors[field.id] = "This field is required"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(state)
    }
  }

  const renderField = (field: FormFieldType) => {
    if (field.condition && !evaluateCondition(field.condition)) {
      return null
    }

    return (
      <FormField
        key={field.id}
        {...field}
        value={state[field.id] || ""}
        onChange={(value) => updateField(field.id, value)}
        error={errors[field.id]}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {config.fields.map(renderField)}
      <div className="form-buttons">
        <button type="button" onClick={resetForm} className="form-button form-button-reset">
          Reset
        </button>
        <button type="submit" className="form-button form-button-submit">
          Submit
        </button>
      </div>
    </form>
  )
}

