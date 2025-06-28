"use client"

import SupportForm from "@/components/SupportForm"
import { Clock, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SupportPage() {
  const { t } = useLanguage()

  const contactMethods = [
    {
      icon: Phone,
      title: t.support.contact.phone.title,
      description: "+258 21 123 4567",
      availability: t.support.contact.phone.availability,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: t.support.contact.email.title,
      description: "suporte@securebank.co.mz",
      availability: t.support.contact.email.availability,
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Clock,
      title: t.support.contact.chat.title,
      description: "Suporte por mensagem instantânea",
      availability: t.support.contact.chat.availability,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-4">
          {t.support.title}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">{t.support.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Methods */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">{t.support.contact.title}</h2>
          <div className="space-y-3 sm:space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.title}
                  className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`bg-gradient-to-r ${method.color} p-2 rounded-lg shadow-md flex-shrink-0`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{method.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm break-words">{method.description}</p>
                      <p className="text-indigo-600 text-xs sm:text-sm font-medium">{method.availability}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Business Hours */}
          <div className="mt-4 sm:mt-6 bg-gradient-to-r from-gray-50 to-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{t.support.businessHours.title}</h3>
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>{t.support.businessHours.weekdays}</span>
                <span>08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>{t.support.businessHours.saturday}</span>
                <span>08:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>{t.support.businessHours.sunday}</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-gradient-to-r from-white to-orange-50 p-4 sm:p-6 rounded-lg border border-orange-200 shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              {t.support.sendMessage}
            </h2>
            <SupportForm />
          </div>
        </div>
      </div>
    </div>
  )
}
