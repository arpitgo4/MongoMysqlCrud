/**
 * Created by arpit on 18/8/16.
 */

var mongoose = require('mongoose');

var company = new mongoose.Schema({
    company: String
}, {versionKey: false});

module.exports = mongoose.model('company', company);