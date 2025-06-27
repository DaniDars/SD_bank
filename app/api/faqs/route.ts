import { type NextRequest, NextResponse } from "next/server"
import { FAQParser } from "@/lib/faq-parser"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const language = searchParams.get("language") || "pt"

    let faqs = await FAQParser.getFAQsFromSupabase()

    // Filter by category
    if (category && category !== "all") {
      faqs = faqs.filter((faq) => faq.category === category)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      faqs = faqs.filter((faq) => {
        const question = language === "pt" ? faq.question_pt : faq.question_en
        const answer = language === "pt" ? faq.answer_pt : faq.answer_en
        return question.toLowerCase().includes(searchLower) || answer.toLowerCase().includes(searchLower)
      })
    }

    // Transform for frontend
    const transformedFAQs = faqs.map((faq) => ({
      id: faq.id,
      question: language === "pt" ? faq.question_pt : faq.question_en,
      answer: language === "pt" ? faq.answer_pt : faq.answer_en,
      category: faq.category,
      views: faq.views,
    }))

    return NextResponse.json({
      faqs: transformedFAQs,
      total: transformedFAQs.length,
    })
  } catch (error) {
    console.error("FAQ API error:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}
