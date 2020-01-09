const passport = require('passport')
const LocalStratetry = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) =>{
    done(null, user)
})

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        return done(err, user)
    })
})

const signInStrategy = new LocalStratetry({
    usernameField: 'username',
    passwordField: 'password'  
}, (username, password, done) =>{
    User.findOne({username: username}, (err, user) =>{
        
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, {message: 'Invalid username!'})
        }
        if(user.password !== password){
            return done(null, false, {message: 'Invalid password!'})
        }
        return done(null, user)
    })
})

passport.use(signInStrategy)

console.log('passport configured...')