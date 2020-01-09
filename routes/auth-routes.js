const router = require('express').Router()
const passport = require('passport')
const {isNotLoggedIn} = require('../security/user-authentication')

// Go to Sign In page
router.get('/signin', isNotLoggedIn, (req, res) => {
    let errors = req.flash('error')
    res.render('signin', { title: 'Login to my blog', errors: errors})
})

// Account authentication
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signin',
    failureFlash: true
}))

module.exports = router