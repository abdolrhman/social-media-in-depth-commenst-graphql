const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represents a Comment',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (note) => note.id,
    },
    userId: {
      type: GraphQLInt,
      resolve: (note) => note.userId,
    },
    noteId: {
      type: GraphQLInt,
      resolve: (note) => note.noteId,
    },
    text: {
      type: GraphQLString,
      resolve: (note) => note.text,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (note) => note.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (note) => note.createdAt,
    },
  }),
});

module.exports = { CommentType };
