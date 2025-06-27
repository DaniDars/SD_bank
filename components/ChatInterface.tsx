"use client"

import { useState, useRef, useEffect } from "react"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import { useLanguage } from "@/contexts/LanguageContext"
import { Bot, AlertTriangle, CheckCircle } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  sources?: string[]
  confidence?: number
  escalate?: boolean
  tool_used?: string
}

export default function ChatInterface() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        language === "pt"
          ? "Olá! Bem-vindo ao SecureBank Moçambique. Como posso ajudá-lo hoje?"
          : "Hello! Welcome to SecureBank Mozambique. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      confidence: 1.0,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "demo_user", // In real app, get from auth
          message: content,
          language,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence,
        escalate: data.escalate,
        tool_used: data.tool_used,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          language === "pt"
            ? "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato com nosso suporte em +258 21 123 4567."
            : "Sorry, an error occurred. Please try again or contact our support at +258 21 123 4567.",
        sender: "bot",
        timestamp: new Date(),
        escalate: true,
        confidence: 0.1,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full shadow-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.chat.title}
            </h1>
            <p className="text-sm text-gray-500">{t.chat.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50 px-6 py-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatBubble message={message} />

              {/* Show additional info for bot messages */}
              {message.sender === "bot" && (message.sources || message.confidence !== undefined) && (
                <div className="mt-2 ml-11 text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    {message.confidence !== undefined && (
                      <div className="flex items-center space-x-1">
                        {message.confidence > 0.7 ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : message.confidence > 0.4 ? (
                          <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                        <span>
                          {language === "pt" ? "Confiança" : "Confidence"}: {Math.round(message.confidence * 100)}%
                        </span>
                      </div>
                    )}

                    {message.sources && message.sources.length > 0 && (
                      <div>
                        {language === "pt" ? "Fontes" : "Sources"}: {message.sources.join(", ")}
                      </div>
                    )}

                    {message.tool_used && (
                      <div>
                        {language === "pt" ? "Ferramenta" : "Tool"}: {message.tool_used}
                      </div>
                    )}
                  </div>

                  {message.escalate && (
                    <div className="mt-1 text-orange-600 font-medium">
                      {language === "pt"
                        ? "⚠️ Esta conversa pode precisar de assistência humana"
                        : "⚠️ This conversation may need human assistance"}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 border border-emerald-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                  <span className="text-sm">{t.chat.typing}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
