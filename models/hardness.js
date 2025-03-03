const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Hardness extends Model {}

Hardness.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false 
  }
}, {
  sequelize,
  modelName: 'Hardness',
});

module.exports = Hardness;
