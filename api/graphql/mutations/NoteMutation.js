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

const updateNote = {
  type: NoteType,
  description: 'The mutation that allows you to update an existing Note by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    content: {
      name: 'content',
      type: GraphQLString,
    },
  },
  resolve: async (value, { id, userId, content }) => {
    const foundNote = await Note.findByPk(id);

    if (!foundNote) {
      throw new Error(`Note with id: ${id} not found!`);
    }

    const updatedNote = merge(foundNote, {
      userId,
      content,
    });

    return foundNote.update(updatedNote);
  },
};

const deleteNote = {
  type: NoteType,
  description: 'The mutation that allows you to delete a existing Note by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, { id }) => {
    const foundNote = await Note.findByPk(id);

    if (!foundNote) {
      throw new Error(`Note with id: ${id} not found!`);
    }

    await Note.destroy({
      where: {
        id,
      },
    });

    return foundNote;
  },
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
};
