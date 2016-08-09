/**
 * Created by arpit on 7/8/16.
 */

var userModel = require('../models/mongoDB/user');
var util = require('../util/validation');

/**
 * REST API for registering new user.
 * gets called from register.ejs by angular AJAX call
 * on click of submit button.
 * @param req
 * @param res
 */
module.exports.register = function(req, res){
  var user = req.body;
  console.log('User', user);
  if(!util.isValid(user, ['firstName', 'lastName', 'username', 'password'], res))
    return;
  
  if(!util.isValidDataType(user, {firstName: 'string', lastName: 'string', username: 'string', password: 'password'}, res))
    return;

  console.log('User Registerd : ', user);
  userModel.find({username: user.username}, function (err, result) {
    if (result.length != 0)
      res.send({message: 'Username Exists!', result: 'failure'});
    else {
      userModel.create(user, function (err) {
        res.send({message: 'User Registered!', result: 'success'});
      });
    }
  });
};

/**
 * REST API returns a list of all users in
 * database.
 * @param req
 * @param res
 */
module.exports.userList = function (req, res) {
  userModel.find({}, function (err, result) {
    res.send(result);
  });
};

/**
 * REST API to check given login credentials
 * with database and grant access by sending user' data
 * or access denied by returning error message.
 * @param req
 * @param res
 */
module.exports.login = function(req, res){
  var user = req.body;

  if(!util.isValid(user, ['username', 'password'], res)) return;
  if(!util.isValidDataType(user, {username: 'string', password: 'password'}, res)) return;
  userModel.find({username: user.username, password: user.password}, function(err, result){
    if(err) throw err;
    
    if(result.length == 1)
        res.send({user: result[0], message: 'Access Granted', result: 'success'});
    else res.send({user: null, message: 'Access Denied! Username/Password may be wrong!', 
                                                  result: 'failure'});
  });
};


/**
 * REST API for removing user's profile from
 * database based on user's username.
 * @param req
 * @param res
 */
module.exports.removeUser = function(req, res){
  var user = req.body;
  if(!util.isValid(user, ['username'], res)) return;
  if(!util.isValidDataType(user, {username: 'string'}, res)) return;

  userModel.find({username: user.username}, function(err, result){
    if(err) throw err;

    if(result.length == 0)
        res.send({message : 'User does\'nt exists', result: 'failure'});
    else {
      result[0].remove();
      res.send({message: 'User Deleted!', result: 'success'});
    }
  });
};

/**
 * REST API to update user's password.
 * @param req
 * @param res
 * @param next
 */
module.exports.updateUser = function(req, res, next){
  var user = req.body;
  if(!util.isValid(user, ['username', 'oldPassword', 'newPassword'], res)) return;
  if(!util.isValidDataType(user, {username: 'string', oldPassword: 'password', newPassword: 'password'}, res)) return;
  userModel.find({username: user.username, password: user.oldPassword}, function(err, result){
    if(err) throw err;

    if(result.length == 0)
        res.send({message: 'User does\'nt exists', result: 'failure'});
    else {
      result[0].password = user.newPassword;
      result[0].save();
      res.send({message: 'Password Updated!', result: 'success'});
    }
  });
};
