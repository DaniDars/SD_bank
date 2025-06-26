import { type NextRequest, NextResponse } from "next/server"
import { faqs } from "@/lib/faqs"

// In-memory view counter (in production, you'd use a database)
const viewCounts: Record<string, number> = {}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Find the FAQ to make sure it exists
    const faq = faqs.find((f) => f.id === id)

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    // Increment view count in memory
    viewCounts[id] = (viewCounts[id] || faq.views || 0) + 1

    return NextResponse.json({
      success: true,
      views: viewCounts[id],
    })
  } catch (error) {
    console.error("FAQ view increment error:", error)
    return NextResponse.json({ error: "Failed to increment view count" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const faq = faqs.find((f) => f.id === id)

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json({
      views: viewCounts[id] || faq.views || 0,
    })
  } catch (error) {
    console.error("FAQ view fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch view count" }, { status: 500 })
  }
}
