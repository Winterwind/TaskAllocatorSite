const sequelize = require('../db');

// Junction table: User <-> Task (assignments)
const TaskAssignee = sequelize.define('TaskAssignee', {});

module.exports = TaskAssignee;
