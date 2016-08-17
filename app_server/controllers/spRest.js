/**
 * Created by arpit on 17/8/16.
 */

var queries = require('../models/queries');
var userModel = require('../models/mysql/user');

module.exports.allUsersWithFilter = function(req, res, next){
    var user = req.body;

    userModel.query(queries.usersWithFilterSP, [user.company, user.country], function(err, result){
        if(err) throw err;

        res.send({userList: result[0]});
    });
};

module.exports.loginWithSP = function(req, res, next){
    var user = req.body;
    userModel.query(queries.loginSP, [user.username, user.password], function(err, result){
        if(err) throw err;

        if(getResultValue(result) == 0)
            res.send({message: 'Access Granted', result: 'success'});
        else res.send({message: 'Access Denied! Username/Password may be wrong!', result: 'failure'});
    });
};

module.exports.createUserWithSP = function(req, res, next){
    var user = req.body;
    userModel.query(queries.createUserSP, [user.firstName, user.lastName, user.username,
                                                user.password, user.country, user.company],
        function(err, result){
            if(err) throw err;

            if(getResultValue(result) == 0)
                res.send({message: 'User Registered!', result: 'success'});
            else res.send({message: 'Username Exists!', result: 'failure'});
    });
};

module.exports.getAllCompaniesAndCountries = function(req, res, next){
    userModel.query(queries.allCompaniesAndCountries, function(err, result){
        if(err) throw err;

        console.log(result[0]);

        res.send({companies: ''});
    });
};

function getResultValue(result){
    return result[1][0]['@result'];
};