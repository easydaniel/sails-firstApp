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

        
        if (!req.body.email || !req.body.password) {
            req.session.flash = {
                err: {
                    email: 'Email Required',
                    passwd: 'Password Required'
                }
            }
            return res.redirect('/auth/new');
        }

        User.findOneByEmail(req.body.email, function(err, user) {
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

            require('bcrypt').compare(req.body.password, user.encryptedPassword, function(err, valid) {
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

                res.redirect('/user/show/' + user.id);

            });

        });

    },

    destroy: function(req, res, next) {

        req.session.destroy();
        res.redirect('/auth/new');

    }

};

