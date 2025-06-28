"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, XCircle, Zap } from "lucide-react"

interface AIStatusData {
  ai_status: string
  components: {
    groq_api: { status: string }
    supabase: { status: string }
    chat_interface: { status: string }
  }
  performance: {
    total_chats_24h: number
    avg_confidence_percentage: number
    escalation_rate_percentage: number
  }
}

export default function AIStatusIndicator() {
  const [status, setStatus] = useState<AIStatusData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/ai-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to check AI status:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        <span className="text-sm">Checking AI...</span>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="flex items-center space-x-2 text-red-500">
        <XCircle className="h-4 w-4" />
        <span className="text-sm">AI Status Unknown</span>
      </div>
    )
  }

  const getStatusIcon = () => {
    switch (status.ai_status) {
      case "fully_operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (status.ai_status) {
      case "fully_operational":
        return "AI Fully Operational"
      case "degraded":
        return "AI Limited"
      default:
        return "AI Offline"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium text-gray-900">{getStatusText()}</span>
        </div>
        <Zap className="h-4 w-4 text-blue-500" />
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-semibold text-gray-900">{status.performance.total_chats_24h}</div>
          <div className="text-gray-500">Chats 24h</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{status.performance.avg_confidence_percentage}%</div>
          <div className="text-gray-500">Confidence</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{status.performance.escalation_rate_percentage}%</div>
          <div className="text-gray-500">Escalations</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Groq API: {status.components.groq_api.status}</span>
          <span>Database: {status.components.supabase.status}</span>
        </div>
      </div>
    </div>
  )
}
