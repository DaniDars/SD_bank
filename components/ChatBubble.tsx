"use client"

import type { Message } from "@/lib/messages"
import { Bot, User } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ChatBubbleProps {
  message: Message
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { language } = useLanguage()
  const isBot = message.sender === "bot"
  const content = typeof message.content === "string" ? message.content : message.content[language]

  return (
    <div className={`flex items-start space-x-3 ${isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-orange-500 to-red-500"
        }`}
      >
        {isBot ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isBot
            ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 border border-emerald-200"
            : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className={`text-xs mt-1 ${isBot ? "text-gray-500" : "text-blue-100"}`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
