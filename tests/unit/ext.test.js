const request = require('supertest');
const app = require('../../src/app');
const markdown = require('markdown-it');
const jsYaml = require('js-yaml');

describe('testing conversions', () => {
  //Tesiing the conversion of markdown to html
  const md = markdown();

  test('convets text/markdown to text/html', async () => {
    const markdownContent = '# Example Markdown Content';

    // Make a POST request with Markdown content
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .send(markdownContent);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;
    const expectedHtmlContent = md.render(markdownContent);

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.html`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
    // Corrected expect statement to match the expected structure
    expect(res2.text).toEqual(expectedHtmlContent);
  });

  //Testing conversion of markdown to text

  test('convets text/markdown to text/plain', async () => {
    const markdownContent = '# Example Markdown Content';

    // Make a POST request with Markdown content
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .send(markdownContent);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.txt`)
      .auth('user1@email.com', 'password1');
    console.log(res2.text);
    expect(res2.statusCode).toBe(200);
    expect(res2.text).toEqual(md.render(markdownContent).replace(/<[^>]*>/g, ''));
  });

  // Testing the invalid conversion
  test('does not allow invalid conversions', async () => {
    const markdownContent = '# Example Markdown Content';

    // Make a POST request with Markdown content
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/markdown')
      .send(markdownContent);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.json`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(415);
  });

  // Testing the conversion of JSON to YAML

  test('converts JSON to YAML', async () => {
    const data = { message: 'hello' };
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/json')
      .send(data);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.yml`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
    expect(jsYaml.load(res2.text)).toEqual(data);
  });

  // Testing the conversion of JSON to text

 test('JSON to Plain Text', async () => {
   const data = {
     message: 'hello',
   };

   // Post JSON data to your API
   const res = await request(app)
     .post('/v1/fragments')
     .auth('user1@email.com', 'password1')
     .set('Content-Type', 'application/json')
     .send(data);

   expect(res.statusCode).toBe(201);
   const id = res.body.id;

   // Get the converted plain text
   const res2 = await request(app)
     .get(`/v1/fragments/${id}.txt`)
     .auth('user1@email.com', 'password1');

   expect(res2.statusCode).toBe(200);

   // Define the expected plain text format
   const expectedPlainText = `
message: hello
`.trim();

   // Check if the response text matches the expected plain text
   expect(res2.text.trim()).toBe(expectedPlainText);
 });
 


test('JSON to JSON', async () => {
  const data = {
    message: 'hello',
  };

  // Post JSON data to your API
  const res = await request(app)
    .post('/v1/fragments')
    .auth('user1@email.com', 'password1')
    .set('Content-Type', 'application/json')
    .send(data);

  expect(res.statusCode).toBe(201);
  const id = res.body.id;

  // Get the JSON data
  const res2 = await request(app)
    .get(`/v1/fragments/${id}.json`)
    .auth('user1@email.com', 'password1');

  expect(res2.statusCode).toBe(200);

  // Parse the response text to a JSON object
  const responseData = JSON.parse(res2.text);

  // Check if the response object matches the original data
  expect(responseData).toEqual(data);
});

 



  // Testing the conversion of html to text
  test('converts HTML TO TEXT', async () => {
    const data = '<h1>Hello</h1>';
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/html')
      .send(data);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.txt`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(200);
    expect(res2.text).toEqual('Hello');
  });

  //Tesiting the conversion of html to html

  test('converts HTML to HTML', async () => {
    const data = '<h1>Hello</h1>';
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/html')
      .send(data);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.html`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(200);
    expect(res2.text).toEqual(data);
  });

  test('Yaml to yaml', async () => {
    const data = `
    name: John Doe
    age: 30
    email: johndoe@example.com
`;
    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'application/yaml')
      .send(data);
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.yaml`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
    expect((res2.text)).toEqual(data);
  });




test('YAML to Plain Text', async () => {
  const data = `
name: John Doe
age: 30
email: johndoe@example.com
`;

  // Post YAML data to your API
  const res = await request(app)
    .post('/v1/fragments')
    .auth('user1@email.com', 'password1')
    .set('Content-Type', 'application/yaml')
    .send(data);

  expect(res.statusCode).toBe(201);
  const id = res.body.id;

  // Get the converted plain text
  const res2 = await request(app)
    .get(`/v1/fragments/${id}.txt`)
    .auth('user1@email.com', 'password1');

  expect(res2.statusCode).toBe(200);

  // Convert YAML data to JSON
  const jsonData = jsYaml.load(data);

 // Remove trailing whitespace

  // Function to convert JSON to plain text format
  const jsonToPlainText = (json, indent = 2) => {
    const spacing = ' '.repeat(indent);
    if (typeof json === 'object' && json !== null) {
      return Object.entries(json)
        .map(
          ([key, value]) =>
            `${spacing}${key}: ${typeof value === 'object' && value !== null ? '\n' + jsonToPlainText(value, indent + 2) : value}`
        )
        .join('\n');
    } else {
      return `${spacing}${json}`;
    }
  };

  const expectedPlainText = jsonToPlainText(jsonData).trim().replace(/\s+$/, ''); // Remove trailing whitespace

  // Check if the response text matches the expected plain text
  expect(res2.text.trim().replace(/\s+$/, '')).toBe(expectedPlainText);
});
 

  test('CSV to CSV', async () => {
    const data = `
name,age,email,department
John Doe,30,johndoe@example.com,Engineering
Jane Smith,25,janesmith@example.com,Marketing
`;

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/csv')
      .send(data);

    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.csv`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(200);
    expect(res2.text.trim()).toBe(data.trim());
  });

  test('CSV to JSON', async () => {
    const data = `
name,age,email,department
John Doe,30,johndoe@example.com,Engineering
Jane Smith,25,janesmith@example.com,Marketing
`;

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/csv')
      .send(data);

    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.json`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(200);
    const expectedJson = [
      { name: 'John Doe', age: '30', email: 'johndoe@example.com', department: 'Engineering' },
      { name: 'Jane Smith', age: '25', email: 'janesmith@example.com', department: 'Marketing' },
    ];
    const receivedJson = JSON.parse(res2.text);
    expect(receivedJson).toEqual(expectedJson);
  });

  test('CSV to Plain Text', async () => {
    const data = `
name,age,email,department
John Doe,30,johndoe@example.com,Engineering
Jane Smith,25,janesmith@example.com,Marketing
`;

    const res = await request(app)
      .post('/v1/fragments')
      .auth('user1@email.com', 'password1')
      .set('Content-Type', 'text/csv')
      .send(data);

    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    const res2 = await request(app)
      .get(`/v1/fragments/${id}.txt`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(200);

    const expectedPlainText = `
name: John Doe
age: 30
email: johndoe@example.com
department: Engineering

name: Jane Smith
age: 25
email: janesmith@example.com
department: Marketing
  `.trim();

    expect(res2.text.trim()).toBe(expectedPlainText);
  });


});
