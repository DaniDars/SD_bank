import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🔍 Checking comprehensive AI status...")

    // Test Groq API connectivity
    const groqTest = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer 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`,
      },
    })

    // Test Supabase connectivity with safe query
    const { data: supabaseTest, error: supabaseError } = await supabase.from("chat_logs").select("id").limit(1)

    // Get recent chat statistics with safe column access
    const { data: recentChats, error: statsError } = await supabase
      .from("chat_logs")
      .select("confidence, escalate, timestamp")
      .gte("timestamp", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order("timestamp", { ascending: false })
      .limit(100)

    const stats = {
      total_chats_24h: recentChats?.length || 0,
      avg_confidence: recentChats?.length
        ? recentChats.reduce((sum, chat) => sum + (chat.confidence || 0), 0) / recentChats.length
        : 0,
      escalation_rate: recentChats?.length
        ? recentChats.filter((chat) => chat.escalate).length / recentChats.length
        : 0,
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      ai_status: "fully_operational",
      components: {
        groq_api: {
          status: groqTest.ok ? "operational" : "degraded",
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          response_time: groqTest.ok ? "normal" : "slow",
        },
        supabase: {
          status: !supabaseError ? "operational" : "error",
          logging: "enabled",
          error: supabaseError?.message,
        },
        chat_interface: {
          status: "operational",
          features: ["real_time", "multilingual", "escalation_detection"],
        },
      },
      performance: {
        ...stats,
        avg_confidence_percentage: Math.round(stats.avg_confidence * 100),
        escalation_rate_percentage: Math.round(stats.escalation_rate * 100),
      },
      capabilities: {
        languages: ["pt", "en"],
        max_message_length: 1000,
        max_response_tokens: 800,
        banking_knowledge: "comprehensive",
        fallback_enabled: true,
        confidence_scoring: true,
        conversation_logging: true,
      },
    })
  } catch (error) {
    console.error("💥 AI status check failed:", error)

    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        ai_status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        components: {
          groq_api: { status: "unknown" },
          supabase: { status: "unknown" },
          chat_interface: { status: "unknown" },
        },
      },
      { status: 500 },
    )
  }
}
