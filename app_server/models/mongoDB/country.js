/**
 * Created by arpit on 18/8/16.
 */

var mongoose = require('mongoose');

var country = new mongoose.Schema({
    country_id: mongoose.Schema.ObjectId,
    countryName: String    
}, {versionKey: false});

module.exports = mongoose.model('country', country);