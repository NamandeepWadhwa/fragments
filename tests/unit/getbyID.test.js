const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/fragments/:id', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('unauthenticated requests are denied', () => request(app).get('/v1/fragments/1232y3iuyi2').expect(401));

  // If the wrong username/password pair are used (no such user), it should be forbidden
  test('incorrect credentials are denied', () =>
    request(app).get('/v1/fragments/0980980979897').auth('invalid@email.com', 'incorrect_password').expect(401));

  test('getting Fragment by ID', async () => {
    const res2 =await request(app)
      
    
    .post('/v1/fragments')
    .auth('user1@email.com', 'password1')
    .set('Content-Type', 'text/plain')
   .send('hello');
   const id=res2.body.id;

  
   
   

    const res = await request(app)
      .get(`/v1/fragments/${id}`)
      .auth('user1@email.com', 'password1');
     
      expect(res.text).toEqual('hello');

  });

test('sending invalid id', async () => {
   const res=await request(app).get('/v1/fragments/1232y3iuyi2') .auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(404);
});
test('getting fragments by id in json format',async()=>{
  const res2 = await request(app)
    .post('/v1/fragments')
    .auth('user1@email.com', 'password1')
    .set('Content-Type', 'application/json')
    .send({"message":'hello'});
  const id = res2.body.id;
   const res = await request(app)
      .get(`/v1/fragments/${id}`)
      .auth('user1@email.com', 'password1');
     
     
      expect(res.body).toEqual({"message":'hello'});

  });
  test('getting fragments by id in markdown format', async () => {
    const markdownContent = `
      # Example Markdown Content

      This is some **bold** and *italic* text.
    `;
    const res2 = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .send(markdownContent.trim());
    const id = res2.body.id;
    const res = await request(app).get(`/v1/fragments/${id}`).auth('user1@email.com', 'password1');

    expect(res.text.trim()).toEqual(markdownContent.trim());
  });

});

