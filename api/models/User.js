/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,


    attributes: {

        name: {

            type: 'string',
            required: true
        },

        email: {

            type: 'email',
            required: true,
            unique: true

        },

        encryptedPassword: {

            type: 'string',

        },

        admin: {

            type: 'boolean',
            defaultsTo: false

        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj._csrf;
            delete obj.confirmPasswd;
            return obj;
        }

    },

    beforeValidate: function(params, next) {
       
       next();

    },

    beforeCreate: function(params, next) {

        if (!params.password || params.password != params.confirmPasswd) {
            return next({
                err: 'Password does not match'
            });
        }

        require('bcrypt').hash(params.password, 10, function passwordEncrypted(err, encrypted) {
            if (err) {
                return next(err);
            }
            params.encryptedPassword = encrypted;
            next();
        });

    }
};

