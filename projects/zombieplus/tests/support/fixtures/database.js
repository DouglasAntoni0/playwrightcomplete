require('../helpers/env')();

const shouldUseSsl =
  process.env.DB_SSL === 'true' || process.env.PGSSLMODE === 'require';

const DbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

if (shouldUseSsl) {
  DbConfig.ssl = {
    rejectUnauthorized: false,
  };
}

module.exports = DbConfig;
