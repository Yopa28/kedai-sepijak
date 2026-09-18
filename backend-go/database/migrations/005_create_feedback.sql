CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    customer_name VARCHAR(255),
    employee_name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    contact VARCHAR(50),

    date_of_visit DATE,
    time_of_visit TIME,

    rating TINYINT UNSIGNED,

    ratings JSON,

    message TEXT,

    voluntary_consent BOOLEAN NOT NULL DEFAULT FALSE,

    category VARCHAR(100),

    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),

    status VARCHAR(50) NOT NULL DEFAULT 'pending',

    sentiment VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_feedback_rating
        CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),

    CONSTRAINT chk_feedback_consent
        CHECK (voluntary_consent = TRUE)
);