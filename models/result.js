const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Result extends Model {}

Result.init({
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Junior"
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "progress"
  },
  correct_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  wrong_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Result',
});

module.exports = Result;
