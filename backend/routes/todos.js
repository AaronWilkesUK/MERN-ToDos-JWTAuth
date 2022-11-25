const express = require('express')
const { 
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//protected route check
router.use(requireAuth)

// GET all todos
router.get('/', getTodos)

// GET single todo
router.get('/:id', getTodo)

// POST a new todo
router.post('/', createTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

// UPDATE a todo
router.patch('/:id', updateTodo)

module.exports = router