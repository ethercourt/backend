var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./model/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

// function isContract(addr) {
//   let ethercourtContract = web3.eth.contract(contract.abi);
//   let ethercourtContractInstance = ethercourtContract.at(addr);
// }

router.get("/",function(req,res){
    res.json({"error" : false, "message" : "It's works !"});
});

router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        console.log(req.body);
        var db = new mongoOp();
        var response = {};

        db.adressUser = req.body.adressUser;
        db.adressContract =  req.body.adressContract;
        if (true) { // contract exixts
          db.save(function(err){
          // save() will run insert() command of MongoDB.
          // it will add new data in collection.
              if(err) {
                  response = {"error" : true,"message" : "Error adding data"};
              } else {
                  response = {"error" : false,"message" : "Data added"};
              }
              res.json(response);
          });
        }
    });

// parse application/json
app.use(bodyParser.json())

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
