module.exports = {
    regauth: function (req, res, next) {
        if (req.isAuthenticated()) {

            return next();
        } else {
            
            res.redirect("/register2");
        }
    }
}