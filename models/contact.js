const mongoose = require('mongoose')
const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    company: String,
    message: String
})

module.exports = mongoose.model('Contact', contactSchema)