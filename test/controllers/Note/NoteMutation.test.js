const request = require('supertest');

const {
  beforeAction,
  afterAction,
} = require('../../helpers/setup');
const { getAccessToken } = require('../../helpers/getAccessToken');

const { User } = require('../../../api/models');
const { Note } = require('../../../api/models');

let api;
let token;

beforeAll(async () => {
  api = await beforeAction();
  token = await getAccessToken();
});

afterAll(() => {
  afterAction();
});

test('Note | create, update, delete', async () => {
  const user = await User.create({
    email: 'felix@test4.com',
  });

  const createMutation = `
    mutation {
      createNote(
        userId: ${user.id},
        note: "create note"
      ) {
        id
        userId
        note
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({ query: createMutation })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.createNote.userId).toBe(user.id);
  expect(res.body.data.createNote.note).toBe('create note');
});
