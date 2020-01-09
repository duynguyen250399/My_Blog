const User = require('../models/user')
const router = require('express').Router()

// get all users
router.get('/', (req, res) =>{
    User.find().then((users) =>{  
        if(users){
            res.status(200).json(users)
        }    
        else{
            res.status(404)
        }
    })
})

// get a specific user based on id
router.get('/:id', (req, res) =>{
    User.findById(req.params.id, (err, user) =>{
        if(err){
            res.status(500).send('Server Error: ' + err)
        }
        else{
            if(user){
                res.status(200).json(user)
            }
            else{
                res.status(404).send('User Not Found!')
            }
        }
    })
})

module.exports = router