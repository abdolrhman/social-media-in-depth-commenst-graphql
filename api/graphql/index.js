const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const { userQuery } = require('./queries');
const {
  updateUser,
  deleteUser,
} = require('./mutations');
const { noteQuery, noteComments } = require('./queries');
const {
  createNote,
  createUser,
  createComment,
} = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    user: userQuery,
    note: noteQuery,
    noteComments,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    updateUser,
    deleteUser,
    createUser,
    createNote,
    createComment,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = { schema };
