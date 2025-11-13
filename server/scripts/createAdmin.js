/**
 * Create Admin User Script
 * Kedai Sepijak Server
 *
 * Usage: node server/scripts/createAdmin.js
 */

import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kedai_sepijak',
  port: process.env.DB_PORT || 3306
};

async function createAdmin() {
  let connection;

  try {
    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');

    // Generate password hash
    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@kedaisepijak.com';
    const fullName = 'Administrator';
    const role = 'super_admin';

    console.log('\n🔐 Generating password hash...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hash generated');
    console.log('Hash:', hashedPassword);

    // Check if admin already exists
    console.log('\n🔍 Checking if admin exists...');
    const [existingUsers] = await connection.execute(
      'SELECT id FROM admin_users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      console.log('⚠️  Admin user already exists. Updating password...');

      // Update existing admin
      await connection.execute(
        `UPDATE admin_users
         SET password = ?,
             email = ?,
             full_name = ?,
             role = ?,
             is_active = 1,
             updated_at = NOW()
         WHERE username = ?`,
        [hashedPassword, email, fullName, role, username]
      );

      console.log('✅ Admin user updated successfully!');
    } else {
      console.log('➕ Creating new admin user...');

      // Insert new admin
      await connection.execute(
        `INSERT INTO admin_users
         (username, password, email, full_name, role, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [username, hashedPassword, email, fullName, role]
      );

      console.log('✅ Admin user created successfully!');
    }

    // Verify admin user
    console.log('\n🔍 Verifying admin user...');
    const [users] = await connection.execute(
      'SELECT id, username, email, full_name, role, is_active FROM admin_users WHERE username = ?',
      [username]
    );

    if (users.length > 0) {
      console.log('\n✅ Admin user verified:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('ID        :', users[0].id);
      console.log('Username  :', users[0].username);
      console.log('Email     :', users[0].email);
      console.log('Full Name :', users[0].full_name);
      console.log('Role      :', users[0].role);
      console.log('Active    :', users[0].is_active ? 'Yes' : 'No');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n🔑 Login Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Username  :', username);
      console.log('Password  :', password);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n🌐 Login URL: http://localhost:5173/admin/login');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the script
console.log('═══════════════════════════════════════════');
console.log('   Create Admin User - Kedai Sepijak');
console.log('═══════════════════════════════════════════\n');

createAdmin()
  .then(() => {
    console.log('\n✨ Script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
