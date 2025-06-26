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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
            {t.landing.title}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">{t.landing.subtitle}</p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                    {t.landing.getStarted}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-600">{t.landing.stats.support247}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              {"<2min"}
            </div>
            <div className="text-gray-600">{t.landing.stats.avgResponse}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-gray-600">{t.landing.stats.satisfaction}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-gray-600">{t.landing.stats.faqTopics}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
