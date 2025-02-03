"use client"
import { Form } from "../components/Form"
import type { FormConfig, FormState } from "../types/formTypes"
import "../styles/styles.css"

const sampleConfig: FormConfig = {
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
    },
    {
      id: "city",
      type: "text",
      label: "City",
      required: true,
    },
    {
      id: "gender",
      type: "select",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      id: "isStudent",
      type: "checkbox",
      label: "Are you a student?",
    },
    {
      id: "studentType",
      type: "radio",
      label: "Student Type",
      options: ["Undergraduate", "Graduate", "PhD"],
      condition: {
        field: "isStudent",
        operator: "==",
        value: true,
      },
    },
  ],
}

export default function Home() {
  const handleSubmit = (formData: FormState) => {
    console.log("Form submitted:", formData)
  }

  return (
    <div className="page-container">
      <h1 className="form-title">Dynamic Form</h1>
      <Form config={sampleConfig} onSubmit={handleSubmit} />
    </div>
  )
}

