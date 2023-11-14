const Sequelize = require('sequelize');
require('dotenv').config();

const databaseConfig = {
  development: {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
  },
};

const environment = process.env.NODE_ENV || 'development';
const config = databaseConfig[environment];

const sequelize = new Sequelize(
  process.env[config.use_env_variable] || process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  config
);

module.exports = sequelize;
