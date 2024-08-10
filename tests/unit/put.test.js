const request = require('supertest');
const app = require('../../src/app');

describe('PUT /v1/fragments/:id', () => {
  test('updating the fragment data for authenticated user with old data type', async () => {
    // Step 1: Create a fragment with text/plain
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
      .send('hello');

    const id = res.body.id;
    console.log(`Created Fragment ID: ${id}`);

    // Step 2: Update the fragment with the same data type
    const res2 = await request(app)
      .put(`/v1/fragments/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
      .send('world2');

    // Assertions
    expect(res2.statusCode).toBe(200);
    expect(res2.body.size).toBe(6); // 'world' has 5 characters
  });

  // Test for updating the fragment data for authenticated user with new data type
  test('updating the fragment data for authenticated user with new data type', async () => {
    // Step 1: Create a fragment with text/plain
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/plain')
      .send('hello');

    const id = res.body.id;
    console.log(`Created Fragment ID: ${id}`);

    // Step 2: Attempt to update the fragment with a different data type
    const res2 = await request(app)
      .put(`/v1/fragments/${id}`)
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send({ message: 'world' });

    // Assertions
    expect(res2.statusCode).toBe(400); // Expecting a 400 error for type mismatch
  });

// upating the data of a fragment that does not exist

 test('updating the fragment data for authenticated user with new data type', async () => {
   // Step 1: Create a fragment with text/plain
   const res = await request(app)
     .post('/v1/fragments')
     .auth('user1@email.com', 'password1')
     .set('Content-Type', 'text/plain')
     .send('hello');

   const id = res.body.id;
   console.log(`Created Fragment ID: ${id}`);

   // Step 2: Attempt to update the fragment with a different data type
   const res2 = await request(app)
     .put(`/v1/fragments/098980989}`)
     .auth('user1@email.com', 'password1')
     .set('Content-Type', 'application/json')
     .send({ message: 'world' });

   // Assertions
   expect(res2.statusCode).toBe(404); // Expecting a 400 error for type mismatch
 });
});
