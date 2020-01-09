
const isNotLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return next()
    }

    res.redirect('/')
}

const isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/auth/signin')

}

module.exports.isLoggedIn = isLoggedIn
module.exports.isNotLoggedIn = isNotLoggedIn
