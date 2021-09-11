const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { NoteType } = require('../types');
const { Note } = require('../../models');

const createNote = {
  type: NoteType,
  description: 'The mutation that allows you to create a new Note',
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    content: {
      name: 'content',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (value, { userId, content }) => (
    Note.create({
      userId,
      content,
    })
  ),
};

module.exports = {
  createNote,
};
