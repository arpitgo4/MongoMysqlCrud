/**
 * Created by arpit on 7/8/16.
 */

var userModel = require('../models/user');

module.exports.login = function(req, res){
    
};

module.exports.register = function(req, res){
  var user = req.body;
  console.log('User Registerd : ', user);
  userModel.create({
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    username: user.username
  }, function(err){
    res.send('User Registered!');
  });
};