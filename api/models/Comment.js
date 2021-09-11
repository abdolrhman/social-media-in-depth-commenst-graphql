const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'comments';

const Comment = sequelize.define('Comment', {
  text: Sequelize.TEXT,
  depth: Sequelize.INTEGER,
}, { tableName });

Comment.hasMany(Comment, { foreignKey: 'parentId' });

module.exports = { Comment };
