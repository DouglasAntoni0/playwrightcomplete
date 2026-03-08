const { Pool } = require('pg');
const DbConfig = require('./fixtures/database');

async function executeSQL(sqlScript) {
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

module.exports = { executeSQL };
