/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        res.view();
    },

    create: function(req, res, next) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);
                
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/new');
            }
            //res.json(user);
            res.redirect('/user/show/' + user.id);
        });
    },

    show: function(req, res, next) {
        User.findOne(req.params.id, function foundUser(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }
            res.view({
                user: user
            });
        });
    },

    edit: function(req, res, next) {
        User.findOne(req.params.id, function foundUser(err, user) {
           if (err) {
              return next(err);
           }
            if (!user) {
               return next();
            }
           res.view({
               user: user
           }); 
        });
    },

    update: function(req, res, next) {

        User.update(req.params.id, req.params.all(), function userUpdate(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.params.id);
            }

            res.redirect('/user/show/' + req.params.id);

        });

    },

    destroy: function(req, res, next) {
        
        User.findOne(req.params.id, function foundUser(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }

            User.destroy(req.params.id, function userDestroy(err) {
                if (err) {
                    return next(err);
                }
            });

            res.redirect('/user');

        });


    },

    index: function(req, res, next) {
        
        User.find(function foundUsers(err, users) {
            if (err) {
                return next(err);
            }
            res.view({
                users: users
            });
        });


    }
	
};

