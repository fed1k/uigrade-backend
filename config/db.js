const { configDotenv } = require('dotenv');
const { Sequelize } = require('sequelize');
configDotenv()

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

module.exports = sequelize;
