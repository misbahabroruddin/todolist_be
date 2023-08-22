const dotenv = require('dotenv');
dotenv.config();

const config = {
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_PROD,
    host: process.env.HOST_PROD,
    dialect: 'postgres',
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_DEV,
    host: process.env.HOST_DEV,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST_TEST,
    dialect: 'postgres',
  },
};

module.exports = config;
