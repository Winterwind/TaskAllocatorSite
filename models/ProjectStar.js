const sequelize = require('../db');

// Junction table: User <-> Project (stars/bookmarks)
const ProjectStar = sequelize.define('ProjectStar', {});

module.exports = ProjectStar;
