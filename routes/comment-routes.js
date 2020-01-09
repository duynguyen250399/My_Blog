const router = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const {isLoggedIn} = require('../security/user-authentication')

router.post('/', isLoggedIn, (req, res) =>{
    let commentContent = req.body.commentContent
    let blogID = req.body.blogID
    let userID = req.body.userID
    if(!userID){
        res.send('Error')
    }
    else{
        User.findById(userID, (err, user) =>{
            if(err){
                console.log(err)
            }
            else{
                let newComment = new Comment({
                    blog_id: blogID,
                    user_id: userID,
                    content: commentContent,
                    user_photo: user.photo,
                    user_fullname: user.fullname
                })

                newComment.save((err, comment) =>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.redirect('/blogs/' + comment.blog_id)
                     
                    }
                })
            }
        })
    }

})

module.exports = router