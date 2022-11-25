const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//create JWT
const createJWT = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        //generate token
        const token = createJWT(user._id)
        res.status(200).json({email, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

//register user
const registerUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.register(email, password)
        //generate token
        const token = createJWT(user._id)
        res.status(200).json({email, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { registerUser, loginUser }