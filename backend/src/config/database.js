const mysql = require('mysql2/promise');
require('dotenv').config();

// 1. Buat Pool Koneksi
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

// 2. Fungsi Helper untuk Test Koneksi
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database connected successfully!");
        connection.release();
        return true;
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        return false;
    }
};

// 3. Fungsi Helper untuk Query (SOLUSI ERROR KAMU DISINI)
// Ini jembatan supaya controller bisa panggil db.query()
const query = async (sql, params) => {
    const [results] = await pool.query(sql, params);
    return results;
};

const closePool = async () => {
    await pool.end();
};

// 4. Export semuanya
module.exports = {
    pool,
    testConnection,
    closePool,
    query // <--- PENTING: Kita export fungsi query-nya
};