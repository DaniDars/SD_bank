"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600 flex-shrink-0" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "pt" | "en")}
        className="bg-transparent border-none text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md px-2 py-1 cursor-pointer"
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}
