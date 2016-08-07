/**
 * Created by arpit on 7/8/16.
 */

module.exports.register = function(req, res, next){
    res.render('register', {title: 'Register'});
};