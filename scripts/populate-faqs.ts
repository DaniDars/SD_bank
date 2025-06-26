import { FAQParser } from "../lib/faq-parser"
import { FAQVectorStore } from "../lib/vector-store"

// The FAQ data you provided
const faqData = [
  {
    question: "1.Quais são os requisitos para abrir uma conta?",
    answer: "Para maiores e menores de idade: Para abrir uma conta para um menor os requisitos são:",
  },
  {
    question: "2.É possível abrir uma conta sem ter declaração de rendimentos?",
    answer:
      "Não, pois a declaração é um requisito legal e visa fundamentar a origem dos fundos que irão movimentar a conta.",
  },
  {
    question: "4.Qual é o prazo para o levantamento dos dados da conta?",
    answer:
      "A partilha de dados é imediata após a abertura da conta. O cliente pode igualmente e a qualquer momento solicitar a informação da sua conta na agência mais próxima e nas horas normais de expediente ou então visualizar, a qualquer hora do dia, a informação a partir dos nossos canais digitais (Netplus Web, Netplus App ou QuiQ);",
  },
  // ... rest of your FAQ data
]

async function populateFAQs() {
  try {
    console.log("Parsing FAQ data...")
    const parsedFAQs = FAQParser.parseFromJSON(faqData)

    console.log("Uploading to Supabase...")
    await FAQParser.uploadToSupabase(parsedFAQs)

    console.log("Creating vector embeddings...")
    const vectorStore = new FAQVectorStore()
    await vectorStore.initialize()
    await vectorStore.addFAQs(parsedFAQs, "pt")

    console.log("FAQ population completed successfully!")
  } catch (error) {
    console.error("Error populating FAQs:", error)
  }
}

// Run if called directly
if (require.main === module) {
  populateFAQs()
}

export { populateFAQs }
