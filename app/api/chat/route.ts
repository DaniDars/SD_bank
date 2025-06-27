import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Simple mock responses for different intents
const mockResponses = {
  pt: {
    greeting: "Olá! Bem-vindo ao SecureBank Moçambique. Como posso ajudá-lo hoje?",
    balance:
      "Para verificar seu saldo, você pode usar o NETPlus App, visitar um ATM, ou ligar para +258 21 123 4567. Gostaria que eu o oriente através de alguma dessas opções?",
    card: "Para questões relacionadas a cartões, posso ajudá-lo com bloqueio, desbloqueio, ou solicitação de novo cartão. Ligue para +258 84 567 8900 para emergências 24/7.",
    transfer:
      "Para transferências, use o NETPlus App (gratuito entre contas SecureBank) ou M-Pesa (*150#). Transferências para outros bancos custam 150-300 MT.",
    loan: "Oferecemos empréstimos pessoais, crédito habitação e automóvel. Taxa de juros a partir de 18% ao ano. Quer fazer uma simulação?",
    general:
      "Estou aqui para ajudar com suas questões bancárias. Pode perguntar sobre contas, cartões, empréstimos, transferências ou outros serviços.",
    error:
      "Desculpe, não consegui processar sua solicitação. Por favor, tente reformular sua pergunta ou entre em contato com nosso suporte em +258 21 123 4567.",
  },
  en: {
    greeting: "Hello! Welcome to SecureBank Mozambique. How can I help you today?",
    balance:
      "To check your balance, you can use NETPlus App, visit an ATM, or call +258 21 123 4567. Would you like me to guide you through any of these options?",
    card: "For card-related issues, I can help with blocking, unblocking, or requesting a new card. Call +258 84 567 8900 for 24/7 emergencies.",
    transfer:
      "For transfers, use NETPlus App (free between SecureBank accounts) or M-Pesa (*150#). Transfers to other banks cost 150-300 MT.",
    loan: "We offer personal loans, home loans and auto loans. Interest rates from 18% per year. Would you like a simulation?",
    general:
      "I'm here to help with your banking questions. You can ask about accounts, cards, loans, transfers or other services.",
    error:
      "Sorry, I couldn't process your request. Please try rephrasing your question or contact our support at +258 21 123 4567.",
  },
}

function detectIntent(message: string): string {
  const messageLower = message.toLowerCase()

  // Balance related keywords
  if (
    messageLower.includes("saldo") ||
    messageLower.includes("balance") ||
    messageLower.includes("conta") ||
    messageLower.includes("account")
  ) {
    return "balance"
  }

  // Card related keywords
  if (
    messageLower.includes("cartão") ||
    messageLower.includes("card") ||
    messageLower.includes("débito") ||
    messageLower.includes("crédito")
  ) {
    return "card"
  }

  // Transfer related keywords
  if (
    messageLower.includes("transferir") ||
    messageLower.includes("transfer") ||
    messageLower.includes("enviar") ||
    messageLower.includes("mpesa") ||
    messageLower.includes("m-pesa")
  ) {
    return "transfer"
  }

  // Loan related keywords
  if (
    messageLower.includes("empréstimo") ||
    messageLower.includes("loan") ||
    messageLower.includes("crédito") ||
    messageLower.includes("financiamento")
  ) {
    return "loan"
  }

  // Greeting keywords
  if (
    messageLower.includes("olá") ||
    messageLower.includes("oi") ||
    messageLower.includes("hello") ||
    messageLower.includes("hi")
  ) {
    return "greeting"
  }

  return "general"
}

async function searchFAQs(query: string, language: string) {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .or(`question_${language}.ilike.%${query}%,answer_${language}.ilike.%${query}%`)
      .limit(3)

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("FAQ search error:", error)
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, message, language = "pt" } = body

    if (!user_id || !message) {
      return NextResponse.json(
        {
          error: "Missing required fields: user_id, message",
        },
        { status: 400 },
      )
    }

    // Detect intent
    const intent = detectIntent(message)

    // Search FAQs for relevant information
    const faqs = await searchFAQs(message, language)

    // Generate response
    let response =
      mockResponses[language as keyof typeof mockResponses][intent as keyof typeof mockResponses.pt] ||
      mockResponses[language as keyof typeof mockResponses].general

    // If we found relevant FAQs, enhance the response
    if (faqs.length > 0) {
      const faqInfo = faqs[0]
      const faqAnswer = language === "pt" ? faqInfo.answer_pt : faqInfo.answer_en
      response = faqAnswer
    }

    // Calculate confidence based on intent match and FAQ results
    let confidence = 0.7
    if (faqs.length > 0) confidence = 0.9
    if (intent === "general") confidence = 0.5

    // Determine if escalation is needed
    const escalationKeywords = ["humano", "pessoa", "agente", "human", "person", "agent", "manager", "gerente"]
    const shouldEscalate =
      escalationKeywords.some((keyword) => message.toLowerCase().includes(keyword)) || confidence < 0.4

    // Log the interaction
    try {
      await supabase.from("chat_logs").insert({
        user_id,
        message,
        response,
        confidence,
        escalate: shouldEscalate,
        timestamp: new Date().toISOString(),
      })
    } catch (logError) {
      console.error("Failed to log interaction:", logError)
    }

    return NextResponse.json({
      response,
      sources: faqs.length > 0 ? [`FAQ: ${faqs[0].category}`] : [],
      escalate: shouldEscalate,
      confidence,
      tool_used: intent,
    })
  } catch (error) {
    console.error("Chat API error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Desculpe, ocorreu um erro interno. Por favor, tente novamente.",
        sources: [],
        escalate: true,
        confidence: 0.1,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Chat API is running",
    timestamp: new Date().toISOString(),
  })
}
