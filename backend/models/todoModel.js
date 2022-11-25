const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user_id: {
       type: String,
       required: true 
    }
}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)