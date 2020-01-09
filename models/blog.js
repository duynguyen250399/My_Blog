const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blogSchema = new Schema({
    title: String,
    posted_date: Date,
    content: String,
    photo: String,
    category_id: String
})

module.exports = mongoose.model('Blog', blogSchema)