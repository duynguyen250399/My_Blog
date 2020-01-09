const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
    blog_id: String,
    user_id: String,
    content: String,
    user_photo: String,
    user_fullname: String,
    posted_date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Comment', commentSchema)