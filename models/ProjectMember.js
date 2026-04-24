const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Junction table: User <-> Project with a role
const ProjectMember = sequelize.define('ProjectMember', {
  role: {
    type: DataTypes.STRING,   // 'owner' | 'member'
    allowNull: false,
    defaultValue: 'member'
  }
});

module.exports = ProjectMember;
