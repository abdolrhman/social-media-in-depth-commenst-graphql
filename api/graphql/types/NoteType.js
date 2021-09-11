const {GraphQLList} = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const { CommentType } = require('./CommentType');

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'This represents a Note',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (note) => note.id,
    },
    userId: {
      type: GraphQLInt,
      resolve: (note) => note.userId,
    },
    content: {
      type: GraphQLString,
      resolve: (note) => note.content,
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (note) => note.getComments(),
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

module.exports = { NoteType };
