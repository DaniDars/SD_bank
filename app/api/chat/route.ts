import { type NextRequest, NextResponse } from "next/server"
import { faqs } from "@/lib/faqs"

// Enhanced AI responses with FAQ integration
function findRelevantFAQ(message: string, language: "pt" | "en" = "pt") {
  const messageLower = message.toLowerCase()

  // Find FAQ that matches the user's question
  const relevantFAQ = faqs.find((faq) => {
    const question = language === "pt" ? faq.question.pt : faq.question.en
    const answer = language === "pt" ? faq.answer.pt : faq.answer.en

    // Simple keyword matching
    const questionWords = question.toLowerCase().split(" ")
    const messageWords = messageLower.split(" ")

    // Check if message contains key words from FAQ
    const matchCount = questionWords.filter(
      (word) => word.length > 3 && messageWords.some((msgWord) => msgWord.includes(word) || word.includes(msgWord)),
    ).length

    return matchCount > 1
  })

  return relevantFAQ
}

function generateSmartResponse(message: string, language: "pt" | "en" = "pt") {
  const messageLower = message.toLowerCase()

  // Check for specific banking topics
  if (messageLower.includes("saldo") || messageLower.includes("balance")) {
    return language === "pt"
      ? "Para verificar seu saldo, você pode usar o Standard Bank App, Internet Banking, caixas eletrônicos, ou ligar para +258 21 481 200. O app está disponível 24/7 e é a forma mais rápida!"
      : "To check your balance, you can use the Standard Bank App, Internet Banking, ATMs, or call +258 21 481 200. The app is available 24/7 and is the fastest way!"
  }

  if (messageLower.includes("cartão") || messageLower.includes("card")) {
    return language === "pt"
      ? "Para questões com cartão (bloqueio, ativação, perda), use o Standard Bank App ou ligue imediatamente para +258 21 481 200. Posso ajudar com procedimentos específicos se me disser qual é o problema."
      : "For card issues (blocking, activation, loss), use the Standard Bank App or call immediately +258 21 481 200. I can help with specific procedures if you tell me what the problem is."
  }

  if (messageLower.includes("empréstimo") || messageLower.includes("loan")) {
    return language === "pt"
      ? "Para empréstimos no Standard Bank, você precisa de documentos como DIRE, recibos de salário, extratos bancários. O processo leva 5-7 dias para empréstimos pessoais. Quer saber sobre algum tipo específico de empréstimo?"
      : "For loans at Standard Bank, you need documents like DIRE, salary receipts, bank statements. The process takes 5-7 days for personal loans. Want to know about a specific type of loan?"
  }

  if (messageLower.includes("conta") || messageLower.includes("account")) {
    return language === "pt"
      ? "Para abrir uma conta no Standard Bank, você precisa de DIRE/BI, comprovante de residência, comprovante de rendimentos e depósito inicial (1.000 MT poupança, 2.500 MT corrente). Posso explicar o processo detalhadamente."
      : "To open an account at Standard Bank, you need DIRE/ID, proof of residence, proof of income and initial deposit (1,000 MT savings, 2,500 MT current). I can explain the process in detail."
  }

  // Default responses
  const defaultResponses = {
    pt: [
      "Olá! Sou o assistente virtual do Standard Bank Moçambique. Como posso ajudá-lo hoje?",
      "Estou aqui para ajudar com suas questões bancárias. Pode me perguntar sobre contas, cartões, empréstimos, ou serviços digitais.",
      "Para melhor assistência, pode me dar mais detalhes sobre sua pergunta? Estou aqui para ajudar com todos os serviços do Standard Bank.",
      "Posso ajudá-lo com informações sobre produtos bancários, procedimentos, ou direcioná-lo para o canal certo. O que precisa saber?",
    ],
    en: [
      "Hello! I'm the Standard Bank Mozambique virtual assistant. How can I help you today?",
      "I'm here to help with your banking questions. You can ask me about accounts, cards, loans, or digital services.",
      "For better assistance, can you give me more details about your question? I'm here to help with all Standard Bank services.",
      "I can help you with information about banking products, procedures, or direct you to the right channel. What do you need to know?",
    ],
  }

  const responses = defaultResponses[language] || defaultResponses.pt
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, message, language = "pt" } = body

    if (!user_id || !message) {
      return NextResponse.json({ error: "Missing required fields: user_id, message" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Try to find relevant FAQ first
    const relevantFAQ = findRelevantFAQ(message, language)

    let response: string
    let sources: string[] = []
    let confidence = 0.8

    if (relevantFAQ) {
      // Use FAQ answer
      response = language === "pt" ? relevantFAQ.answer.pt : relevantFAQ.answer.en
      sources = [`FAQ: ${relevantFAQ.category}`]
      confidence = 0.9

      // Add helpful follow-up
      const followUp =
        language === "pt"
          ? "\n\nPrecisa de mais alguma informação ou tem outras perguntas?"
          : "\n\nDo you need any more information or have other questions?"
      response += followUp
    } else {
      // Generate smart response based on keywords
      response = generateSmartResponse(message, language)
      sources = ["AI Assistant"]
      confidence = 0.7
    }

    // Determine if this should escalate
    const shouldEscalate =
      message.toLowerCase().includes("human") ||
      message.toLowerCase().includes("agent") ||
      message.toLowerCase().includes("humano") ||
      message.toLowerCase().includes("agente") ||
      message.toLowerCase().includes("gerente") ||
      message.toLowerCase().includes("manager") ||
      message.toLowerCase().includes("reclamação") ||
      message.toLowerCase().includes("complaint")

    if (shouldEscalate) {
      const escalationMessage =
        language === "pt"
          ? "\n\n🔄 Vou transferir você para um agente humano. Pode contactar diretamente: +258 21 481 200 ou visitar uma agência."
          : "\n\n🔄 I'll transfer you to a human agent. You can contact directly: +258 21 481 200 or visit a branch."
      response += escalationMessage
    }

    return NextResponse.json({
      response,
      sources,
      escalate: shouldEscalate,
      confidence,
      tool_used: relevantFAQ ? "faq_search" : "smart_response",
    })
  } catch (error) {
    console.error("Chat API error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Desculpe, ocorreu um erro interno. Por favor, contacte +258 21 481 200 para assistência.",
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
    status: "Standard Bank Chat API is running",
    timestamp: new Date().toISOString(),
    faqs_loaded: faqs.length,
  })
}
