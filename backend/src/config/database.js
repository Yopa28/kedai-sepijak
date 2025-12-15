    // ============================================
    // Database Configuration
    // Kedai Sepijak Backend
    // ============================================

    const mysql = require('mysql2/promise');
    require('dotenv').config();

    // Database configuration
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'kedai_sepijak',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        charset: 'utf8mb4'
    };

    // Create connection pool
    const pool = mysql.createPool(dbConfig);

    // Test database connection
    const testConnection = async () => {
        try {
            const connection = await pool.getConnection();
            console.log('✅ Database connected successfully!');
            console.log(`📊 Connected to: ${dbConfig.database} at ${dbConfig.host}`);
            connection.release();
            return true;
        } catch (error) {
            console.error('❌ Database connection failed:', error.message);
            return false;
        }
    };

    // Query helper function
    const query = async (sql, params = []) => {
        try {
            const [results] = await pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Query error:', error);
            throw error;
        }
    };

    // Transaction helper
    const transaction = async (callback) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const result = await callback(connection);
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    };

    // Graceful shutdown
    const closePool = async () => {
        try {
            await pool.end();
            console.log('✅ Database pool closed successfully');
        } catch (error) {
            console.error('❌ Error closing database pool:', error);
        }
    };

    module.exports = {
        pool,
        query,
        transaction,
        testConnection,
        closePool
    };
