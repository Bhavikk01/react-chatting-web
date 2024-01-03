const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    }
});

module.exports = mongoose.model('User', UserSchema);