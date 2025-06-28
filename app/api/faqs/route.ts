import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const language = searchParams.get("language") || "pt"

    console.log("📊 Fetching FAQs from Supabase:", { category, search, language })

    // Build query
    let query = supabase.from("faqs").select("*")

    // Filter by category
    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    // Add search filter
    if (search) {
      const searchColumn = language === "pt" ? "question_pt" : "question_en"
      const answerColumn = language === "pt" ? "answer_pt" : "answer_en"

      query = query.or(`${searchColumn}.ilike.%${search}%,${answerColumn}.ilike.%${search}%`)
    }

    // Execute query
    const { data: faqs, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Supabase error:", error)
      throw new Error(`Failed to fetch FAQs: ${error.message}`)
    }

    // Transform for frontend
    const transformedFAQs = (faqs || []).map((faq) => ({
      id: faq.id,
      question: language === "pt" ? faq.question_pt : faq.question_en,
      answer: language === "pt" ? faq.answer_pt : faq.answer_en,
      category: faq.category,
      views: faq.views || 0,
    }))

    console.log("✅ FAQs fetched successfully:", transformedFAQs.length)

    return NextResponse.json({
      faqs: transformedFAQs,
      total: transformedFAQs.length,
    })
  } catch (error) {
    console.error("💥 FAQ API error:", error)
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}
