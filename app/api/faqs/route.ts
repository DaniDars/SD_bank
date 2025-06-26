import { type NextRequest, NextResponse } from "next/server"
import { faqs } from "@/lib/faqs"

// In-memory view counter (shared with the view route)
const viewCounts: Record<string, number> = {}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const language = searchParams.get("language") || "pt"

    let filteredFaqs = [...faqs]

    // Filter by category
    if (category && category !== "all") {
      filteredFaqs = filteredFaqs.filter((faq) => faq.category === category)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredFaqs = filteredFaqs.filter((faq) => {
        const question = language === "pt" ? faq.question.pt : faq.question.en
        const answer = language === "pt" ? faq.answer.pt : faq.answer.en
        return question.toLowerCase().includes(searchLower) || answer.toLowerCase().includes(searchLower)
      })
    }

    // Transform for frontend with updated view counts
    const transformedFAQs = filteredFaqs.map((faq) => ({
      id: faq.id,
      question: language === "pt" ? faq.question.pt : faq.question.en,
      answer: language === "pt" ? faq.answer.pt : faq.answer.en,
      category: faq.category,
      views: viewCounts[faq.id] || faq.views || 0, // Use updated view count if available
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
