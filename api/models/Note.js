const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const { Comment } = require('./Comment');

const tableName = 'notes';

const Note = sequelize.define('Note', {
  content: {
    type: Sequelize.STRING,
  },
}, { tableName });

Note.hasMany(Comment, { as: 'comments', foreignKey: 'noteId' });

// Note.belongsTo(User);
module.exports = { Note };
