// models/post.js
const { DataTypes } = require('sequelize');
const sequelize = db.init();
db.connect(sequelize);

const Board = sequelize.define('Board', {
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
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  board_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Board;
