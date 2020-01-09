const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const Category = require('../models/category')

// Go to home page
router.get('/', (req, res) => {
    Category.find().then((result) => {
        if (result) {
            Blog.find().then((blogResult) => {

                let blogs = []
                blogResult.forEach((doc) => {
                    let minimizedContent = ''
                    let minimizedDate = doc.posted_date.toString().split('G')[0]
                    if (doc.content.length >= 300) {
                        minimizedContent = doc.content.substring(0, 300) + '...'
                    }
                    else {
                        minimizedContent = doc.content
                    }

                    let chunk = {
                        id: doc.id,
                        title: doc.title,
                        posted_date: minimizedDate,
                        content: minimizedContent,
                        photo: doc.photo
                    }
                    blogs.push(chunk)

                })

                res.render('index', { title: 'My Blog', categories: result, blog_list: blogs, user: req.user })
                
            })
        }
    })

})

module.exports = router