/**
 * Created by arpit on 9/8/16.
 */

/**
 * Module to define all validation
 * logic for APIs.
 */

var constants = require('./constants');

/**
 * util function to check whether all parameters are 
 * present in the given object from the client side.
 * @param user
 * @param params
 * @param res
 * @returns {boolean}
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

/**
 * util function to check whether all params have
 * correct data type.
 * @param obj
 * @param dataTypes
 * @param res
 * @returns {boolean}
 */
module.exports.isValidDataType = function(obj, dataTypes, res){
    var isValid = true;
    for(var key in obj){
        if(dataTypes[key] == 'password'){
            if(!isValidPassword(obj[key])){
                sendWeakPasswordError(res);
                isValid = false;
            }
        }
        else if(typeof(obj[key]) != dataTypes[key]){
            sendDataTypeError(key, res);
            isValid = false;
        }
    }
    return isValid;
};

/**
 * Util function to check if the given param is
 * undefined or is empty string.
 * @param param
 * @returns {boolean}
 */
function isEmptyOrUndefined(param){
    if(param == undefined) return true;
    else if(param.trim() === '') return true;
    else return false;
};
    
function sendError(parameter, res){
    res.send({message: parameter + ' missing', result: 'failure'});
};

function sendDataTypeError(parameter, res){
    res.send({message: parameter + ' wrong data type', result: 'failure'});
};

function sendWeakPasswordError(res){
    res.send({message: constants.PASSWORD_ERROR_MSG, result: 'failure'});
}

/**
 * Util function to check if the given username is
 * of correct format.
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Util function to test if any text only
 * field contains a number.
 * @param myString
 * @returns {boolean}
 */
function hasNumber(myString) {
    return (/\d/.test(myString));
}

/**
 * Check for password strength, 
 * password must contain atleast 8 characters, with
 * 1 alphabet and 1 digit.
 * @param password
 * @returns {boolean}
 */
function isValidPassword(password){
    if (password.length < 8) return false;
    else if (password.search(/[a-z]/i) < 0) return false;
    else if (password.search(/[0-9]/) < 0) return false;
    else return true;
}
