const mongoose = require('mongoose')


const articleSchema = mongoose.Schema({
    title: String,
    desc : String,
    img: String,
    content: String,
    language: String
})

const userSchema = mongoose.Schema({
    article: [articleSchema],
    username: String,
    email: String,
    password: String,
    token: String,
    salt: String,
    language: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;
