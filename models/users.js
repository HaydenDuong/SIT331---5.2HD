const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;