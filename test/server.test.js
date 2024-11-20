const request = require('supertest');
const server = require('../src/server');
const mongoose = require('mongoose');

describe('Server Initialization Tests', () => {
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  it('should start and respond to requests', async () => {
    const res = await request(server).get('/');
    expect(res.status).not.toBe(404);
  });

  it('should use the correct port', () => {
    const port = server.address().port;
    expect(port).toBe(Number(process.env.PORT) || 5000);
  });
});
