require('dotenv').config();

module.exports = {
  local: {
    client: 'postgres',
    connection: {
      database: 'hoteling_local',
      user: 'me',
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },

  development: {
    client: 'mssql',
    connection: {
      user: 'admin',
      password: 'password12345',
      server: process.env.DB_HOST.toString(),
      database: process.env.DB_NAME_DEV,
      port: parseInt(process.env.DB_PORT, 10),
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: process.env.CLEINT_PROD,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_HOST.toString(),
      database: process.env.DB_NAME_PROD,
      port: parseInt(process.env.DB_PORT, 10),
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },
};
