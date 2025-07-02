// connectDB.js
import dotenv from 'dotenv';
import pkg from 'pg';
// Importing dotenv to manage environment variables
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME ,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: false
});

async function connectDB() {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ Failed to connect to PostgreSQL:', err);
    process.exit(1); // optional: crash the app if DB is critical
  }
}

export {connectDB};
export default pool;
