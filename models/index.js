const User = require('./User');
const Project = require('./Project');
const ProjectMember = require('./ProjectMember');
const ProjectStar = require('./ProjectStar');
const Task = require('./Task');
const TaskAssignee = require('./TaskAssignee');
const Solution = require('./Solution');
const SolutionFile = require('./SolutionFile');
const Contribution = require('./Contribution');

// ── User ──────────────────────────────────────────────────────────────────────
User.hasMany(Project,      { foreignKey: 'ownerId',       as: 'ownedProjects' });
User.belongsToMany(Project, { through: ProjectMember, foreignKey: 'userId',     as: 'memberProjects' });
User.belongsToMany(Project, { through: ProjectStar,   foreignKey: 'userId',     as: 'starredProjects' });
User.hasMany(Task,         { foreignKey: 'createdById',   as: 'createdTasks' });
User.belongsToMany(Task,   { through: TaskAssignee,   foreignKey: 'userId',     as: 'assignedTasks' });
User.hasMany(Solution,     { foreignKey: 'submittedById', as: 'solutions' });
User.hasMany(Contribution, { foreignKey: 'userId',        as: 'contributions' });

// ── Project ───────────────────────────────────────────────────────────────────
Project.belongsTo(User,     { foreignKey: 'ownerId',     as: 'owner' });
Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'projectId', as: 'members' });
Project.belongsToMany(User, { through: ProjectStar,   foreignKey: 'projectId', as: 'starredBy' });
Project.hasMany(Task,         { foreignKey: 'projectId', as: 'tasks' });
Project.hasMany(Solution,     { foreignKey: 'projectId', as: 'solutions' });
Project.hasMany(Contribution, { foreignKey: 'projectId', as: 'contributions' });

// ── Task ──────────────────────────────────────────────────────────────────────
Task.belongsTo(Project,    { foreignKey: 'projectId',   as: 'project' });
Task.belongsTo(User,       { foreignKey: 'createdById', as: 'creator' });
Task.belongsToMany(User,   { through: TaskAssignee, foreignKey: 'taskId', as: 'assignees' });
Task.hasMany(Solution,     { foreignKey: 'taskId',      as: 'solutions' });

// ── Solution ──────────────────────────────────────────────────────────────────
Solution.belongsTo(Task,    { foreignKey: 'taskId',        as: 'task' });
Solution.belongsTo(Project, { foreignKey: 'projectId',     as: 'project' });
Solution.belongsTo(User,    { foreignKey: 'submittedById', as: 'submittedBy' });
Solution.hasMany(SolutionFile, { foreignKey: 'solutionId', as: 'files' });

// ── SolutionFile ──────────────────────────────────────────────────────────────
SolutionFile.belongsTo(Solution, { foreignKey: 'solutionId', as: 'solution' });

// ── Contribution ──────────────────────────────────────────────────────────────
Contribution.belongsTo(User,    { foreignKey: 'userId',    as: 'user' });
Contribution.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
  User,
  Project,
  ProjectMember,
  ProjectStar,
  Task,
  TaskAssignee,
  Solution,
  SolutionFile,
  Contribution
};
