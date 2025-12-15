const { query } = require('./src/config/database');

async function checkSchema() {
  try {
    console.log('Checking feedback table schema...');
    const columns = await query('DESCRIBE feedback');
    console.log('\nFeedback table columns:');
    console.table(columns);
    
    // Check if status column exists
    const statusColumn = columns.find(col => col.Field === 'status');
    if (statusColumn) {
      console.log('\n✅ Status column exists!');
      console.log('Type:', statusColumn.Type);
      console.log('Default:', statusColumn.Default);
    } else {
      console.log('\n❌ Status column NOT found!');
      console.log('Need to add status column to feedback table');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkSchema();
