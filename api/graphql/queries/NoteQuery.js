const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const db = require('../../../config/database');

const { NoteType } = require('../types');
const { Note } = require('../../models');

const noteQuery = {
  type: new GraphQLList(NoteType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    content: {
      name: 'content',
      type: GraphQLString,
    },
    comments: {
      name: 'comments',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => Note.findAll({ where: args }),
};

const withCommentsQuery = (noteId) => `
  WITH RECURSIVE cte (path, pathString, id, "userId", "authorName", "createdAt", "updatedAt", depth, text, "noteId", "parentId") AS (
    SELECT ARRAY[C1.id], 
      C1.id::text,
      C1.id,
      "userId",
      users.name,
      C1."createdAt",
      C1."updatedAt",
      depth,
      text,
      "noteId",
      "parentId"
    FROM comments C1
    INNER JOIN users ON ("userId" = users.id)
    WHERE "parentId" IS NULL AND "noteId" = ${noteId}
    UNION ALL
    SELECT cte.path || comments.id,
      cte.pathString || comments.id,
      comments.id,
      "comments"."userId",
      users.name,
      "comments"."createdAt",
      "comments"."updatedAt",
      comments.depth,
      comments.text,
      "comments"."noteId",
      "comments"."parentId"
    FROM comments
    INNER JOIN users ON ("comments"."userId" = users.id)
    JOIN cte ON "comments"."parentId" = cte.id
  )
  SELECT * FROM cte
  ORDER BY path;    
`;

const noteComments = {
  type: NoteType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    content: {
      name: 'content',
      type: GraphQLString,
    },
    comments: {
      name: 'comments',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (user, args) => {
    const note = await Note.findOne({ id: args.id });
    const [comments] = await db.query(withCommentsQuery(args.id));
    note.setDataValue('comments', comments);
    return note;
  },
};


module.exports = { noteQuery, noteComments };
