const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

//Get All Todos
const getTodos = (req, res) => {
    const user_id = req.user._id
    Todo.find({user_id}).sort({createdAt: -1})
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

//Get a single ToDo
const getTodo = (req, res) => {
    const {id} = req.params
    //Check if the passed ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Todo'})
    }
    Todo.findById(id)
    .then((result) => {
        if(!result) {
            return res.status(404).json({error: 'No such Todo'})
        }
        res.status(200).json(result)
    })
    .catch((err) => {
        return res.status(500).json({error: err})
    })
}

//Create New Todo
const createTodo = (req, res) => {
    const {description, completed} = req.body
    let emptyFields = []
    if(!description) {
        emptyFields.push("description")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    const user_id = req.user._id
    Todo.create({description, completed, user_id})
    .then((todo) => {
        res.status(200).json(todo)
    })
    .catch((err) => {
        res.status(400).json({error: err.message})
    })
}

//Delete a todo
const deleteTodo = (req, res) => {
    const {id} = req.params
    //Check if the passed ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Todo'})
    }
    Todo.findOneAndDelete({_id: id})
    .then((result) => {
        if(!result) {
            return res.status(404).json({error: 'No such Todo'})
        }
        res.status(200).json(result)
    })
    .catch((err) => {
        return res.status(500).json({error: err})
    })
}

//Update a todo
const updateTodo = (req, res) => {
    const {id} = req.params
    //Check if the passed ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Todo'})
    }
    Todo.findOneAndUpdate({_id: id}, req.body)
    .then((result) => {
        if(!result) {
            return res.status(400).json({error: 'No such Todo'})
        }
        res.status(200).json(result)
    })
    .catch((err) => {
        return res.status(500).json({error: err})
    })
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}