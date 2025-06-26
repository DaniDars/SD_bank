import { GroqClient } from "./groq-client"
import { FAQVectorStore } from "./vector-store"
import { supabase } from "./supabase"

export interface AgentResponse {
  response: string
  sources: string[]
  escalate: boolean
  confidence: number
  tool_used?: string
}

export class BankingAgent {
  private groqClient: GroqClient
  private vectorStore: FAQVectorStore
  private confidenceThreshold = 0.7

  constructor() {
    this.groqClient = new GroqClient()
    this.vectorStore = new FAQVectorStore()
  }

  async initialize() {
    await this.vectorStore.initialize()
  }

  async processMessage(message: string, userId: string, language: "pt" | "en" = "pt"): Promise<AgentResponse> {
    try {
      // 1. Detect intent
      const intentResult = await this.groqClient.detectIntent(message)

      // 2. Check for tool usage
      if (this.shouldUseTool(intentResult.intent)) {
        return await this.handleToolUsage(intentResult.intent, message, language)
      }

      // 3. Search FAQ vector store
      const searchResults = await this.vectorStore.searchSimilar(message, 3)

      // 4. Determine if we have good enough context
      const bestScore = searchResults.scores[0] || 0
      const hasGoodContext = bestScore > this.confidenceThreshold

      let response: string
      let sources: string[] = []
      let confidence = intentResult.confidence

      if (hasGoodContext) {
        // Use retrieved context to generate response
        const context = searchResults.documents.map((doc) => doc.pageContent).join("\n\n")

        sources = searchResults.documents.map((doc) => `FAQ: ${doc.metadata.category || "general"}`)

        response = await this.generateContextualResponse(message, context, language)
        confidence = Math.min(confidence + 0.2, 1.0)
      } else {
        // Generate general response
        response = await this.generateGeneralResponse(message, language)
        confidence = Math.max(confidence - 0.2, 0.3)
      }

      // 5. Determine if escalation is needed
      const shouldEscalate = this.shouldEscalate(message, confidence, intentResult.intent)

      // 6. Log the interaction
      await this.logInteraction(userId, message, response, confidence, shouldEscalate)

      return {
        response,
        sources,
        escalate: shouldEscalate,
        confidence,
      }
    } catch (error) {
      console.error("Agent processing error:", error)

      const fallbackResponse =
        language === "pt"
          ? "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato com nosso suporte."
          : "Sorry, an error occurred. Please try again or contact our support."

      return {
        response: fallbackResponse,
        sources: [],
        escalate: true,
        confidence: 0.1,
      }
    }
  }

  private shouldUseTool(intent: string): boolean {
    return ["account_balance", "card_issue", "transfer"].includes(intent)
  }

  private async handleToolUsage(intent: string, message: string, language: "pt" | "en"): Promise<AgentResponse> {
    let response: string
    let toolUsed: string

    switch (intent) {
      case "account_balance":
        response = await this.mockCheckBalance(language)
        toolUsed = "check_balance"
        break
      case "card_issue":
        response = await this.mockBlockCard(language)
        toolUsed = "block_card"
        break
      case "transfer":
        response = await this.mockReportFraud(language)
        toolUsed = "report_fraud"
        break
      default:
        response = language === "pt" ? "Não consegui processar sua solicitação." : "I couldn't process your request."
        toolUsed = "unknown"
    }

    return {
      response,
      sources: [`Tool: ${toolUsed}`],
      escalate: false,
      confidence: 0.9,
      tool_used: toolUsed,
    }
  }

  private async mockCheckBalance(language: "pt" | "en"): Promise<string> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return language === "pt"
      ? "Seu saldo atual é de 15.750,00 MT. Última transação: Depósito de 2.500,00 MT em 25/12/2024. Para mais detalhes, acesse o NETPlus ou visite uma agência."
      : "Your current balance is 15,750.00 MT. Last transaction: Deposit of 2,500.00 MT on 25/12/2024. For more details, access NETPlus or visit a branch."
  }

  private async mockBlockCard(language: "pt" | "en"): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return language === "pt"
      ? "Seu cartão foi bloqueado com sucesso por motivos de segurança. Um novo cartão será enviado para seu endereço em 3-5 dias úteis. Número de referência: #CB2024001234"
      : "Your card has been successfully blocked for security reasons. A new card will be sent to your address in 3-5 business days. Reference number: #CB2024001234"
  }

  private async mockReportFraud(language: "pt" | "en"): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return language === "pt"
      ? "Relatório de fraude registrado. Sua conta foi temporariamente protegida. Nossa equipe de segurança entrará em contato em até 2 horas. Protocolo: #FR2024005678"
      : "Fraud report registered. Your account has been temporarily protected. Our security team will contact you within 2 hours. Protocol: #FR2024005678"
  }

  private async generateContextualResponse(message: string, context: string, language: "pt" | "en"): Promise<string> {
    const systemPrompt =
      language === "pt"
        ? `Você é um assistente bancário especializado do SecureBank Moçambique usando o modelo Llama-4 Scout. 

INSTRUÇÕES:
- Use APENAS o contexto fornecido para responder
- Mantenha respostas concisas e precisas
- Seja profissional e amigável
- Se a informação não estiver no contexto, diga claramente que precisa verificar com um especialista
- Use valores em Meticais (MT) para Moçambique
- Mencione canais digitais: NETPlus App, NETPlus Web, QuiQ (USSD)

CONTEXTO: ${context}

Responda à pergunta do cliente de forma útil e precisa.`
        : `You are a specialized banking assistant for SecureBank Mozambique using the Llama-4 Scout model.

INSTRUCTIONS:
- Use ONLY the provided context to answer
- Keep responses concise and accurate
- Be professional and friendly
- If information is not in context, clearly state you need to check with a specialist
- Use Meticais (MT) values for Mozambique
- Mention digital channels: NETPlus App, NETPlus Web, QuiQ (USSD)

CONTEXT: ${context}

Answer the customer's question helpfully and accurately.`

    return await this.groqClient.generateResponse(systemPrompt, message)
  }

  private async generateGeneralResponse(message: string, language: "pt" | "en"): Promise<string> {
    const systemPrompt =
      language === "pt"
        ? `Você é um assistente bancário do SecureBank Moçambique usando o modelo Llama-4 Scout.

INSTRUÇÕES:
- Responda sobre serviços bancários gerais em Moçambique
- Use informações sobre produtos bancários comuns
- Seja conciso e direto
- Se não tiver certeza sobre algo específico, sugira contato com agência ou +258 21 123 4567
- Mencione sempre os canais digitais disponíveis
- Use valores em Meticais (MT)

Responda de forma útil sobre serviços bancários gerais.`
        : `You are a banking assistant for SecureBank Mozambique using the Llama-4 Scout model.

INSTRUCTIONS:
- Respond about general banking services in Mozambique
- Use information about common banking products
- Be concise and direct
- If unsure about something specific, suggest contacting a branch or +258 21 123 4567
- Always mention available digital channels
- Use Meticais (MT) values

Respond helpfully about general banking services.`

    return await this.groqClient.generateResponse(systemPrompt, message)
  }

  private shouldEscalate(message: string, confidence: number, intent: string): boolean {
    // Escalate if confidence is too low
    if (confidence < 0.4) return true

    // Escalate if user explicitly asks for human help
    const escalationKeywords = [
      "human",
      "person",
      "agent",
      "representative",
      "manager",
      "humano",
      "pessoa",
      "agente",
      "representante",
      "gerente",
    ]

    const messageWords = message.toLowerCase().split(" ")
    const hasEscalationKeyword = escalationKeywords.some((keyword) => messageWords.includes(keyword))

    return hasEscalationKeyword
  }

  private async logInteraction(
    userId: string,
    message: string,
    response: string,
    confidence: number,
    escalate: boolean,
    toolUsed?: string,
  ) {
    try {
      await supabase.from("chat_logs").insert({
        user_id: userId,
        message,
        response,
        tool_used: toolUsed,
        confidence,
        escalate,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Failed to log interaction:", error)
    }
  }
}
