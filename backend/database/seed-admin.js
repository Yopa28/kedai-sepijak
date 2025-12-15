// ============================================
// Seed Default Admin User
// Kedai Sepijak Backend
// ============================================

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seedAdmin() {
  let connection;

  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kedai_sepijak'
    });

    console.log('✅ Connected to database');

    // Check if admin_users table exists
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'admin_users'"
    );

    if (tables.length === 0) {
      console.log('❌ Table admin_users does not exist. Please run migrations first.');
      process.exit(1);
    }

    // Check if admin already exists
    const [existingAdmins] = await connection.query(
      'SELECT * FROM admin_users WHERE username = ?',
      ['admin']
    );

    if (existingAdmins.length > 0) {
      console.log('⚠️  Default admin user already exists');
      console.log('   Username: admin');
      console.log('   To reset password, delete the existing user first.');
      process.exit(0);
    }

    // Hash password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert default admin
    await connection.query(`
      INSERT INTO admin_users (username, password, full_name, role, email, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      'admin',
      hashedPassword,
      'Administrator',
      'super_admin',
      'admin@kedaisepijak.com',
      1
    ]);

    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   ✅ Default Admin User Created!          ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
    console.log('📝 Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Please change the password after first login!');
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
}

// Run the seed function
seedAdmin();
