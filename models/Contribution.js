const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// One row = one contribution event.
// type: 'task_created' | 'solution_submitted' | 'project_edited'
// referenceId: the id of the relevant Task or Solution (null for project_edited)
const Contribution = sequelize.define('Contribution', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  referenceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Contribution;
