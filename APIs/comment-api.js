const Comment = require('../models/comment')
const router = require('express').Router()

// get all user comments based on category id
router.get('/:id', (req, res) => {
    Comment.find({ blog_id: req.params.id }, (err, comments) => {
        if (err) {
            console.log(err)
        }
        else {
            if (comments) {
                res.status(200).json(comments)
            }
            else {
                res.status(404).json({ message: 'Comment not found!' })
            }
        }
    })
})

// post new comment to a blog
// :id => Blog ID
router.post('/:id', (req, res) => {

    if (req.user) {      
        let commentContent = req.body.content
        let userPhoto = req.user.photo
        let userFullName = req.user.fullname
        
        let newComment = new Comment({
            blog_id: req.params.id,
            user_id: req.user.id,
            content: commentContent,
            user_photo: userPhoto,
            user_fullname: userFullName     
        })

        newComment.save((err, comment) =>{
            if(err){
                res.status(500).json({message: 'Error!'})
            }
            else{
                res.status(200).json(comment)
            }
        })
    }
})

module.exports = router