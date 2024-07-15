const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/fragmentInfo', () => {

test('getting fragmetInfo by ID', async () => {
  const res2 =await request(app)
    
  
  .post('/v1/fragments')
  .auth('user1@email.com', 'password1').set('Content-Type', 'text/plain').send('hello');
  const id=res2.body.id;
  const res = await request(app)
    .get(`/v1/fragments/${id}/info`)
    .auth('user1@email.com', 'password1');
  expect(res.body.status).toBe('ok');
  expect(res.body.fragment.id).toBe(id);
  expect(res.body.fragment.type).toBe('text/plain');
  expect(res.body.fragment.size).toBe(5);


});



});
