import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface FAQ {
  id: string
  question_pt: string
  question_en: string
  answer_pt: string
  answer_en: string
  category: string
  views: number
  created_at: string
}

export interface ChatLog {
  id: string
  user_id: string
  message: string
  response: string
  tool_used?: string
  confidence: number
  escalate: boolean
  timestamp: string
}
