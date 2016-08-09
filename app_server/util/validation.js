/**
 * Created by arpit on 9/8/16.
 */

module.exports.isValid = function(user, params, res){
    if(user == undefined){
        sendError('user', res);
        return false;
    }
    for(var i = 0; i < params.length; i++){
        if(isEmptyOrUndefined(user[params[i]])){
            sendError(params[i], res);
            return false;
        }
    }
    return true;
};

function isEmptyOrUndefined(param){
    if(param == undefined) return true;
    else if(param === '') return true;
    else return false;
};
    
function sendError(parameter, res){
    res.send({message: parameter + ' missing', result: 'failure'});
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
