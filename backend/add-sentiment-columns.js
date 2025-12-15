import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function addColumns() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kedai_sepijak'
  });
  
  console.log('📝 Adding sentiment columns to feedback table...\n');
  
  try {
    await conn.execute(`ALTER TABLE feedback ADD COLUMN sentiment_label VARCHAR(20) DEFAULT 'neutral' AFTER message`);
    console.log('✅ Added sentiment_label column');
  } catch(e) {
    if (e.message.includes('Duplicate column')) {
      console.log('⚠️  sentiment_label already exists');
    } else {
      console.error('❌ sentiment_label error:', e.message);
    }
  }
  
  try {
    await conn.execute('ALTER TABLE feedback ADD COLUMN sentiment_score INT DEFAULT 0 AFTER sentiment_label');
    console.log('✅ Added sentiment_score column');
  } catch(e) {
    if (e.message.includes('Duplicate column')) {
      console.log('⚠️  sentiment_score already exists');
    } else {
      console.error('❌ sentiment_score error:', e.message);
    }
  }
  
  try {
    await conn.execute('ALTER TABLE feedback ADD COLUMN sentiment_confidence DECIMAL(5,2) DEFAULT 0 AFTER sentiment_score');
    console.log('✅ Added sentiment_confidence column');
  } catch(e) {
    if (e.message.includes('Duplicate column')) {
      console.log('⚠️  sentiment_confidence already exists');
    } else {
      console.error('❌ sentiment_confidence error:', e.message);
    }
  }
  
  try {
    await conn.execute('CREATE INDEX idx_sentiment_label ON feedback(sentiment_label)');
    console.log('✅ Created index idx_sentiment_label');
  } catch(e) {
    if (e.message.includes('Duplicate')) {
      console.log('⚠️  Index idx_sentiment_label already exists');
    } else {
      console.error('❌ Index error:', e.message);
    }
  }
  
  // Verify
  const [cols] = await conn.query('DESCRIBE feedback');
  const sentimentCols = cols.filter(c => c.Field.includes('sentiment'));
  console.log(`\n✅ Verification: Found ${sentimentCols.length} sentiment columns`);
  sentimentCols.forEach(c => console.log(`   - ${c.Field}`));
  
  await conn.end();
  console.log('\n✅ Migration complete!');
}

addColumns().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
