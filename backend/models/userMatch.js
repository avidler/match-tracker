const mongoose = require('mongoose')

const userMatchSchema = mongoose.Schema ({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, "Please choose a home team"]
    }
},{timestamps :  true}
 )

 module.exports = mongoose.model('UserMatch', userMatchSchema)