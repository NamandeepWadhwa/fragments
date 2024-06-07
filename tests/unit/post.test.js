const request = require('supertest');

const app = require('../../src/app');
const hash = require('../../src/hash');

describe('GET /v1/fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).post('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).post('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));



    test('sending plain fragment for authenticated user', async () => {
     
      const res = await request(app)
      
    
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
     .send('hello');
     
    
      expect(res.statusCode).toBe(201);
      expect(res.body.ownerId).toBe(hash('user1@email.com'));
      expect(res.body.type).toBe('text/plain');
      expect(res.body.size).toBe(5);

    });
    test('sending no data fragment for authenticated user', async () => {
     
      const res = await request(app)
      
    
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain');
    
      expect(res.status).toBe(415);

    });
    test('sending unsupported fragment for authenticated user', async () => {
     
      const res = await request(app)
    
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
     .send({"data":"hello"});
    
   
     expect(res.statusCode).toBe(415);
  

    });

});
