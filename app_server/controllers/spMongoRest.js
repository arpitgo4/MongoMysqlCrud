/**
 * Created by arpit on 18/8/16.
 */

var util = require('../util/validation');
var countryModel = require('../models/mongoDB/country');
var companyModel = require('../models/mongoDB/company');
var userModel = require('../models/mongoDB/user');

module.exports.allUsersWithFilter = function(req, res, next){
    var user = req.body;
    if(user.country == 'All' || user.company == 'All'){
        userModel.find({}, function(err, result){
            if(err) throw err;

            res.send({userList: result[0]});
        });
    }
    else {
        userModel.find({country: user.country, company: user.company}, function (err, result) {
            if (err) throw err;

            res.send({userList: result[0]});
        });
    }
};

module.exports.loginWithSP = function(req, res, next){
    var user = req.body;

    if(!util.isValid(user, ['username', 'password'], res)) return;
    if(!util.isValidDataType(user, {username: 'string', password: 'password'}, res)) return;

    userModel.findOne({username: user.username, password: user.password}, function(err, result){
        if(err) throw err;

        if(result)
            res.send({message: 'Access Granted', result: 'success'});
        else res.send({message: 'Access Denied! Username/Password may be wrong!', result: 'failure'});
    });
};

module.exports.createUserWithSP = function(req, res, next){
    var user = req.body;

    if(!util.isValid(user, ['firstName', 'lastName', 'username', 'password', 'company', 'country'], res)) return;
    if(!util.isValidDataType(user, {firstName: 'string', lastName: 'string', username: 'string',
            password: 'password', country: 'string', company: 'string'}, res))
        return;

    userModel.find({username: user.username}, function (err, result) {
        if (result.length != 0)
            res.send({message: 'Username Exists!', result: 'failure'});
        else {
            userModel.create(user, function (err) {
                if(err) throw err;
                res.send({message: 'User Registered!', result: 'success'});
            });
        }
    });
};

module.exports.getAllCompaniesAndCountries = function(req, res, next){
    countryModel.find({}, function(err, countriesFromDB){
        if(err) throw err;
        
        var companies = [], countries = [];
        companyModel.find({}, function(err, companiesFromDB){
            if(err) throw err;

            companiesFromDB.forEach(function(company){
                companies.push({company_id : company._id, companyName: company.companyName});
            });
            countriesFromDB.forEach(function(country){
                countries.push({country_id : country._id, countryName: country.countryName});
            });

            res.send({companies: companies, countries: countries});
        });
    });
};