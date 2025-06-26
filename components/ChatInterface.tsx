"use client"

import { useState, useRef, useEffect } from "react"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import { useLanguage } from "@/contexts/LanguageContext"
import { Bot } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  escalate?: boolean
}

export default function ChatInterface() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        language === "pt"
          ? "Olá! Sou o assistente virtual do Standard Bank Moçambique com IA avançada. Como posso ajudá-lo hoje?"
          : "Hello! I'm the Standard Bank Mozambique virtual assistant with advanced AI. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
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

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        content:
          language === "pt"
            ? "Olá! Sou o assistente virtual do Standard Bank Moçambique com IA avançada. Como posso ajudá-lo hoje?"
            : "Hello! I'm the Standard Bank Mozambique virtual assistant with advanced AI. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [language])

  const handleSendMessage = async (content: string) => {
    console.log("🚀 Sending message to Groq AI:", content)
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
      console.log("🤖 Making API call to Groq Llama-4 Scout...")

      const requestBody = {
        user_id: "demo_user",
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
      console.log("✅ Groq AI response received:", data)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
        escalate: data.escalate,
      }

      setMessages((prev) => [...prev, botMessage])

      // Show escalation notice if needed
      if (data.escalate) {
        setTimeout(() => {
          const escalationMessage: Message = {
            id: (Date.now() + 2).toString(),
            content:
              language === "pt"
                ? "🔄 Vou conectá-lo com um de nossos especialistas. Pode também ligar diretamente para 21 481 200 ou visitar uma agência."
                : "🔄 I'll connect you with one of our specialists. You can also call directly 21 481 200 or visit a branch.",
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, escalationMessage])
        }, 1000)
      }
    } catch (error) {
      console.error("💥 Chat error:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          language === "pt"
            ? "Desculpe, tive um problema técnico. Para assistência imediata, ligue para 21 481 200 ou visite uma agência Standard Bank."
            : "Sorry, I had a technical issue. For immediate assistance, call 21 481 200 or visit a Standard Bank branch.",
        sender: "bot",
        timestamp: new Date(),
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
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-full shadow-lg">
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

              {/* Show escalation notice */}
              {message.sender === "bot" && message.escalate && (
                <div className="mt-2 ml-11 text-xs text-orange-600 font-medium">
                  {language === "pt" ? "💬 Conectando com especialista..." : "💬 Connecting with specialist..."}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-full">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-red-50 text-gray-900 border border-blue-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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
