const request = require('supertest');
const app = require('../../src/app');


describe('DELETE /v1/fragments/:id', () => {
  test('deleting a fragment for authenticated user', async () => {
    const res = (await request(app).post('/v1/fragments').auth('user1@email.com', 'password1')
    .set('Content-Type', 'text/plain').
    send('hello'));
    const id = res.body.id;
    const res2 = await request(app).delete(`/v1/fragments/${id}`).auth('user1@email.com', 'password1')
    expect(res2.statusCode).toBe(200);

  });
  test('deleting a fragment that does not exist', async () => {
     await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
      .send('hello');

    const res2 = await request(app)
      .delete(`/v1/fragments/7897989789`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(500);
  });
}
);
