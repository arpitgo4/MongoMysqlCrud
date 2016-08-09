/**
 * Created by arpit on 7/8/16.
 */

var userModel = require('../models/mysql/user');
var queries = require('../models/queries');
var util = require('../util/validation');

module.exports.login = function(req, res, next){
    var user = req.body;
    var session = req.session;
    if(!util.isValid(user, ['username', 'password'], res)) return;
    if(!util.isValidDataType(user, {username: 'string', password: 'password'}, res)) return;

    session.username = user.username;
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
    var session = req.session;
    if(!util.isValid(user, ['firstName', 'lastName', 'username', 'password'], res)) return;
    if(!util.isValidDataType(user, {firstName: 'string', lastName: 'string', username: 'string', password: 'password'}, res))
        return;
    session.username = user.username;
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
    var session = req.session;
    if(!util.isValid(user, ['oldPassword', 'newPassword'], res)) return;
    if(!util.isValidDataType(user, {oldPassword: 'password', newPassword: 'password'}, res)) return;
    
    userModel.query(
        queries.checkIfUserExists, [session.username, user.oldPassword],
        function(err, result){
            userModel.query(
                queries.update, [user.newPassword, session.username, user.oldPassword],
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
    if(!util.isValid(user, ['username'], res)) return;
    if(!util.isValidDataType(user, {username: 'string'}, res)) return;

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