"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import FaqCard from "@/components/FaqCard"
import { useLanguage } from "@/contexts/LanguageContext"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  views: number
}

export default function FaqPage() {
  const { language, t } = useLanguage()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: language === "pt" ? "Todos" : "All" },
    { id: "accounts", label: t.faq.categories.accounts },
    { id: "cards", label: t.faq.categories.cards },
    { id: "loans", label: t.faq.categories.loans },
    { id: "payments", label: t.faq.categories.payments },
    { id: "digital", label: "Digital" },
    { id: "investment", label: language === "pt" ? "Investimentos" : "Investments" },
  ]

  useEffect(() => {
    fetchFAQs()
  }, [language, activeCategory, searchQuery])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        language,
        ...(activeCategory !== "all" && { category: activeCategory }),
        ...(searchQuery && { search: searchQuery }),
      })

      const response = await fetch(`/api/faqs?${params}`)
      const data = await response.json()

      if (response.ok) {
        setFaqs(data.faqs)
      } else {
        console.error("Failed to fetch FAQs:", data.error)
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFAQView = async (faqId: string) => {
    try {
      await fetch(`/api/faqs/${faqId}/view`, { method: "POST" })
    } catch (error) {
      console.error("Failed to increment view count:", error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t.faq.title}
        </h1>
        <p className="text-lg text-gray-600">{t.faq.subtitle}</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t.faq.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 border border-gray-300 hover:border-indigo-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* FAQ Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">{t.common.loading}</p>
          </div>
        ) : faqs.length > 0 ? (
          faqs.map((faq) => <FaqCard key={faq.id} faq={faq} onView={() => handleFAQView(faq.id)} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.faq.noResults}</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {t.faq.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* Contact Support CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg p-6 text-center border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.faq.cantFind.title}</h3>
        <p className="text-gray-600 mb-4">{t.faq.cantFind.description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/chat"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {t.faq.cantFind.startChat}
          </a>
          <a
            href="/support"
            className="bg-white text-purple-600 px-6 py-2 rounded-lg border border-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 transform hover:scale-105"
          >
            {t.faq.cantFind.submitRequest}
          </a>
        </div>
      </div>
    </div>
  )
}
