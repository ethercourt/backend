var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./model/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var cors = require('cors');

router.route("/twoPartyArbitrable/:adress_user")
  .get(function(req, res) {
    mongoOp.find({adressUser: req.params.adress_user}, function(err, contractsUser) {
      if (err)
        res.send(err);
      res.json(contractsUser);
    });
  });

router.route("/twoPartyArbitrable")
  .get(function(req,res) {
    mongoOp.find({},function(err, contracts) {
      if(err) 
        res.send(err); 
      res.json(contracts);
    });
  })
  .post(function(req,res){
    var db = new mongoOp();
    var response = {};

    db.adressUser = req.body.adressUser;
    db.adressContract =  req.body.adressContract;
    db.save(function(err){
      if(err) {
        response = {"error" : true,"message" : "Error adding data"};
      } else {
        response = {"error" : false,"message" : "Data added"};
      }
      res.json(response);
    });
  });

// parse application/json
app.use(bodyParser.json())

app.use(cors({origin: 'http://localhost:3000'}));
app.use('/',router);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(3000);
console.log("Listening to PORT 3000");
