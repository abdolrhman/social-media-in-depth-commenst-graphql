const request = require('supertest');

const {
  beforeAction,
  afterAction,
} = require('../../helpers/setup');

let api;
let token;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('User | query', async () => {
  const query = `
    {
      user {
        id
        username
        notes {
          id
          note
        }
      }
    }
  `;

  const res = await request(api)
    .post('/graphql')
    .set('Accept', /json/)
    .send({ query })
    .expect(200)
    .expect('Content-Type', /json/);

  expect(res.body.data.user[0].username).toBe('test');
  expect(res.body.data.user[0].notes).toEqual([]);
});
