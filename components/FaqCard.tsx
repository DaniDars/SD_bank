"use client"

import { useState } from "react"
import { ChevronDown, ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface FaqCardProps {
  faq: {
    id: string
    question: string
    answer: string
    category: string
    views: number
  }
  onView?: () => void
}

export default function FaqCard({ faq, onView }: FaqCardProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const handleToggle = () => {
    if (!isOpen && onView) {
      onView()
    }
    setIsOpen(!isOpen)
  }

  const handleFeedback = (type: "up" | "down") => {
    setFeedback(feedback === type ? null : type)
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={handleToggle}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
      >
        <div className="flex-1 pr-3 sm:pr-4 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 leading-tight mb-2">
            {faq.question}
          </h3>
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{faq.category}</span>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{faq.views}</span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform flex-shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{faq.answer}</p>

            {/* Feedback buttons */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600">{t.faq.wasHelpful}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFeedback("up")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                    feedback === "up"
                      ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 shadow-md"
                      : "text-gray-400 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50"
                  }`}
                >
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => handleFeedback("down")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                    feedback === "down"
                      ? "bg-gradient-to-r from-red-100 to-pink-100 text-red-600 shadow-md"
                      : "text-gray-400 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                  }`}
                >
                  <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
