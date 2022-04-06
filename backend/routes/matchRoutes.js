const express = require('express')
const router = express.Router()
const { 
    getUserMatch, 
    setUserMatch, 
    updateUserMatch, 
    deleteUserMatch 
} = require('../controllers/usermatchController')

const { protect } = require('../middleware/authMiddleware')
module.exports = router

router.route('/').get(protect, getUserMatch).post(protect, setUserMatch)
router.route('/:id').put(protect, updateUserMatch).delete(protect, deleteUserMatch)
