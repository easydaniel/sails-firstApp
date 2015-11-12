module.exports = function(req, res, next) {

    if (!req.session.authenticated) {
        req.session.flash = {
            err: {
                message: 'Require login'
            }
        }
        return res.redirect('/auth/new');
    }

    var sessionIdMatch = req.session.User.id === req.param.id;
    var isAdmin = req.session.User.admin;

    if (isAdmin && sessionIdMatch) {
        req.session.flash = {
            err: {
                name: 'Priveledge fail',
                message: 'Login or admin'
            }
        }
        return res.redirect('/auth/new');
    }

    next();


}
