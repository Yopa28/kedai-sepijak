CREATE TABLE IF NOT EXISTS poll_votes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    poll_id BIGINT UNSIGNED NOT NULL,
    option_id BIGINT UNSIGNED NOT NULL,

    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_poll_votes_poll
        FOREIGN KEY (poll_id)
        REFERENCES polls(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_poll_votes_option
        FOREIGN KEY (option_id)
        REFERENCES poll_options(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_poll_phone
        UNIQUE (poll_id, customer_phone)
);