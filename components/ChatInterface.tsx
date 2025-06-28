"use client"

import { useState, useRef, useEffect } from "react"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import { useLanguage } from "@/contexts/LanguageContext"
import { Bot, Zap, CheckCircle, AlertCircle } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  escalate?: boolean
  confidence?: number
}

interface AIStatus {
  status: "active" | "degraded" | "error"
  model?: string
  confidence?: number
}

export default function ChatInterface() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        language === "pt"
          ? "Olá! Sou o assistente virtual do Standard Bank Moçambique com IA avançada. Como posso ajudá-lo hoje? Posso ajudar com contas, cartões, empréstimos, transferências e muito mais!"
          : "Hello! I'm the Standard Bank Mozambique virtual assistant with advanced AI. How can I help you today? I can assist with accounts, cards, loans, transfers and much more!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState<AIStatus>({ status: "active" })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check AI status on component mount
  useEffect(() => {
    checkAIStatus()
  }, [])

  const checkAIStatus = async () => {
    try {
      const response = await fetch("/api/chat")
      const data = await response.json()
      setAiStatus({
        status: data.ai_status === "fully_operational" ? "active" : "degraded",
        model: data.model,
      })
    } catch (error) {
      setAiStatus({ status: "error" })
    }
  }

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        content:
          language === "pt"
            ? "Olá! Sou o assistente virtual do Standard Bank Moçambique com IA avançada. Como posso ajudá-lo hoje? Posso ajudar com contas, cartões, empréstimos, transferências e muito mais!"
            : "Hello! I'm the Standard Bank Mozambique virtual assistant with advanced AI. How can I help you today? I can assist with accounts, cards, loans, transfers and much more!",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [language])

  const handleSendMessage = async (content: string) => {
    console.log("🚀 Sending message to Enhanced AI:", content)
    console.log("🌍 Language:", language)

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      console.log("🤖 Making API call to Enhanced Groq Llama-4 Scout...")

      const requestBody = {
        user_id: `user_${Date.now()}`, // Generate unique user ID
        message: content,
        language,
      }

      console.log("📤 Request body:", requestBody)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("📥 Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ HTTP error:", response.status, errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error("❌ Response is not JSON:", responseText)
        throw new Error("Response is not JSON")
      }

      const data = await response.json()
      console.log("✅ Enhanced AI response received:", {
        response_length: data.response?.length,
        confidence: data.confidence,
        escalate: data.escalate,
        ai_status: data.ai_status,
      })

      // Update AI status
      setAiStatus({
        status: data.ai_status || "active",
        model: data.model,
        confidence: data.confidence,
      })

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        escalate: data.escalate,
        confidence: data.confidence,
      }

      setMessages((prev) => [...prev, botMessage])

      // Show escalation notice if needed
      if (data.escalate) {
        setTimeout(() => {
          const escalationMessage: Message = {
            id: (Date.now() + 2).toString(),
            content:
              language === "pt"
                ? "🔄 Vou conectá-lo com um de nossos especialistas. Pode também ligar diretamente para 21 481 200 ou visitar uma agência Standard Bank."
                : "🔄 I'll connect you with one of our specialists. You can also call directly 21 481 200 or visit a Standard Bank branch.",
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, escalationMessage])
        }, 1000)
      }
    } catch (error) {
      console.error("💥 Chat error:", error)
      setAiStatus({ status: "error" })

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          language === "pt"
            ? "Desculpe, tive um problema técnico. Para assistência imediata, ligue para 21 481 200 ou visite uma agência Standard Bank. Nossa IA está sendo restaurada."
            : "Sorry, I had a technical issue. For immediate assistance, call 21 481 200 or visit a Standard Bank branch. Our AI is being restored.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (aiStatus.status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-3 w-3 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-500" />
      default:
        return <Zap className="h-3 w-3 text-blue-500" />
    }
  }

  const getStatusText = () => {
    switch (aiStatus.status) {
      case "active":
        return language === "pt" ? "IA Ativa" : "AI Active"
      case "degraded":
        return language === "pt" ? "IA Limitada" : "AI Limited"
      case "error":
        return language === "pt" ? "IA Offline" : "AI Offline"
      default:
        return language === "pt" ? "IA Carregando" : "AI Loading"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Enhanced Chat Header with AI Status */}
      <div className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-200 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-1.5 sm:p-2 rounded-full shadow-lg flex-shrink-0">
              <Bot className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                {t.chat.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{t.chat.subtitle}</p>
            </div>
          </div>

          {/* AI Status Indicator */}
          <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
            {getStatusIcon()}
            <span className="text-xs font-medium text-gray-600 hidden sm:block">{getStatusText()}</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-blue-50 px-3 sm:px-6 py-3 sm:py-4">
        <div className="space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatBubble message={message} />

              {/* Show confidence and escalation info */}
              {message.sender === "bot" && (message.confidence || message.escalate) && (
                <div className="mt-2 ml-8 sm:ml-11 flex items-center space-x-4 text-xs text-gray-500">
                  {message.confidence && (
                    <span className="flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>
                        {Math.round(message.confidence * 100)}% {language === "pt" ? "confiança" : "confidence"}
                      </span>
                    </span>
                  )}
                  {message.escalate && (
                    <span className="text-orange-600 font-medium">
                      {language === "pt" ? "💬 Conectando especialista..." : "💬 Connecting specialist..."}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-red-50 text-gray-900 border border-blue-200 px-3 sm:px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
                  <span className="text-xs sm:text-sm">
                    {language === "pt" ? "IA processando..." : "AI processing..."}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Chat Input */}
      <div className="flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading || aiStatus.status === "error"} />
      </div>
    </div>
  )
}
