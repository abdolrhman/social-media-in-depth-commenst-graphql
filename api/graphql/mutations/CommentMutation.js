const { GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const merge = require('lodash.merge');

const { CommentType } = require('../types');
const { Comment } = require('../../models');

// text: req.body.text,
//     depth: parentComment ? parentComment.depth + 1 : 0,
//     userId: req.context.me.id,
//     postId: req.params.postId,
//     parentId: parentComment ? parentComment.id : null

const createComment = {
  type: CommentType,
  description: 'The mutation that allows you to create a new Comment',
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    noteId: {
      name: 'noteId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    parentComment: {
      name: 'parentComment',
      type: GraphQLInt,
    },
    text: {
      name: 'content',
      type: new GraphQLNonNull(GraphQLString),
    },
    depth: {
      name: 'depth',
      type: GraphQLInt,
    },
  },
  resolve: (value, {
    userId, noteId, parentComment, text,
  }) => Comment.create({
    userId,
    text,
    noteId,
    parentId: (parentComment ? parentComment.id : null),
    depth: (parentComment ? parentComment.depth + 1 : 0),
  }),
};

module.exports = {
  createComment,
};
