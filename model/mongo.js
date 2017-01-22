var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/ethercourt');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var ethercourtSchema  = {
    "name": String,
    "addressUser" : String,
    "addressContract" : String
};
// create model if not exists.
module.exports = mongoose.model('ethercourt', ethercourtSchema);
