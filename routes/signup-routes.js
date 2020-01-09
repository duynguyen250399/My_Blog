const router = require('express').Router()
const User = require('../models/user')
const {isNotLoggedIn} = require('../security/user-authentication')

// Go to Sign Up page
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('signup', { title: 'Register blog account' })
})

// Account registration
router.post('/', (req, res) => {
    let sex = req.body.sex
    let default_photo = (sex === 'male') ? 'images/user_images/male-user.png' : 'images/user_images/female-user.png'

    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (user) {
                console.log('username already taken!')
                res.render('signup', { title: 'Sign Up' })
            }
            else {
                let newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    fullname: req.body.fullname,
                    photo: default_photo,
                    sex: sex
                })

                newUser.save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log('user created: ', result)
                        res.render('signin', { title: 'Sign In to My Blog' })
                    }
                })
            }
        }
    })

})

module.exports = router