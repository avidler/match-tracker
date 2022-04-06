const asyncHandler = require('express-async-handler')

const UserMatch = require('../models/userMatch')
const User = require('../models/userModel')

// @desc Get user match
// @route GET /api/userMatch
// access Private

const getUserMatch = asyncHandler(async(req, res) => {
    
    const userMatches = await UserMatch.find({ user: req.user.id })
    res.status(200).json(userMatches)
    
})

// @desc Set user match
// @route POST /api/userMatch
// access Private

const setUserMatch = asyncHandler(async(req, res) => {
    console.log(req.body)
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const userMatch = await UserMatch.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(userMatch)
})

// @desc Amend user match
// @route PUT /api/userMatch/:id
// access Private

const updateUserMatch = asyncHandler(async(req, res) => {

    const userMatch = await UserMatch.findById(req.params.id)

    if(!userMatch){
        res.status(400)
        throw new error('User match not found')
    }

    const user = await User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user is the same as the usermatch record
    if(userMatch.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')       
    }

    const updatedUserMatch = await UserMatch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedUserMatch)
    
})

// @desc Remove user match
// @route DELETE /api/userMatch/:id
// access Private

const deleteUserMatch = asyncHandler(async(req, res) => {
    const userMatch = await UserMatch.findById(req.params.id)

    if(!userMatch){
        res.status(400)
        throw new error("User match not found")
    }

    const user = await User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user is the same as the usermatch record
    if(userMatch.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')       
    }

    await userMatch.remove()
    res.status(200).json({id: req.params.id})
    
})



module.exports = {
    getUserMatch, setUserMatch, updateUserMatch, deleteUserMatch
}