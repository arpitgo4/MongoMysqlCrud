/**
 * Created by arpit on 17/8/16.
 */

var queries = require('../models/queries');
var userModel = require('../models/mysql/user');
var util = require('../util/validation');

module.exports.allUsersWithFilter = function(req, res, next){
    var user = req.body;

    userModel.query(queries.usersWithFilterSP, [user.company, user.country], function(err, result){
        if(err) throw err;

        res.send({userList: result[0]});
    });
};

module.exports.loginWithSP = function(req, res, next){
    var user = req.body;
    
    if(!util.isValid(user, ['username', 'password'], res)) return;
    if(!util.isValidDataType(user, {username: 'string', password: 'password'}, res)) return;

    userModel.query(queries.loginSP, [user.username, user.password], function(err, result){
        if(err) throw err;

        if(getResultValue(result) == 0)
            res.send({message: 'Access Granted', result: 'success'});
        else res.send({message: 'Access Denied! Username/Password may be wrong!', result: 'failure'});
    });
};

module.exports.createUserWithSP = function(req, res, next){
    var user = req.body;
    
    if(!util.isValid(user, ['firstName', 'lastName', 'username', 'password', 'company', 'country'], res)) return;
    if(!util.isValidDataType(user, {firstName: 'string', lastName: 'string', username: 'string',
            password: 'password', country: 'number', company: 'number'}, res))
        return;

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

        var companies = [], countries = [];

        result.forEach(function(row){
            countries.push({country_id : row.country_id, countryName: row.countryName});
            companies.push({company_id : row.company_id, companyName: row.companyName});
        });

        res.send({companies: companies, countries: countries});
    });
};

function getResultValue(result){
    return result[1][0]['@result'];
};