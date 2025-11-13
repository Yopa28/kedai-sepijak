-- ============================================
-- Database Cleanup & Setup Script
-- Kedai Sepijak - Optimized Database Structure
-- ============================================

-- Gunakan database
USE kedai_sepijak;

-- ============================================
-- STEP 1: Backup Data Penting (Opsional)
-- ============================================
-- Uncomment jika ingin backup data sebelum cleanup
-- CREATE TABLE backup_feedback AS SELECT * FROM feedback;
-- CREATE TABLE backup_waiters AS SELECT * FROM waiters;
-- CREATE TABLE backup_polls AS SELECT * FROM polls;

-- ============================================
-- STEP 2: Hapus Tabel yang Tidak Diperlukan
-- ============================================

-- Hapus tabel yang tidak digunakan
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS settings;

-- Opsional: Hapus vouchers jika tidak digunakan
-- DROP TABLE IF EXISTS vouchers;

-- ============================================
-- STEP 3: Bersihkan Data Lama (Opsional)
-- ============================================

-- Hapus feedback lama (lebih dari 1 tahun)
-- DELETE FROM feedback WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- Hapus poll yang sudah expired
-- DELETE FROM polls WHERE end_date < DATE_SUB(NOW(), INTERVAL 6 MONTH);

-- ============================================
-- STEP 4: Optimasi Tabel
-- ============================================

-- Optimasi semua tabel yang dipertahankan
OPTIMIZE TABLE admin_users;
OPTIMIZE TABLE waiters;
OPTIMIZE TABLE feedback;
OPTIMIZE TABLE polls;
OPTIMIZE TABLE poll_options;
OPTIMIZE TABLE poll_votes;
OPTIMIZE TABLE menu_categories;
OPTIMIZE TABLE menu_items;

-- ============================================
-- STEP 5: Insert/Update Data Admin Default
-- ============================================

-- Hapus admin lama jika ada
DELETE FROM admin_users WHERE username = 'admin';

-- Insert admin default
-- Password: admin123 (hashed dengan bcrypt)
INSERT INTO admin_users (username, password, email, full_name, role, is_active, created_at, updated_at)
VALUES (
    'admin',
    '$2a$10$YQ98PkKJYL5H1K2YZ5ZxNOXxLQJxF5G9vJvKkGJQ.Qx3z3F7N3zZm', -- password: admin123
    'admin@kedaisepijak.com',
    'Administrator',
    'super_admin',
    1,
    NOW(),
    NOW()
);

-- ============================================
-- STEP 6: Insert Data Sample Waiters (Jika Kosong)
-- ============================================

-- Cek dan insert waiters jika belum ada
INSERT IGNORE INTO waiters (id, name, phone, status, created_at, updated_at)
VALUES
    (1, 'Budi Santoso', '08123456701', 'active', NOW(), NOW()),
    (2, 'Siti Nurhaliza', '08123456702', 'active', NOW(), NOW()),
    (3, 'Andi Wijaya', '08123456703', 'active', NOW(), NOW()),
    (4, 'Dewi Lestari', '08123456704', 'active', NOW(), NOW()),
    (5, 'Rudi Hartono', '08123456705', 'active', NOW(), NOW()),
    (6, 'Maya Sari', '08123456706', 'inactive', NOW(), NOW()),
    (7, 'Joko Widodo', '08123456707', 'active', NOW(), NOW()),
    (8, 'Ani Yudhoyono', '08123456708', 'active', NOW(), NOW());

-- ============================================
-- STEP 7: Insert Data Sample Feedback (Jika Kosong)
-- ============================================

-- Insert sample feedback
INSERT IGNORE INTO feedback (id, customer_name, rating, category, comment, waiter_id, created_at)
VALUES
    (1, 'Ahmad', 5, 'makanan', 'Makanan enak sekali, porsi besar dan harga terjangkau!', 1, NOW() - INTERVAL 1 DAY),
    (2, 'Siti', 4, 'pelayanan', 'Pelayanan ramah, tapi agak lama menunggu', 2, NOW() - INTERVAL 2 DAY),
    (3, 'Budi', 5, 'suasana', 'Tempatnya nyaman dan bersih', 1, NOW() - INTERVAL 3 DAY),
    (4, 'Dewi', 3, 'makanan', 'Rasanya kurang pas di lidah saya', 3, NOW() - INTERVAL 4 DAY),
    (5, 'Andi', 5, 'pelayanan', 'Pelayan sangat ramah dan helpful!', 2, NOW() - INTERVAL 5 DAY),
    (6, 'Maya', 4, 'suasana', 'Tempatnya cozy, cocok untuk nongkrong', 4, NOW() - INTERVAL 6 DAY),
    (7, 'Rudi', 5, 'makanan', 'Nasi gorengnya juara!', 1, NOW() - INTERVAL 7 DAY);

-- ============================================
-- STEP 8: Insert Data Sample Menu Categories
-- ============================================

-- Insert menu categories
INSERT IGNORE INTO menu_categories (id, name, description, display_order, is_active, created_at, updated_at)
VALUES
    (1, 'Makanan', 'Berbagai pilihan makanan lezat', 1, 1, NOW(), NOW()),
    (2, 'Minuman', 'Minuman segar dan hangat', 2, 1, NOW(), NOW()),
    (3, 'Snack', 'Camilan ringan', 3, 1, NOW(), NOW()),
    (4, 'Paket', 'Paket hemat', 4, 1, NOW(), NOW());

-- ============================================
-- STEP 9: Insert Data Sample Menu Items
-- ============================================

-- Insert sample menu items
INSERT IGNORE INTO menu_items (id, category_id, name, description, price, image_url, is_available, created_at, updated_at)
VALUES
    (1, 1, 'Nasi Goreng Special', 'Nasi goreng dengan telur, ayam, dan sayuran', 25000, NULL, 1, NOW(), NOW()),
    (2, 1, 'Mie Goreng', 'Mie goreng pedas dengan topping lengkap', 23000, NULL, 1, NOW(), NOW()),
    (3, 1, 'Ayam Geprek', 'Ayam crispy dengan sambal geprek pedas', 28000, NULL, 1, NOW(), NOW()),
    (4, 2, 'Es Teh Manis', 'Teh manis dingin segar', 5000, NULL, 1, NOW(), NOW()),
    (5, 2, 'Jus Alpukat', 'Jus alpukat segar tanpa gula', 15000, NULL, 1, NOW(), NOW()),
    (6, 2, 'Kopi Susu', 'Kopi susu hangat', 12000, NULL, 1, NOW(), NOW()),
    (7, 3, 'Pisang Goreng', 'Pisang goreng crispy', 10000, NULL, 1, NOW(), NOW()),
    (8, 3, 'Tahu Crispy', 'Tahu goreng crispy dengan saus', 8000, NULL, 1, NOW(), NOW()),
    (9, 4, 'Paket Hemat 1', 'Nasi goreng + es teh', 28000, NULL, 1, NOW(), NOW()),
    (10, 4, 'Paket Hemat 2', 'Ayam geprek + jus alpukat', 40000, NULL, 1, NOW(), NOW());

-- ============================================
-- STEP 10: Insert Data Sample Polls/Event
-- ============================================

-- Insert sample polls
INSERT IGNORE INTO polls (id, question, description, start_date, end_date, is_active, created_at, updated_at)
VALUES
    (1, 'Event Anniversary Kedai Sepijak - Pilih Hiburan Favorit', 'Pilih hiburan yang ingin ditampilkan di event anniversary', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (2, 'Menu Baru Favorit', 'Pilih menu baru yang ingin ditambahkan', NOW(), NOW() + INTERVAL 14 DAY, 1, NOW(), NOW());

-- Insert poll options
INSERT IGNORE INTO poll_options (id, poll_id, option_text, vote_count, created_at, updated_at)
VALUES
    -- Poll 1 options
    (1, 1, 'Live Music', 15, NOW(), NOW()),
    (2, 1, 'Stand Up Comedy', 23, NOW(), NOW()),
    (3, 1, 'Magic Show', 8, NOW(), NOW()),
    (4, 1, 'DJ Performance', 12, NOW(), NOW()),
    -- Poll 2 options
    (5, 2, 'Sate Ayam', 18, NOW(), NOW()),
    (6, 2, 'Bakso', 25, NOW(), NOW()),
    (7, 2, 'Soto Ayam', 11, NOW(), NOW()),
    (8, 2, 'Rawon', 9, NOW(), NOW());

-- ============================================
-- STEP 11: Verify Data
-- ============================================

-- Check admin users
SELECT 'Admin Users:' as Info;
SELECT id, username, email, full_name, role, is_active FROM admin_users;

-- Check waiters
SELECT 'Waiters:' as Info;
SELECT id, name, phone, status FROM waiters;

-- Check feedback count
SELECT 'Feedback Count:' as Info;
SELECT COUNT(*) as total_feedback FROM feedback;

-- Check polls
SELECT 'Active Polls:' as Info;
SELECT id, question, is_active FROM polls WHERE is_active = 1;

-- Check menu items count
SELECT 'Menu Items Count:' as Info;
SELECT COUNT(*) as total_items FROM menu_items;

-- ============================================
-- STEP 12: Database Statistics
-- ============================================

SELECT
    'Database Size After Cleanup:' as Info,
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'kedai_sepijak';

-- Show remaining tables
SELECT
    'Remaining Tables:' as Info,
    table_name as 'Table Name',
    ROUND((data_length + index_length) / 1024, 2) as 'Size (KB)',
    table_rows as 'Rows'
FROM information_schema.TABLES
WHERE table_schema = 'kedai_sepijak'
ORDER BY (data_length + index_length) DESC;

-- ============================================
-- CLEANUP COMPLETE!
-- ============================================
-- Database telah dioptimasi dan data default telah dimasukkan
-- Login credentials:
--   Username: admin
--   Password: admin123
-- ============================================
