/**
 * Created by arpit on 7/8/16.
 */

var userModel = require('../models/mysql/user');
var queries = require('../models/queries');

module.exports.login = function(req, res, next){
    var user = req.body;
    userModel.query(
        queries.login, [user.username, user.password]
    , function(err, result){
            if(err) throw err;
            if(result.length == 1)
                res.send({user: result[0], message: 'Access Granted', result: 'success'});
            else res.send({user: null, message: 'Access Denied! Username/Password may be wrong!',
                                                result: 'failure'});
    });
};

module.exports.register = function(req, res, next){
    var user = req.body;
    userModel.query(
        queries.checkIfUsernameExists, [user.username],
        function(err, result){
            userModel.query(
                queries.register, [user.firstName, user.lastName, user.username, user.password],
                function(err){
                    if(err) throw err;
                    if(result.length != 0) res.send({message: 'Username Exists!', result: 'failure'});
                    else res.send({message: 'User Registered!', result: 'success'});
                }
            );
        }
    );
};

module.exports.updateUser = function(req, res, next){
    var user = req.body;
    userModel.query(
        queries.checkIfUserExists, [user.username, user.oldPassword],
        function(err, result){
            userModel.query(
                queries.update, [user.newPassword, user.username, user.oldPassword],
                function (err) {
                    if (err) throw err;
                    if (result.length == 0)
                        res.send({message: 'User does\'nt exists', result: 'failure'});
                    else res.send({message: 'Password Updated!', result: 'success'});
                }
            );
        }
    );

};

module.exports.userList = function(req, res, next){
    userModel.query(
        queries.allUser,
        function(err, result){
            if(err) throw err;
            res.send(result);
        }
    );
};

module.exports.removeUser = function(req, res, next) {
    var user = req.body;
    userModel.query(
        queries.checkIfUsernameExists, [user.username],
        function(err, result){
            userModel.query(
                queries.removeUser, [user.username],
                function (err) {
                    if (err) throw err;

                    if (result.length == 0)
                        res.send({message: 'User does\'nt exists', result: 'failure'});
                    else res.send({message: 'User Deleted!', result: 'success'});
                }
            );
        }
    );
};

/**
 * Utility function to check if user with given
 * username exists in database.
 *
 * not being used, synchronisation problem.
 * @param username
 */
function isUsernameExists(username, fn){
    userModel.query(
        queries.checkIfUsernameExists, [username],
        function(err, result){
            if(err) throw err;

            if(result.length == 0) fn.res.send({message : 'User does\'nt exists'});
            else fn();
        }
    );
}