const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:2
    },
    password: {
        type: String,
        required: true,
        min:2
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;