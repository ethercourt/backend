var mongoose     = require('mongoose');
var mongoSchema =   mongoose.Schema;
// create schema
var ethercourtSchema  = {
    "name": String,
    "addressUser" : String,
    "addressContract" : String
};
// create model if not exists.
module.exports = mongoose.model('ethercourt', ethercourtSchema);
