-- ============================================
-- Create Feedback Table
-- Kedai Sepijak Backend
-- ============================================

USE kedai_sepijak;

-- Drop existing table if exists
DROP TABLE IF EXISTS feedback;

-- Create feedback table with new structure
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NULL,
    employee_name VARCHAR(255) NULL,
    contact VARCHAR(100) NULL,
    date_of_visit DATE NULL,
    time_of_visit TIME NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Detailed ratings (JSON format)
    ratings JSON NULL,
    
    message TEXT NULL,
    voluntary_consent BOOLEAN DEFAULT FALSE,
    
    -- Location data
    category VARCHAR(100) NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    
    -- System fields
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    status ENUM('pending', 'reviewed', 'resolved') DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_date_of_visit (date_of_visit),
    INDEX idx_rating (rating),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Insert sample data for testing
INSERT INTO feedback (
    customer_name, role, employee_name, contact, date_of_visit, time_of_visit,
    rating, ratings, message, voluntary_consent, category, status
) VALUES 
(
    'Test Customer',
    'kasir',
    'Sandy',
    '081284721020',
    '2025-11-13',
    '06:35:00',
    5,
    JSON_OBJECT(
        'pelayanan', JSON_OBJECT('sikap_pelayan', 5, 'waktu_pesanan', 2),
        'menu', JSON_OBJECT('rasa_menu', 5),
        'kebersihan', 5
    ),
    'Test feedback message',
    TRUE,
    'pelayanan',
    'pending'
);

-- Verify table creation
SELECT 'Feedback table created successfully' as status;
DESCRIBE feedback;
