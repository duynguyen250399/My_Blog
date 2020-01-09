const Category = require('../models/category')
const router = require('express').Router()

// get all categories
router.get('/', (req, res) =>{
    Category.find().then((categories) =>{  
        if(categories){
            res.status(200).json(categories)
        }    
        else{
            res.status(404)
        }
    })
})

// get a specific category based on id
router.get('/:id', (req, res) =>{
    Category.findById(req.params.id, (err, category) =>{
        if(err){
            res.status(500).send('Server Error: ' + err)
        }
        else{
            if(category){
                res.status(200).json(category)
            }
            else{
                res.status(404).send('User Not Found!')
            }
        }
    })
})

module.exports = router