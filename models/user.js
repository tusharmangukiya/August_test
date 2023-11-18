var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

var user = mongoose.model('User', schema);

module.exports = user;