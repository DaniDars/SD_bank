-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_pt TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_pt TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
