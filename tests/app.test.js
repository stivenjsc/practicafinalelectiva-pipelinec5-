const request = require('supertest');
const fs = require('fs');
const path = require('path');

const { DB_PATH } = require('../src/db');

// ensure DB dir exists and isolated test DB
beforeAll(() => {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
});

const app = require('../src/app');

describe('API /api/items', () => {
  test('GET returns array', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST creates item', async () => {
    const res = await request(app).post('/api/items').send({ name: 'test item' });
    expect([201,200]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('test item');
  });
});
