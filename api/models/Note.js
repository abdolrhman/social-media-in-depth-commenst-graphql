const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const { Comment } = require('./Comment');

const tableName = 'notes';

const Note = sequelize.define('Note', {
  content: {
    type: Sequelize.STRING,
  },
}, { tableName });

Note.associate = (models) => {
  Note.hasMany(Comment, { as: 'comments', foreignKey: 'noteId' });
  Note.belongsTo(models.User);
};
module.exports = { Note };
