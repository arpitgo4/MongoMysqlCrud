/**
 * Created by arpit on 7/8/16.
 */

var userModel = require('../models/user');

module.exports.login = function(req, res){
    
};

/**
 * REST API for registering new user.
 * gets called from register.ejs by angular AJAX call
 * on click of submit button.
 * @param req
 * @param res
 */
module.exports.register = function(req, res){
  var user = req.body;
  console.log('User Registerd : ', user);
  userModel.find({username: user.username}, function (err, result) {
    if (result.length != 0)
      res.send('Username Exists!');
    else {
      userModel.create(user, function (err) {
        res.send('User Registered!');
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