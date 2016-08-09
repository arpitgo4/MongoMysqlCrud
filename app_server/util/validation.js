/**
 * Created by arpit on 9/8/16.
 */

module.exports.isUserValidToRegister = function (user, res){
    var valid = true;
    if(isEmptyOrUndefined(user)) {
        sendError('user', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.firstName)) {
        sendError('first name', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.lastName)) {
        sendError('last name', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.username)) {
        sendError('username', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.password)) {
        sendError('password', res);
        valid = false;
    }
    
    return valid;
};

module.exports.isUserValidToLogin = function(user, res){
    var valid = true;
    if(isEmptyOrUndefined(user)){
        sendError('user', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.username)){
        sendError('username', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.password)){
        sendError('password',res);
        valid = false;
    }
    return valid;
};

module.exports.isUserValidToRemove = function(user, res){
    var valid = true;
    if(isEmptyOrUndefined(user)){
        sendError('user', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.username)){
        sendError('username', res);
        valid = false;
    }
    return valid;
};

module.exports.isUserValidToUpdate = function(user, res){
    var valid = true;
    if(isEmptyOrUndefined(user.username)){
        sendError('username', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.oldPassword)){
        sendError('old password', res);
        valid = false;
    }else if(isEmptyOrUndefined(user.newPassword)){
        sendError('new password', res);
        valid = false;
    }
    return valid;
}

function isEmptyOrUndefined(param){
    if(param == undefined) return true;
    else if(param === '') return true;
    else return false;
};
    
function sendError(parameter, res){
    res.send({message: parameter + ' missing', result: 'failure'});
};
