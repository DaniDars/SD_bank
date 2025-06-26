import { type NextRequest, NextResponse } from "next/server"

// Groq API integration
async function callGroqAPI(message: string, language: "pt" | "en" = "pt"): Promise<string> {
  const systemPrompt =
    language === "pt"
      ? `Você é um assistente bancário especializado do Standard Bank Moçambique. 

INSTRUÇÕES IMPORTANTES:
- Seja conversacional, amigável e natural como um funcionário do banco
- Responda APENAS sobre serviços bancários do Standard Bank Moçambique
- Use informações realistas sobre produtos bancários em Moçambique
- Valores em Meticais (MT), telefones moçambicanos (+258)
- Mencione canais digitais: Standard Bank App, Internet Banking
- Para emergências: 21 481 200 (24h)
- Agências: Segunda-Sexta 8h-15h30, Sábado 8h-12h (selecionadas)

PRODUTOS E SERVIÇOS:
- Contas: Poupança (min 1.000 MT), Corrente (min 2.500 MT)
- Cartões: Débito (limite 50.000 MT/dia), Crédito
- Empréstimos: Pessoal (5-7 dias), Habitação (30-45 dias)
- Transferências: Gratuitas entre Standard Bank, 150 MT outros bancos
- Digital: App gratuito, Internet Banking 24h

Responda de forma natural e útil, como se fosse uma conversa real com um cliente.`
      : `You are a specialized banking assistant for Standard Bank Mozambique.

IMPORTANT INSTRUCTIONS:
- Be conversational, friendly and natural like a bank employee
- Answer ONLY about Standard Bank Mozambique banking services
- Use realistic information about banking products in Mozambique
- Values in Meticais (MT), Mozambican phone numbers (+258)
- Mention digital channels: Standard Bank App, Internet Banking
- For emergencies: 21 481 200 (24h)
- Branches: Mon-Fri 8am-3:30pm, Sat 8am-12pm (selected)

PRODUCTS AND SERVICES:
- Accounts: Savings (min 1,000 MT), Current (min 2,500 MT)
- Cards: Debit (limit 50,000 MT/day), Credit
- Loans: Personal (5-7 days), Home (30-45 days)
- Transfers: Free between Standard Bank, 150 MT other banks
- Digital: Free app, Internet Banking 24h

Respond naturally and helpfully, as if having a real conversation with a customer.`

  try {
    console.log("🤖 Calling Groq API with Llama-4 Scout...")

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
        max_tokens: 500,
        top_p: 0.9,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("❌ Groq API error:", response.status, errorData)
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("✅ Groq API response:", data)

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content
    } else {
      throw new Error("Invalid response format from Groq API")
    }
  } catch (error) {
    console.error("💥 Groq API call failed:", error)

    // Fallback to basic response if API fails
    return language === "pt"
      ? "Desculpe, estou com dificuldades técnicas no momento. Para assistência imediata, ligue para 21 481 200 ou visite uma agência Standard Bank. Estamos aqui para ajudar!"
      : "Sorry, I'm having technical difficulties at the moment. For immediate assistance, call 21 481 200 or visit a Standard Bank branch. We're here to help!"
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 POST /api/chat called with Groq AI")

  try {
    const body = await request.json()
    console.log("📥 Request body:", body)

    const { user_id, message, language = "pt" } = body

    if (!user_id || !message) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "Missing required fields: user_id, message" }, { status: 400 })
    }

    console.log("🧠 Processing message with Llama-4 Scout:", message)

    // Call Groq API with Llama-4 Scout model
    const aiResponse = await callGroqAPI(message, language)

    console.log("✅ AI Response generated:", aiResponse)

    // Determine if this should escalate (only for explicit requests)
    const shouldEscalate =
      message.toLowerCase().includes("humano") ||
      message.toLowerCase().includes("pessoa") ||
      message.toLowerCase().includes("agente") ||
      message.toLowerCase().includes("gerente") ||
      message.toLowerCase().includes("human") ||
      message.toLowerCase().includes("person") ||
      message.toLowerCase().includes("agent") ||
      message.toLowerCase().includes("manager")

    const responseData = {
      response: aiResponse,
      escalate: shouldEscalate,
    }

    console.log("📤 Sending final response:", responseData)
    return NextResponse.json(responseData)
  } catch (error) {
    console.error("💥 Chat API error:", error)

    const errorResponse =
      language === "pt"
        ? "Desculpe, tive um problema técnico. Para assistência imediata, contacte 21 481 200. Nossa equipe está sempre disponível para ajudar!"
        : "Sorry, I had a technical issue. For immediate assistance, contact 21 481 200. Our team is always available to help!"

    return NextResponse.json(
      {
        response: errorResponse,
        escalate: true,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("🔍 GET /api/chat called")
  return NextResponse.json({
    status: "Standard Bank Chat AI with Groq Llama-4 Scout is running",
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    timestamp: new Date().toISOString(),
    languages: ["pt", "en"],
    features: ["groq_api", "llama4_scout", "banking_knowledge", "natural_conversation"],
  })
}
