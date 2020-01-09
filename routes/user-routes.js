const router = require('express').Router()
const User = require('../models/user')
const passport = require('passport')
const {isLoggedIn} = require('../security/user-authentication')

// Log out account
router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout()
    }
    res.redirect('/')
})


// Go to user's profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', { title: 'Profile', user: req.user })
})

module.exports = router