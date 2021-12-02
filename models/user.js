const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    number: String,
    address: String,
    balance: Number,
    active: String,
});

module.exports = mongoose.model('User', userSchema);