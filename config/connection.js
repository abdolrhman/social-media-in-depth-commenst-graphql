const development = {
  database: process.env.POSTGRES_DB_NAME || 'socialmedia',
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASSWORD || 'root',
  host: process.env.POSTGRES_HOST || 'localhost',
  dialect: process.env.POSTGRES_DIACT || 'postgres',
};

const testing = {
  database: process.env.POSTGRES_DB_NAME || 'databasename',
  username: process.env.POSTGRES_USER || 'root',
  password: process.env.POSTGRES_PASSWORD || 'root',
  host: process.env.POSTGRES_HOST || 'localhost',
  dialect: process.env.POSTGRES_DIACT || 'postgres',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};

module.exports = {
  development,
  testing,
  production,
};
