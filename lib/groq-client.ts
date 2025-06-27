import { ChatGroq } from "@langchain/groq"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export class GroqClient {
  private llm: ChatGroq

  constructor() {
    this.llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "meta-llama/llama-4-scout-17b-16e-instruct", // Updated to Llama-4 Scout
      temperature: 0.3,
      maxTokens: 1000,
    })
  }

  async generateResponse(systemPrompt: string, userMessage: string, context?: string): Promise<string> {
    const messages = [
      new SystemMessage(systemPrompt),
      ...(context ? [new HumanMessage(`Context: ${context}`)] : []),
      new HumanMessage(userMessage),
    ]

    const response = await this.llm.invoke(messages)
    return response.content as string
  }

  async detectIntent(message: string): Promise<{
    intent: string
    confidence: number
    entities: Record<string, any>
  }> {
    const systemPrompt = `
You are an intent classifier for SecureBank Mozambique using Llama-4 Scout model.

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

    const response = await this.generateResponse(systemPrompt, message)

    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, "").trim()
      return JSON.parse(cleanedResponse)
    } catch (error) {
      console.error("Intent detection parsing error:", error)
      return {
        intent: "general_question",
        confidence: 0.5,
        entities: {},
      }
    }
  }
}
