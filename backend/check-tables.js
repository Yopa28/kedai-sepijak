import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function checkTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kedai_sepijak'
    });

    console.log('📊 Checking all tables...\n');
    
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME, TABLE_ROWS, DATA_LENGTH 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ?
    `, [process.env.DB_NAME || 'kedai_sepijak']);

    console.log('Tables:');
    tables.forEach(t => {
      console.log(`  - ${t.TABLE_NAME} (${t.TABLE_ROWS} rows, ${(t.DATA_LENGTH/1024).toFixed(2)} KB)`);
    });

    // Get the first table named feedback
    const feedbackCount = tables.filter(t => t.TABLE_NAME === 'feedback').length;
    if (feedbackCount > 1) {
      console.log(`\n⚠️  WARNING: Found ${feedbackCount} tables named 'feedback'!`);
    } else if (feedbackCount === 1) {
      console.log(`\n✅ Found exactly 1 'feedback' table`);
    } else {
      console.log(`\n❌ No 'feedback' table found!`);
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkTables();
