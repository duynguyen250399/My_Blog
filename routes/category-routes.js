const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const Category = require('../models/category')

// Show all blogs page
router.get('/', (req, res) => {
    Blog.find().then((result) => {
        let blogs = []
        result.forEach((doc) => {
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

        Category.find().then((result) =>{
            res.render('index', {title: 'Full Categories', blog_list: blogs, categories: result, user: req.user})
        })
        
    })
})

// Show blogs based on category
router.get('/:id', (req, res) => {
    let category_id = req.params.id

    Blog.find({ category_id: category_id }, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            let blogs = []
            result.forEach((doc) => {
                let minimizedContent = ''
                let minimizedDate = doc.posted_date.toString().split('G')[0]
                if (doc.content.length >= 500) {
                    minimizedContent = doc.content.substring(0, 500) + '...'
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
            Category.find().then((result) => {
                Category.findById(category_id, (err, category) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(req.user)
                        res.render('blogs-category-view', { title: 'My Blog', blog_list: blogs, categories: result, category: category, user: req.user})
                    }
                })


            })
        }
    })
})

module.exports = router