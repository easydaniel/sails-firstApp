/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        res.view('auth/new');
    },

    create: function(req, res, next) {
        
        if (!req.param('email') || !req.param('password')) {
            req.session.flash = {
                err: {
                    email: 'Email Required',
                    passwd: 'Password Required'
                }
            }
            return res.redirect('/auth/new');
        }

        User.findOneByEmail(req.param('email'), function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.session.flash = {
                    err: {
                        name: 'No account',
                        message: req.body.email + ' not found'
                    }
                }
                return res.redirect('/auth/new');
            }

            require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid) {
                if (err) {
                    return next(err);
                }
                if (!valid) {
                    req.session.flash = {
                        err: {
                            name: 'Wrong email or password',
                            message: 'Invalid combination'
                        }
                    }
                    return res.redirect('/auth/new');
                }
                req.session.authenticated = true;
                req.session.User = user;
                
                if (req.session.User.admin) {
                    return res.redirect('/user');
                }

                res.redirect('/user/show/' + user.id);

            });

        });

    },

    destroy: function(req, res, next) {

        req.session.destroy();
        res.redirect('/auth/new');

    }

};

