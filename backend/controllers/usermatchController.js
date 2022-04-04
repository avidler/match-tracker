const asyncHandler = require('express-async-handler')

// @desc Get user match
// @route GET /api/userMatch
// access Private

const getUserMatch = asyncHandler(async(req, res) => {
    {
        res.status(200).json({message: 'Get user matches'})
    }
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
    res.status(200).json({message: 'Create user match'})
})

// @desc Amend user match
// @route PUT /api/userMatch/:id
// access Private

const updateUserMatch = asyncHandler(async(req, res) => {
    {
        res.status(200).json({message: `Amend user match ${req.params.id}`})
    }
})

// @desc Remove user match
// @route DELETE /api/userMatch/:id
// access Private

const deleteUserMatch = asyncHandler(async(req, res) => {
    {
        res.status(200).json({message: `Delete user match ${req.params.id}`})
    }
})



module.exports = {
    getUserMatch, setUserMatch, updateUserMatch, deleteUserMatch
}