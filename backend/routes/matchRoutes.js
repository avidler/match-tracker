const express = require('express')
const router = express.Router()
const { 
    getUserMatch, 
    setUserMatch, 
    updateUserMatch, 
    deleteUserMatch 
} = require('../controllers/usermatchController')

module.exports = router

router.route('/').get(getUserMatch).post(setUserMatch)
router.route('/:id').put(updateUserMatch).delete(deleteUserMatch)
