-- Drop and recreate chat logs table with all required columns
DROP TABLE IF EXISTS chat_logs;

CREATE TABLE chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  tool_used TEXT,
  confidence DECIMAL(3,2),
  escalate BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  language TEXT DEFAULT 'pt',
  response_length INTEGER,
  model_used TEXT,
  error_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_chat_logs_timestamp ON chat_logs(timestamp);
CREATE INDEX idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX idx_chat_logs_language ON chat_logs(language);
