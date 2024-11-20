const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong!' });
});

module.exports = app;

