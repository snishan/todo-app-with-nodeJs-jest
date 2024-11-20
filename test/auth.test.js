const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../src/app');
const User = require('../src/models/User');
const connectDB = require('../src/db');

describe('Auth API Tests', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

//REGITER  USER
  describe('POST /auth/register', () => {
    it('should register a user successfully', async () => {
      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        password: 'password123',
      });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('User registered successfully!');
    });

    it('should fail to register a user with missing username', async () => {
      const res = await request(app).post('/auth/register').send({
        password: 'password123',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    it('should fail to register a user with missing password', async () => {
      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    it('should fail to register a user with a duplicate username', async () => {
      await new User({
        username: 'testuser',
        password: await bcrypt.hash('password123', 10),
      }).save();

      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        password: 'newpassword',
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });


//USER LOGIN
  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await User.deleteMany();
      await new User({ username: 'testuser', password: 'password123' }).save();
    });

    it('should fail to login with missing username field', async () => {
      const res = await request(app).post('/auth/login').send({
        password: 'password123',
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Username and password are required');
    });

    it('should login successfully with valid credentials', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'testuser',
        password: 'password123',
      });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it('should fail to login with incorrect password', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'testuser',
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should fail to login with a non-existent username', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'nonexistentuser',
        password: 'password123',
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should fail to login with missing username field', async () => {
      const res = await request(app).post('/auth/login').send({
        password: 'password123',
      });
      expect(res.status).toBe(400);
    });

    it('should fail to login with missing password field', async () => {
      const res = await request(app).post('/auth/login').send({
        username: 'testuser',
      });
      expect(res.status).toBe(400);
    });
  });
});

