const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/fragments', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments').auth('invalid@email.com', 'incorrect_password').expect(401));

  // Using a valid username/password pair should give a success result with a .fragments array
  test('authenticated users get a fragments array', async () => {
    let res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
      .send('hello');

    expect(res.statusCode).toBe(201); // Assuming the fragment creation returns a 201 status code

    res = await request(app).get('/v1/fragments').auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
  });

  // Test for authenticated user with expand=1
  test('authenticated user with expand =1', async () => {
    let res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send('hello');

    expect(res.statusCode).toBe(201); // Assuming the fragment creation returns a 201 status code
    const fragmentId = res.body.id;

    res = await request(app).get('/v1/fragments?expand=1').auth('user1@email.com', 'password1');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.fragments)).toBe(true);
    expect(res.body.fragments.length).toBeGreaterThan(0);

    const fragment = res.body.fragments.find((frag) => frag.id === fragmentId);
    expect(fragment).toBeDefined();
    expect(fragment.id).toBe(fragmentId);
    expect(fragment.type).toBe('application/json');
    expect(fragment.size).toBe(5);
  });
});
