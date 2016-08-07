/**
 * Created by arpit on 7/8/16.
 */

var mongoose = require('mongoose');
var db_connection = mongoose.connect('mongodb://localhost/user_app');

var user = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username : String,
    password : String
    /*address : String,*/
});

module.exports = mongoose.model('User', user);