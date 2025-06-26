import { ChatGroq } from "@langchain/groq"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export class GroqClient {
  private llm: ChatGroq

  constructor() {
    // Note: Using llama-3.1-70b-versatile as meta-llama/llama-4-scout-17b-16e-instruct
    // may not be available on Groq yet. Update when the model becomes available.
    this.llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-70b-versatile", // Available Groq model
      temperature: 0.3,
      maxTokens: 1000,
    })
  }

  async generateResponse(systemPrompt: string, userMessage: string, context?: string): Promise<string> {
    try {
      const messages = [
        new SystemMessage(systemPrompt),
        ...(context ? [new HumanMessage(`Context: ${context}`)] : []),
        new HumanMessage(userMessage),
      ]

      const response = await this.llm.invoke(messages)
      return response.content as string
    } catch (error) {
      console.error("Groq API error:", error)
      throw new Error("Failed to generate response from Groq")
    }
  }

  async detectIntent(message: string): Promise<{
    intent: string
    confidence: number
    entities: Record<string, any>
  }> {
    const systemPrompt = `
You are an intent classifier for SecureBank Mozambique.

TASK: Analyze the user message and classify the banking intent.

AVAILABLE INTENTS:
- account_balance: Questions about account balance, statements, transactions
- card_issue: Card problems, blocking, activation, lost/stolen cards  
- loan_inquiry: Loan applications, credit information, payment schedules
- transfer: Money transfers, payments, M-Pesa, international transfers
- general_question: General banking questions, products, services
- escalate: Requests for human agent, complex issues, complaints

RESPONSE FORMAT (JSON only):
{
  "intent": "intent_name",
  "confidence": 0.85,
  "entities": {
    "amount": "value_if_mentioned",
    "account_type": "type_if_mentioned", 
    "urgency": "high/medium/low"
  }
}

Analyze this message and respond with JSON only:
`

    try {
      const response = await this.generateResponse(systemPrompt, message)

      // Clean the response to ensure it's valid JSON
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, "").trim()
      const parsed = JSON.parse(cleanedResponse)

      // Validate the response structure
      if (!parsed.intent || typeof parsed.confidence !== "number") {
        throw new Error("Invalid response structure")
      }

      return parsed
    } catch (error) {
      console.error("Intent detection error:", error)
      return {
        intent: "general_question",
        confidence: 0.5,
        entities: {},
      }
    }
  }
}
