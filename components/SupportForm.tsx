"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface FormData {
  fullName: string
  email: string
  category: string
  message: string
}

export default function SupportForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const categories = [
    { value: "", label: t.support.form.selectCategory },
    { value: "account", label: t.support.form.categories.account },
    { value: "card", label: t.support.form.categories.card },
    { value: "login", label: t.support.form.categories.login },
    { value: "other", label: t.support.form.categories.other },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.support.form.validation.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = t.support.form.validation.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.support.form.validation.emailInvalid
    }

    if (!formData.category) {
      newErrors.category = t.support.form.validation.categoryRequired
    }

    if (!formData.message.trim()) {
      newErrors.message = t.support.form.validation.messageRequired
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.support.form.validation.messageMinLength
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      category: "",
      message: "",
    })
    setIsSubmitting(false)

    alert(t.support.form.success)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          {t.support.form.fullName} *
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t.support.form.fullNamePlaceholder}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {t.support.form.email} *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t.support.form.emailPlaceholder}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          {t.support.form.category} *
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {t.support.form.message} *
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t.support.form.messagePlaceholder}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        <p className="mt-1 text-sm text-gray-500">{formData.message.length}/500 characters</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            {t.support.form.submitting}
          </>
        ) : (
          t.support.form.submit
        )}
      </button>
    </form>
  )
}
