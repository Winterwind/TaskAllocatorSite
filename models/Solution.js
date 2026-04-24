const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Solution = sequelize.define('Solution', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,   // 'pending' | 'approved' | 'rejected'
    allowNull: false,
    defaultValue: 'pending'
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  submittedById: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Solution;
