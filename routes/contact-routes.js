const router = require('express').Router()
const Category = require('../models/category')
const Contact = require('../models/contact')

// Go to contact page
router.get('/', (req, res) => {
    Category.find().then((result) => {
        res.render('contact', { title: 'Contact', categories: result, user: req.user })
    })
})

// Post contact info to server
router.post('/send', (req, res) => {

    let contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        message: req.body.message
    })

    contact.save((err, result) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log('Contact details saved: ', result)
            res.render('send-success')
        }
    })
})

module.exports = router