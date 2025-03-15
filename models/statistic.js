const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Stat extends Model { }

Stat.init({
  tg_visit_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fully_completed_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unfinished_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Stat',
});

module.exports = Stat;