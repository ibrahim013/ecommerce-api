import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('hello world');
});

it('doesnt get route', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.body.message).not.toBe('hello world');
});