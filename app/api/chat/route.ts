import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Enhanced Groq API integration with comprehensive error handling
async function callGroqAPI(
  message: string,
  language: "pt" | "en" = "pt",
  userId: string,
): Promise<{ response: string; escalate: boolean; confidence: number }> {
  const systemPrompt =
    language === "pt"
      ? `Você é um assistente bancário especializado do Standard Bank Moçambique com IA avançada.

INSTRUÇÕES CRÍTICAS:
- Seja conversacional, amigável e natural como um funcionário experiente do banco
- Responda APENAS sobre serviços bancários do Standard Bank Moçambique
- Use informações realistas e atualizadas sobre produtos bancários em Moçambique
- Valores sempre em Meticais (MT), telefones moçambicanos (+258)
- Mencione canais digitais: Standard Bank App, Internet Banking
- Para emergências: 21 481 200 (24h)
- Agências: Segunda-Sexta 8h-15h30, Sábado 8h-12h (selecionadas)

PRODUTOS E SERVIÇOS DETALHADOS:
- Contas: Poupança (min 1.000 MT, taxa 0,5% a.a.), Corrente (min 2.500 MT)
- Cartões: Débito (limite 50.000 MT/dia), Crédito (limite conforme aprovação)
- Empréstimos: Pessoal (5-7 dias, taxa desde 18% a.a.), Habitação (30-45 dias, até 80% do valor)
- Transferências: Gratuitas entre Standard Bank, 150 MT outros bancos nacionais
- Digital: App gratuito 24h, Internet Banking, SMS Banking (*144#)
- Investimentos: Depósitos a prazo (min 50.000 MT), Bilhetes do Tesouro

COMPORTAMENTO:
- Seja proativo em sugerir soluções
- Explique processos passo a passo
- Ofereça alternativas quando apropriado
- Use exemplos práticos com valores em MT
- Mantenha tom profissional mas acessível

Responda de forma completa e útil, como se fosse uma conversa real com um cliente no balcão.`
      : `You are a specialized banking assistant for Standard Bank Mozambique with advanced AI.

CRITICAL INSTRUCTIONS:
- Be conversational, friendly and natural like an experienced bank employee
- Answer ONLY about Standard Bank Mozambique banking services
- Use realistic and updated information about banking products in Mozambique
- Always use Meticais (MT) values, Mozambican phone numbers (+258)
- Mention digital channels: Standard Bank App, Internet Banking
- For emergencies: 21 481 200 (24h)
- Branches: Mon-Fri 8am-3:30pm, Sat 8am-12pm (selected)

DETAILED PRODUCTS AND SERVICES:
- Accounts: Savings (min 1,000 MT, 0.5% p.a. rate), Current (min 2,500 MT)
- Cards: Debit (limit 50,000 MT/day), Credit (limit per approval)
- Loans: Personal (5-7 days, rate from 18% p.a.), Home (30-45 days, up to 80% of value)
- Transfers: Free between Standard Bank, 150 MT other national banks
- Digital: Free app 24h, Internet Banking, SMS Banking (*144#)
- Investments: Fixed deposits (min 50,000 MT), Treasury Bills

BEHAVIOR:
- Be proactive in suggesting solutions
- Explain processes step by step
- Offer alternatives when appropriate
- Use practical examples with MT values
- Maintain professional but accessible tone

Respond comprehensively and helpfully, as if having a real conversation with a customer at the counter.`

  try {
    console.log("🤖 Calling Groq API with Llama-4 Scout - Enhanced Mode...")
    console.log("📝 Message:", message.substring(0, 100) + "...")
    console.log("🌍 Language:", language)

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 800, // Increased for more comprehensive responses
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      }),
    })

    console.log("📡 Groq API Response Status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("❌ Groq API error:", response.status, errorData)
      throw new Error(`Groq API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    console.log("✅ Groq API response received successfully")
    console.log("📊 Usage:", data.usage)

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content
      console.log("🧠 AI Response length:", aiResponse.length)

      // Enhanced escalation detection
      const escalationKeywords = [
        // Portuguese
        "humano",
        "pessoa",
        "agente",
        "gerente",
        "funcionário",
        "atendente",
        "supervisor",
        "diretor",
        "responsável",
        "falar com",
        "quero falar",
        "não entendi",
        "não resolve",
        "problema sério",
        "reclamação",
        // English
        "human",
        "person",
        "agent",
        "manager",
        "employee",
        "staff",
        "supervisor",
        "director",
        "responsible",
        "speak with",
        "want to speak",
        "don't understand",
        "doesn't solve",
        "serious problem",
        "complaint",
      ]

      const shouldEscalate = escalationKeywords.some((keyword) => message.toLowerCase().includes(keyword))

      // Calculate confidence based on response quality and length
      let confidence = 0.85
      if (aiResponse.length < 50) confidence -= 0.2
      if (aiResponse.length > 200) confidence += 0.1
      if (shouldEscalate) confidence -= 0.3
      confidence = Math.max(0.1, Math.min(1.0, confidence))

      console.log("📈 Calculated confidence:", confidence)
      console.log("🚨 Escalation needed:", shouldEscalate)

      // Enhanced logging to Supabase with proper column mapping
      try {
        const logData = {
          user_id: userId,
          message: message,
          response: aiResponse,
          tool_used: "groq_llama4_scout_enhanced",
          confidence: confidence,
          escalate: shouldEscalate,
          timestamp: new Date().toISOString(),
          language: language,
          response_length: aiResponse.length,
          model_used: "meta-llama/llama-4-scout-17b-16e-instruct",
        }

        console.log("💾 Logging to Supabase:", Object.keys(logData))

        const { error: logError } = await supabase.from("chat_logs").insert(logData)

        if (logError) {
          console.error("⚠️ Supabase logging error:", logError)
          // Continue execution even if logging fails
        } else {
          console.log("✅ Chat interaction logged to Supabase successfully")
        }
      } catch (logError) {
        console.error("⚠️ Failed to log to Supabase:", logError)
        // Continue execution even if logging fails
      }

      return {
        response: aiResponse,
        escalate: shouldEscalate,
        confidence: confidence,
      }
    } else {
      throw new Error("Invalid response format from Groq API")
    }
  } catch (error) {
    console.error("💥 Groq API call failed:", error)

    // Enhanced fallback with context-aware responses
    const fallbackResponses =
      language === "pt"
        ? {
            greeting:
              "Olá! Bem-vindo ao Standard Bank Moçambique. Estou com algumas dificuldades técnicas, mas posso ajudar com informações básicas. Para assistência completa, ligue para 21 481 200.",
            account:
              "Para questões sobre contas, pode verificar seu saldo pelo app Standard Bank ou ligar para 21 481 200. Estamos sempre disponíveis para ajudar!",
            card: "Para problemas com cartões, bloqueie imediatamente pelo app ou ligue para 21 481 200. Sua segurança é nossa prioridade.",
            general:
              "Estou com dificuldades técnicas no momento. Para assistência imediata, ligue para 21 481 200 ou visite uma agência Standard Bank. Nossa equipe está sempre pronta para ajudar!",
          }
        : {
            greeting:
              "Hello! Welcome to Standard Bank Mozambique. I'm having some technical difficulties, but I can help with basic information. For complete assistance, call 21 481 200.",
            account:
              "For account questions, you can check your balance through the Standard Bank app or call 21 481 200. We're always available to help!",
            card: "For card problems, block it immediately through the app or call 21 481 200. Your security is our priority.",
            general:
              "I'm having technical difficulties at the moment. For immediate assistance, call 21 481 200 or visit a Standard Bank branch. Our team is always ready to help!",
          }

    // Context-aware fallback selection
    const messageLower = message.toLowerCase()
    let fallbackResponse = fallbackResponses.general

    if (messageLower.includes("olá") || messageLower.includes("hello") || messageLower.includes("oi")) {
      fallbackResponse = fallbackResponses.greeting
    } else if (messageLower.includes("conta") || messageLower.includes("account") || messageLower.includes("saldo")) {
      fallbackResponse = fallbackResponses.account
    } else if (messageLower.includes("cartão") || messageLower.includes("card")) {
      fallbackResponse = fallbackResponses.card
    }

    // Log error to Supabase with safe column mapping
    try {
      const errorLogData = {
        user_id: userId,
        message: message,
        response: fallbackResponse,
        tool_used: "fallback_enhanced",
        confidence: 0.2,
        escalate: true,
        timestamp: new Date().toISOString(),
        language: language,
        error_details: error instanceof Error ? error.message : "Unknown error",
      }

      await supabase.from("chat_logs").insert(errorLogData)
      console.log("✅ Error logged to Supabase")
    } catch (logError) {
      console.error("⚠️ Failed to log error to Supabase:", logError)
      // Continue execution even if error logging fails
    }

    return {
      response: fallbackResponse,
      escalate: true,
      confidence: 0.2,
    }
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 POST /api/chat called - AI Enhanced Mode Active")

  try {
    const body = await request.json()
    console.log("📥 Request received:", {
      user_id: body.user_id,
      message_length: body.message?.length,
      language: body.language,
    })

    const { user_id, message, language = "pt" } = body

    if (!user_id || !message) {
      console.log("❌ Missing required fields")
      return NextResponse.json(
        {
          error: "Missing required fields: user_id, message",
          ai_status: "error",
        },
        { status: 400 },
      )
    }

    if (message.length > 1000) {
      console.log("❌ Message too long")
      return NextResponse.json(
        {
          error: "Message too long. Please keep it under 1000 characters.",
          ai_status: "error",
        },
        { status: 400 },
      )
    }

    console.log("🧠 Processing with Enhanced AI...")

    // Call enhanced Groq API
    const { response: aiResponse, escalate, confidence } = await callGroqAPI(message, language, user_id)

    console.log("✅ AI processing complete:", {
      response_length: aiResponse.length,
      confidence: confidence,
      escalate: escalate,
    })

    const responseData = {
      response: aiResponse,
      escalate: escalate,
      confidence: confidence,
      ai_status: "active",
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      timestamp: new Date().toISOString(),
    }

    console.log("📤 Sending enhanced response")
    return NextResponse.json(responseData)
  } catch (error) {
    console.error("💥 Chat API error:", error)

    const language = "pt" // Declare the language variable here
    const errorResponse =
      language === "pt"
        ? "Desculpe, tive um problema técnico. Para assistência imediata, contacte 21 481 200. Nossa equipe está sempre disponível para ajudar!"
        : "Sorry, I had a technical issue. For immediate assistance, contact 21 481 200. Our team is always available to help!"

    return NextResponse.json(
      {
        response: errorResponse,
        escalate: true,
        confidence: 0.1,
        ai_status: "error",
        error_details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("🔍 GET /api/chat - AI Status Check")

  // Test Groq API connectivity
  try {
    const testResponse = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer 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`,
      },
    })

    const apiStatus = testResponse.ok ? "operational" : "degraded"

    return NextResponse.json({
      ai_status: "fully_operational",
      api_connectivity: apiStatus,
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      timestamp: new Date().toISOString(),
      languages: ["pt", "en"],
      features: [
        "groq_api_enhanced",
        "llama4_scout",
        "banking_knowledge",
        "natural_conversation",
        "context_awareness",
        "escalation_detection",
        "confidence_scoring",
        "supabase_logging",
      ],
      capabilities: {
        max_tokens: 800,
        temperature: 0.7,
        languages_supported: 2,
        fallback_enabled: true,
        logging_enabled: true,
      },
    })
  } catch (error) {
    return NextResponse.json({
      ai_status: "degraded",
      api_connectivity: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}
