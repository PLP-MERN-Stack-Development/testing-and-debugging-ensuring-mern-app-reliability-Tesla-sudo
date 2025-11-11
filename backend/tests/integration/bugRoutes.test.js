import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import bugRoutes from '../../routes/bugRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

beforeAll(async () => {
  await mongoose.connect(globalThis.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bug API Routes', () => {
  let bugId;

  test('POST /api/bugs - create bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'UI Bug',
        description: 'Button not clickable',
        reportedBy: 'Tester'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('UI Bug');
    bugId = res.body._id;
  });

  test('GET /api/bugs - get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/bugs/:id - update status', async () => {
    const res = await request(app)
      .put(`/api/bugs/${bugId}`)
      .send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id', async () => {
    const res = await request(app).delete(`/api/bugs/${bugId}`);
    expect(res.statusCode).toBe(200);
  });
});