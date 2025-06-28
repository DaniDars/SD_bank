import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    console.log("👁️ Incrementing view count for FAQ:", id)

    // First get the current view count
    const { data: currentData, error: fetchError } = await supabase.from("faqs").select("views").eq("id", id).single()

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    const newViewCount = (currentData.views || 0) + 1

    // Update with the new view count
    const { data, error } = await supabase
      .from("faqs")
      .update({ views: newViewCount })
      .eq("id", id)
      .select("views")
      .single()

    if (error) {
      console.error("❌ Supabase update error:", error)
      return NextResponse.json({ error: "Failed to update view count" }, { status: 500 })
    }

    console.log("✅ View count updated:", data.views)

    return NextResponse.json({
      success: true,
      views: data.views,
    })
  } catch (error) {
    console.error("💥 FAQ view increment error:", error)
    return NextResponse.json({ error: "Failed to increment view count" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const { data, error } = await supabase.from("faqs").select("views").eq("id", id).single()

    if (error) {
      console.error("❌ Supabase error:", error)
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    return NextResponse.json({
      views: data.views || 0,
    })
  } catch (error) {
    console.error("💥 FAQ view fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch view count" }, { status: 500 })
  }
}
