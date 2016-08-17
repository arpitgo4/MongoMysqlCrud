/**
 * Created by arpit on 17/8/16.
 */


module.exports.loginWithSP = function(req, res, next){
    res.render('loginWithSP', {title: 'Login With SP'});
};
module.exports.createUserWithSP = function(req, res, next){
    res.render('createUserWithSP', {title: 'Create User With SP'});
};
module.exports.allUserWithFilter = function(req, res, next){
    res.render('allUserWithFilter', {title: 'All Users With Filter'});
};