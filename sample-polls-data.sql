-- Sample Polls Data for Kedai Sepijak
-- Run this to add sample polling data

USE kedai_sepijak;

-- Create polls table if not exists
CREATE TABLE IF NOT EXISTS polls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create poll_options table if not exists
CREATE TABLE IF NOT EXISTS poll_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poll_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    vote_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE
);

-- Create poll_votes table if not exists
CREATE TABLE IF NOT EXISTS poll_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poll_id INT NOT NULL,
    option_id INT NOT NULL,
    voter_ip VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE
);

-- Insert sample polls
INSERT INTO polls (question, description, is_active) VALUES
('Menu favorit pelanggan bulan ini?', 'Pilih menu yang paling Anda sukai di Kedai Sepijak', TRUE),
('Event apa yang ingin diadakan di kedai?', 'Bantu kami memilih event yang menarik untuk pelanggan', TRUE),
('Jam operasional yang diinginkan?', 'Kapan waktu terbaik untuk berkunjung ke kedai?', TRUE);

-- Insert sample poll options
INSERT INTO poll_options (poll_id, option_text, vote_count) VALUES
-- Poll 1 options (Menu favorit)
(1, 'Nasi Gudeg Spesial', 15),
(1, 'Ayam Bakar Madu', 23),
(1, 'Sate Kambing', 8),
(1, 'Es Teh Manis', 12),

-- Poll 2 options (Event)
(2, 'Live Music Acoustic', 18),
(2, 'Stand Up Comedy', 25),
(2, 'Cooking Class', 7),
(2, 'Game Night', 14),

-- Poll 3 options (Jam operasional)
(3, '07:00 - 22:00', 20),
(3, '08:00 - 23:00', 16),
(3, '09:00 - 21:00', 9),
(3, '24 Jam', 5);

-- Insert sample votes
INSERT INTO poll_votes (poll_id, option_id, voter_ip) VALUES
(1, 1, '192.168.1.1'),
(1, 2, '192.168.1.2'),
(1, 2, '192.168.1.3'),
(2, 1, '192.168.1.4'),
(2, 2, '192.168.1.5'),
(3, 1, '192.168.1.6');

SELECT 'Sample polls data inserted successfully!' as status;
