import { Pool } from 'pg';
import DbConfig from './fixtures/database'; 

export async function executeSQL(sqlScript) {
  const pool = new Pool(DbConfig);
  const client = await pool.connect();

  try {
    const result = await client.query(sqlScript);
    return result.rows;
  } finally {
    client.release();
    await pool.end();
  }
}