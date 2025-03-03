const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Grade extends Model {}

Grade.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  min_point: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  max_point: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Grade',
});

module.exports = Grade;
