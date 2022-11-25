require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')

//Create express app
const app = express()

//Niddleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//Routing
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //Listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Server started on port", process.env.PORT);
})
})
.catch((err) => {
    console.log(err)
})