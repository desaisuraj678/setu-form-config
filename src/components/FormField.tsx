import type React from "react"
import type { FormField as FormFieldType } from "../types/formTypes"

interface FormFieldProps extends FormFieldType {
  value: string | number | boolean
  onChange: (value: string | number | boolean) => void
  error?: string
}

export const FormField: React.FC<FormFieldProps> = ({ id, type, label, options, required, value, onChange, error }) => {
  const renderField = () => {
    switch (type) {
      case "text":
      case "number":
        return (
          <input
            id={id}
            type={type}
            value={value as string | number}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="form-input"
          />
        )
      case "select":
        return (
          <select
            id={id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="form-select"
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case "checkbox":
        return (
          <div className="form-checkbox-wrapper">
            <input
              id={id}
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              required={required}
              className="form-checkbox"
            />
            <label htmlFor={id} className="form-checkbox-label">
              {label}
            </label>
          </div>
        )
      case "radio":
        return (
          <div className="form-radio-group">
            {options?.map((option) => (
              <div key={option} className="form-radio-option">
                <input
                  id={`${id}-${option}`}
                  type="radio"
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(option)}
                  required={required}
                  className="form-radio"
                />
                <label htmlFor={`${id}-${option}`} className="form-radio-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="form-field">
      {type !== "checkbox" && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      {renderField()}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

