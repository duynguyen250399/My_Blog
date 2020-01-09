const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { isLoggedIn } = require('../security/user-authentication')
const fs = require('fs')

const User = require('../models/user')

const storageEngine = multer.diskStorage({
    destination: './public/images/user_images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + req.user.id + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storageEngine,
    fileFilter: function (req, file, cb) {
        // Accept image files only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            return cb(new Error('Only image files are allowed!'))
        }

        cb(null, true)
    }
}).single('userAvatar')

router.post('/avatar', isLoggedIn, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return console.log(err)
        }
        else if (!req.file) {
            return console.log('Please choose image file!')
        }

        let dir = req.file.destination.replace('./public/', '') + req.file.filename


        fs.unlink('./public/' + req.user.photo, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                User.findByIdAndUpdate(req.user.id, { photo: dir }, (err, updatedUser) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(updatedUser.fullname + ' photo updated: ', updatedUser.photo)
                        res.redirect('/user/profile')
                    }
                })

            }
        })


    })
})

module.exports = router