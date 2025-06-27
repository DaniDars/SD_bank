import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // First get the current view count
    const { data: currentData, error: fetchError } = await supabase.from("faqs").select("views").eq("id", id).single()

    if (fetchError) {
      throw fetchError
    }

    // Increment view count
    const newViews = (currentData?.views || 0) + 1

    const { error } = await supabase.from("faqs").update({ views: newViews }).eq("id", id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("FAQ view increment error:", error)
    return NextResponse.json({ error: "Failed to increment view count" }, { status: 500 })
  }
}
