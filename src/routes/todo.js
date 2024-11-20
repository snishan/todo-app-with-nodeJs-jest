const express = require('express');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      userId: req.userId,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyToken, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.send(todos);
});

router.get('/:id', verifyToken, async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  res.send(todo);
});

router.put('/:id', verifyToken, async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  res.send(todo);
});

router.delete('/:id', verifyToken, async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ message: 'Invalid ID format' });
  }
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  res.send(todo);
});

module.exports = router;
