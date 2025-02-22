const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Result extends Model {}

Result.init({
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  level_statistics: {
    type: DataTypes.JSON,
  },
}, {
  sequelize,
  modelName: 'Result',
});

module.exports = Result;
