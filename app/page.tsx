"use client"
import Link from "next/link"
import { MessageCircle, HelpCircle, Phone, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HomePage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: MessageCircle,
      title: t.landing.startChat.title,
      description: t.landing.startChat.description,
      href: "/chat",
      color: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    {
      icon: HelpCircle,
      title: t.landing.browseFaq.title,
      description: t.landing.browseFaq.description,
      href: "/faq",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
    },
    {
      icon: Phone,
      title: t.landing.contactSupport.title,
      description: t.landing.contactSupport.description,
      href: "/support",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            {t.landing.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            {t.landing.subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <div className="p-6 sm:p-8 text-center">
                  <div
                    className={`inline-flex p-3 sm:p-4 rounded-full ${feature.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700 text-sm sm:text-base">
                    {t.landing.getStarted}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{t.landing.stats.support247}</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              {"<2min"}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{t.landing.stats.avgResponse}</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              98%
            </div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{t.landing.stats.satisfaction}</div>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              50+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{t.landing.stats.faqTopics}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
