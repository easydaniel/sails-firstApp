module.exports = function(req, res, next) {
    if (req.session.User && req.session.User.admin) {
        return next();
    }

    req.session.flash = {
        err: {
            name: 'admin authenticate',
            message: 'You must be admin'
        }
    }
    res.redirect('/auth/new');
}
