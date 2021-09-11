const {
  createNote,
} = require('./NoteMutation');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('./UserMutation');

const {
  createComment,
} = require('./CommentMutation');

module.exports = {
  createNote,
  createUser,
  updateUser,
  deleteUser,
  createComment,
};
