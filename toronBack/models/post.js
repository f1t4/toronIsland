
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Board = sequelize.define('Board', {
  // 적절한 필드들을 정의해주세요
  board_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  board_create: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  board_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Board;
