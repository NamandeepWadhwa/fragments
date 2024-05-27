const request = require('supertest');

const app = require('../../src/app');

describe('GET /hakai', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('undefined page', () => request(app).get('/hakai').expect(404));
});
