/**
 * Created by arpit on 7/8/16.
 */

var mysql = require('mysql');

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'user_app'
});

module.exports = db;