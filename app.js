const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// initialize routers
const router = require('./routes/index')
const categoryRouter = require('./routes/category-routes')
const blogRouter = require('./routes/blog-routes')
const contactRouter = require('./routes/contact-routes')
const userRouter = require('./routes/user-routes')
const authRouter = require('./routes/auth-routes')
const signupRouter = require('./routes/signup-routes')
const uploadRouter = require('./routes/upload-routes')
const commentRouter = require('./routes/comment-routes')

// initialize web services (APIs)
const apis = require('./APIs/apis')

const handlebars = require('express-handlebars')
const keys = require('./config/keys')
const mongoose = require('mongoose')

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log('mongodb connected...')
    }
})

const PORT = 3000

app.engine('hbs', handlebars({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(flash())

app.use(session({
    secret: 'bbzz250399',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 // 1 day
    }
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport-config')

// set up routers
app.use(router)
app.use('/categories', categoryRouter)
app.use('/blogs', blogRouter)
app.use('/contact', contactRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/signup', signupRouter)
app.use('/upload', uploadRouter)
app.use('/comment', commentRouter)

// set up web service (APIs)
app.use('/api', apis)

app.listen(PORT, (err) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log('Server is running at port ' + PORT)
    }
})