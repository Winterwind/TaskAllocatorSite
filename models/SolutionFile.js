const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SolutionFile = sequelize.define('SolutionFile', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false    // the name stored on disk (e.g. a UUID-based name)
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false    // the original filename from the user's machine
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true     // bytes
  },
  solutionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = SolutionFile;
