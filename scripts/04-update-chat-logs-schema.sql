-- Update chat_logs table to ensure all required columns exist
ALTER TABLE chat_logs 
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'pt',
ADD COLUMN IF NOT EXISTS response_length INTEGER,
ADD COLUMN IF NOT EXISTS model_used TEXT,
ADD COLUMN IF NOT EXISTS error_details TEXT;

-- Update existing records to have default language
UPDATE chat_logs SET language = 'pt' WHERE language IS NULL;

-- Create additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_logs_language ON chat_logs(language);
CREATE INDEX IF NOT EXISTS idx_chat_logs_confidence ON chat_logs(confidence);
CREATE INDEX IF NOT EXISTS idx_chat_logs_escalate ON chat_logs(escalate);

-- Add some sample data for testing (optional)
INSERT INTO chat_logs (user_id, message, response, tool_used, confidence, escalate, language, model_used) 
VALUES 
('test_user_1', 'Olá, como posso abrir uma conta?', 'Olá! Para abrir uma conta no Standard Bank...', 'groq_llama4_scout', 0.95, false, 'pt', 'meta-llama/llama-4-scout-17b-16e-instruct'),
('test_user_2', 'Hello, how can I check my balance?', 'Hello! You can check your balance through...', 'groq_llama4_scout', 0.90, false, 'en', 'meta-llama/llama-4-scout-17b-16e-instruct')
ON CONFLICT DO NOTHING;
