const Blog = require('../models/blog')
const router = require('express').Router()

// get all blogs
router.get('/', (req, res) =>{
    Blog.find().then((blogs) =>{  
        if(blogs){
            res.status(200).json(blogs)
        }    
        else{
            res.status(404)
        }
    })
})

// get a specific blog based on id
router.get('/:id', (req, res) =>{
    Blog.findById(req.params.id, (err, blog) =>{
        if(err){
            res.status(500).send('Server Error: ' + err)
        }
        else{
            if(blog){
                res.status(200).json(blog)
            }
            else{
                res.status(404).send('Blog Not Found!')
            }
        }
    })
})

// get blogs based on category id
router.get('/category/:id', (req, res) =>{
    Blog.find({category_id: req.params.id}, (err, blogs) =>{
        if(err){
            res.status(500).send('Server Error: ' + err)
        }
        else{
            if(blogs){
                res.status(200).json(blogs)
            }
            else{
                res.status(404).send('Blog Not Found!')
            }
        }
    })
})

module.exports = router