"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, MessageCircle, HelpCircle, Phone, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"
import { useState } from "react"

export default function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: t.nav.home, icon: Building2 },
    { href: "/chat", label: t.nav.chat, icon: MessageCircle },
    { href: "/faq", label: t.nav.faq, icon: HelpCircle },
    { href: "/support", label: t.nav.support, icon: Phone },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-1.5 sm:p-2 rounded-lg">
              <Building2 className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-sm sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent hidden xs:block">
              Standard Bank
            </span>
            <span className="text-xs sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent xs:hidden">
              SB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-blue-600 p-2 rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Mobile Language Switcher */}
            <div className="px-3 py-3 border-t border-gray-200 mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
