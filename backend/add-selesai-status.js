const { query } = require('./src/config/database');

async function addSelesaiStatus() {
  try {
    console.log('Adding "selesai" to status ENUM...');
    
    // Alter table to add 'selesai' to the ENUM
    await query(`
      ALTER TABLE feedback 
      MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'selesai') 
      DEFAULT 'pending'
    `);
    
    console.log('✅ Successfully added "selesai" to status ENUM!');
    
    // Verify the change
    const columns = await query('DESCRIBE feedback');
    const statusColumn = columns.find(col => col.Field === 'status');
    console.log('\nUpdated status column:');
    console.log('Type:', statusColumn.Type);
    console.log('Default:', statusColumn.Default);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

addSelesaiStatus();
