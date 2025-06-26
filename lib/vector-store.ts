import { OpenAIEmbeddings } from "@langchain/openai"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { Document } from "@langchain/core/documents"
import { supabase } from "./supabase"

export class FAQVectorStore {
  private vectorStore: SupabaseVectorStore
  private embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
    })
  }

  async initialize() {
    this.vectorStore = await SupabaseVectorStore.fromExistingIndex(this.embeddings, {
      client: supabase,
      tableName: "documents",
      queryName: "match_documents",
    })
  }

  async addFAQs(faqs: any[], language: "pt" | "en" = "pt") {
    const documents = faqs.map((faq, index) => {
      const question = language === "pt" ? faq.question_pt || faq.question : faq.question_en || faq.question
      const answer = language === "pt" ? faq.answer_pt || faq.answer : faq.answer_en || faq.answer

      return new Document({
        pageContent: `Question: ${question}\nAnswer: ${answer}`,
        metadata: {
          id: faq.id || `faq_${index}`,
          category: faq.category || "general",
          language,
          type: "faq",
        },
      })
    })

    await this.vectorStore.addDocuments(documents)
  }

  async searchSimilar(
    query: string,
    k = 3,
  ): Promise<{
    documents: Document[]
    scores: number[]
  }> {
    const results = await this.vectorStore.similaritySearchWithScore(query, k)

    return {
      documents: results.map(([doc]) => doc),
      scores: results.map(([, score]) => score),
    }
  }
}
