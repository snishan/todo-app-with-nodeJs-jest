const request = require('supertest');
const app = require('../src/app');
const Todo = require('../src/models/Todo');
const connectDB  = require('../src/db');
const { signToken } = require('./utils/auth');
const mongoose = require('mongoose');

describe('Todo API Tests', () => {
  let token;
  beforeAll(async () => {
    connectDB();
    token = signToken({ userId: '673ce634b49d1c4f3ffadb08' });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Todo.deleteMany();
  });

  //POST TODO
  describe('POST /todos', () => {
    it('should create a todo successfully', async () => {
      const res = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Todo', description: 'This is a test todo.' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test Todo');
      expect(res.body.description).toBe('This is a test todo.');
    });

    it('should fail to create a todo without authentication', async () => {
      const res = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo', description: 'This is a test todo.' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });

    it('should fail to create a todo with missing fields', async () => {
      const res = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: '' });

      expect(res.status).toBe(400);
    });
  });


   //GET TODO
  describe('GET /todos', () => {
    it('should get all todos for a user', async () => {
      await new Todo({ title: 'Test Todo', description: 'First todo', userId: '673ce634b49d1c4f3ffadb08' }).save();

      const res = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].title).toBe('Test Todo');
    });

    it('should fail to get todos without authentication', async () => {
      const res = await request(app)
        .get('/todos');

      expect(res.status).toBe(401);
    });
  });


  //GET BY ID TODO
  describe('GET /todos/:id', () => {
    it('should get a single todo by ID', async () => {
      const todo = await new Todo({ title: 'Test Todo', description: 'Test description', userId: '673ce634b49d1c4f3ffadb08' }).save();

      const res = await request(app)
        .get(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Todo');
    });

    it('should fail to get a todo because invalid ID format', async () => {
      const res = await request(app)
        .get(`/todos/673e1c36767`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400); 
      expect(res.body.message).toBe('Invalid ID format');
    });

    it('should fail to get a todo if not found', async () => {
      const res = await request(app)
        .get(`/todos/673ce634b49d1c4f3ffadb08`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });

    it('should fail to get a todo without authentication', async () => {
      const res = await request(app)
        .get('/todos/valid-id');

      expect(res.status).toBe(401); 
    });
  });

    //PUT BY ID TODO
  describe('PUT /todos/:id', () => {
    it('should update a todo successfully', async () => {
      const todo = await new Todo({ title: 'Test Todo', description: 'Test description', userId: '673ce634b49d1c4f3ffadb08' }).save();

      const res = await request(app)
        .put(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Todo', description: 'Updated description' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Todo');
    });

    it('should fail to update a todo if invalid id format', async () => {
      const res = await request(app)
        .put('/todos/invalid-id')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Todo' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid ID format');
    });

    it('should fail to get a todo if not found', async () => {
      const res = await request(app)
        .put(`/todos/673ce634b49d1c4f3ffadb08`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Todo' });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });

    it('should fail to update a todo without authentication', async () => {
      const res = await request(app)
        .put('/todos/valid-id')
        .send({ title: 'Updated Todo' });

      expect(res.status).toBe(401);
    });
  });


  //DELETE BY ID TODO
  describe('DELETE /todos/:id', () => {
    it('should delete a todo successfully', async () => {
      const todo = await new Todo({ title: 'Test Todo', description: 'Test description', userId: '673ce634b49d1c4f3ffadb08' }).save();

      const res = await request(app)
        .delete(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Todo');
    });

    it('should fail to delete a todo if invalid ID format', async () => {
      const res = await request(app)
        .delete('/todos/invalid-id')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400); 
      expect(res.body.message).toBe('Invalid ID format');
    });

    it('should fail to get a todo if not found', async () => {
      const res = await request(app)
        .delete(`/todos/673ce634b49d1c4f3ffadb08`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404); 
      expect(res.body.message).toBe('Todo not found');
    });

    it('should fail to delete a todo without authentication', async () => {
      const res = await request(app)
        .delete('/todos/valid-id');

      expect(res.status).toBe(401); 
    });
  });
});
