// tests/searchController.test.js
import request from 'supertest';
import app from '../app';

describe('POST /', () => {
  it('should return response with answer and sources', async () => {
    const response = await request(app)
      .post('/')
      .send({ message: 'What is AI?' });

    expect(response.status).toBe(200);
    expect(response.body.answer).toBeDefined();
    expect(response.body.sources).toBeDefined();
  });

  it('should handle missing query gracefully', async () => {
    const response = await request(app).post('/').send({});
    expect(response.status).toBe(400);
    expect(response.body.error.message).toContain('Invalid request');
  });
});
