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

        toJSON: function() {
            var obj = this.toObject();
            delete obj._csrf;
            delete obj.confirmPasswd;
            return obj;
        }

    },

    beforeCreate: function(values, next) {
        if (!values.password || values.password != values.confirmPasswd) {
            return next({
                err: 'Password does not match'
            });
        }

        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encrypted) {
            if (err) {
                return next(err);
            }
            values.encryptedPassword = encrypted;
            next();
        });

    }
};

