/**
 * Module for all the views for the application.
 * 
 * Created by arpit on 7/8/16.
 */

module.exports.register = function(req, res, next){
    res.render('register', {title: 'Register'});
};

module.exports.userList = function (req, res, next) {
    res.render('user-list', {title: 'Users'});
};

module.exports.login = function(req, res, next){
    res.render('login', {title: 'Login'});
};

module.exports.remove = function(req, res, next){
    res.render('remove-user', {title: 'Remove User'})
};

module.exports.updateUser = function(req, res, next){
    res.render('update-user', {title: 'Update User'});
};