const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Question extends Model {}

Question.init({
  question_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'Question',
});

module.exports = Question;
