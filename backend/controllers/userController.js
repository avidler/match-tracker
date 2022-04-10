const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// access Public

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please complete all fields')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create ({
        name,
        email,
        password: hashedPassword,
        
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })

    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc User login
// @route POST /api/users/login
// access Public

const authenticateUser = asyncHandler(async(req, res) => {

    // Retrieve email and password from login form
    const {email, password} = req.body
    console.log("email", email)
    console.log("password", password)
    // Find the user by the email address entered
    const user = await User.findOne({email})
    console.log("user",user)
    //console.log("password",user.password)
    // Use bcrypt to compare the password entered with the encrypted version stored
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
  
})

// @desc Retrieve user data
// @route GET /api/users/me
// access Private

const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
   
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    authenticateUser,
    getUser
}