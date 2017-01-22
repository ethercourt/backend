var mongoose     = require('mongoose');
var mongoSchema =   mongoose.Schema;
// create schema
var mailingSchema  = {
    "email": String
};
// create model if not exists.
module.exports = mongoose.model('mailing', mailingSchema);
