-- ============================================
-- Add Sentiment Analysis Columns to Feedback
-- Kedai Sepijak Backend
-- ============================================

USE kedai_sepijak;

-- Check if columns exist before adding
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_label VARCHAR(20) DEFAULT 'neutral' AFTER message;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_score INT DEFAULT 0 AFTER sentiment_label;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS sentiment_confidence DECIMAL(5,2) DEFAULT 0 AFTER sentiment_score;

-- Add indexes for sentiment queries
CREATE INDEX IF NOT EXISTS idx_sentiment_label ON feedback(sentiment_label);
CREATE INDEX IF NOT EXISTS idx_sentiment_score ON feedback(sentiment_score);

-- Create sentiment statistics view untuk analytics
CREATE OR REPLACE VIEW feedback_sentiment_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_feedback,
    SUM(CASE WHEN sentiment_label = 'positive' THEN 1 ELSE 0 END) as positive_count,
    SUM(CASE WHEN sentiment_label = 'negative' THEN 1 ELSE 0 END) as negative_count,
    SUM(CASE WHEN sentiment_label = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
    ROUND(AVG(rating), 2) as avg_rating,
    ROUND(AVG(sentiment_score), 2) as avg_sentiment_score
FROM feedback
GROUP BY DATE(created_at)
ORDER BY date DESC;
