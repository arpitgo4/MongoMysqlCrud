/**
 * Created by arpit on 18/8/16.
 */

var countryModel = require('../models/mongoDB/country');
var companyModel = require('../models/mongoDB/company');

var countries = [{countryName: 'India'}, {countryName: 'USA'}, {countryName: 'Japan'}, {countryName: 'France'}];
var companies = [{companyName: 'Facebook'}, {companyName: 'Google'}, {companyName: 'Twitter'}, {companyName: 'Xiaomi'}];

function storeEach(arr, model){
    arr.forEach(function(item){
        model.create(item, function(err){
            if(err) throw err;
            console.log(JSON.stringify(item) + ' stored!');
        })
    });
};

function removeAllData(){
    countryModel.remove({}, function(err){
        if(err) throw err;
        console.log('Countries Removed!');
    });
    companyModel.remove({}, function(err){
        if(err) throw err;
        console.log('Companies Removed!');
    });
};

function setupMongoDB(){

    removeAllData();

    storeEach(countries, countryModel);
    storeEach(companies, companyModel);
}


module.exports = setupMongoDB;