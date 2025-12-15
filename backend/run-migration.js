import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function runMigration() {
  try {
    // Read the SQL file from parent directory
    const sqlFile = path.join(__dirname, '..', 'add-sentiment-columns.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kedai_sepijak'
    });

    console.log('✅ Connected to database');
    console.log(`📊 Database: ${process.env.DB_NAME || 'kedai_sepijak'}`);

    // Split the SQL content by semicolon and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      try {
        console.log(`\n📝 Executing: ${statement.substring(0, 60)}...`);
        await connection.execute(statement);
        console.log('✅ Success');
      } catch (err) {
        // If it's an "already exists" error, it's OK
        if (err.message.includes('already exists') || err.message.includes('IF NOT EXISTS')) {
          console.log('⚠️  Skipped (already exists)');
        } else {
          console.error('❌ Error:', err.message);
          throw err;
        }
      }
    }

    await connection.end();
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
