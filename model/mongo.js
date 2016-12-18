var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/ethercourt');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var ethercourtSchema  = {
    "adressUser" : String,
    "adressContract" : String
};
// create model if not exists.
module.exports = mongoose.model('ethercourt', ethercourtSchema);
