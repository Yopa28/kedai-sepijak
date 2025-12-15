import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function testQuery() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kedai_sepijak'
    });

    console.log('📊 Testing the exact query from the API...\n');
    
    // Test the exact query
    const query = `SELECT id, message, NULL AS rating, sentiment_label, sentiment_score, sentiment_confidence, created_at FROM feedback WHERE DATE(created_at) BETWEEN ? AND ? ORDER BY created_at DESC LIMIT 100`;
    
    console.log('Query:', query);
    console.log('Params: ["2025-11-15", "2025-12-15"]');
    console.log('');
    
    try {
      const [results] = await connection.execute(query, ["2025-11-15", "2025-12-15"]);
      console.log(`✅ Query succeeded! Returned ${results.length} rows`);
      console.log('\nResults:');
      results.forEach(r => {
        console.log(`  - ID: ${r.id}, Message: ${r.message ? r.message.substring(0, 30) : 'null'}, Sentiment: ${r.sentiment_label}`);
      });
    } catch (err) {
      console.error('❌ Query failed:', err.message);
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
}

testQuery();
