import { supabase } from "./supabase"

export interface ParsedFAQ {
  question: string
  answer: string
  category?: string
}

export class FAQParser {
  static parseFromJSON(faqData: any[]): ParsedFAQ[] {
    return faqData.map((item) => ({
      question: item.question,
      answer: item.answer,
      category: this.extractCategory(item.question),
    }))
  }

  static extractCategory(question: string): string {
    const categoryKeywords = {
      accounts: ["conta", "saldo", "account", "balance", "abertura", "opening"],
      cards: ["cartão", "card", "débito", "crédito", "debit", "credit"],
      loans: ["empréstimo", "loan", "crédito", "financiamento", "financing"],
      payments: ["pagamento", "payment", "transferência", "transfer", "débito directo"],
      digital: ["netplus", "app", "online", "digital", "quiq"],
      investment: ["investimento", "investment", "depósito a prazo", "bilhetes de tesouro"],
    }

    const questionLower = question.toLowerCase()

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => questionLower.includes(keyword))) {
        return category
      }
    }

    return "general"
  }

  static async uploadToSupabase(faqs: ParsedFAQ[]): Promise<void> {
    const faqsWithTranslations = faqs.map((faq) => ({
      question_pt: faq.question,
      question_en: faq.question, // Would need translation service for proper EN
      answer_pt: faq.answer,
      answer_en: faq.answer, // Would need translation service for proper EN
      category: faq.category,
      views: 0,
    }))

    const { error } = await supabase.from("faqs").insert(faqsWithTranslations)

    if (error) {
      throw new Error(`Failed to upload FAQs: ${error.message}`)
    }
  }

  static async getFAQsFromSupabase(): Promise<any[]> {
    const { data, error } = await supabase.from("faqs").select("*").order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch FAQs: ${error.message}`)
    }

    return data || []
  }
}
