const request = require('supertest');
const app = require('../../src/app');
const markdown = require('markdown-it');

describe('testing markdown conversion to html', () => {
  // Fixed typo in "markdown" and "conversion", removed async
  const md=markdown();

  test('accepts text/markdown content', async () => {
    const markdownContent ='# Example Markdown Content';

    // Make a POST request with Markdown content
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .send(markdownContent);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;
    const expectedHtmlContent = md.render(markdownContent); 
   
    // Fixed typo in URL from "v1/fragemnts" to "v1/fragments"
    const res2 = await request(app)
      .get(`/v1/fragments/${id}.html`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
    // Corrected expect statement to match the expected structure
    expect(res2.text).toEqual(
      expectedHtmlContent
    );
  });
});
