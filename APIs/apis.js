const router = require('express').Router()
const userAPI = require('../APIs/user-api')
const categoryAPI = require('../APIs/blog-category-api')
const blogAPI = require('../APIs/blog-api')
const commentAPI = require('../APIs/comment-api')

router.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    next()
})
router.use('/users', userAPI)
router.use('/blogs', blogAPI)
router.use('/categories', categoryAPI)
router.use('/comments', commentAPI)

module.exports = router