const router = require('express').Router()
const Blog = require('../models/blog')
const Category = require('../models/category')
const Comment = require('../models/comment')

// Show blog details page
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err)
        }
        else {
            Category.find().then((result) => {
                Category.findById(blog.category_id, (err, category) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        Comment.find({ blog_id: blog.id }, (err, comments) => {
                            if (err) {
                                console.log(err)
                            }
                            else {                                
                                res.render('blog-view', {
                                    title: blog.title,
                                    blogDetails: blog,
                                    categories: result,
                                    category: category,
                                    user: req.user,
                                    comments: comments
                                })
                            }
                        })

                    }
                })
            })

        }
    })
})

module.exports = router