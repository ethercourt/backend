var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./model/mongo");
const nodemailer = require('@nodemailer/pro');
var config       = require('./config');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var cors = require('cors');

router.route("/twoPartyArbitrable/:address_user")
  .get(function(req, res) {
    mongoOp.find({addressUser: req.params.address_user}, function(err, contractsUser) {
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
  .post(function(req,res) {
    var db = new mongoOp();
    var response = {};
    console.log(req.body);
    db.name = req.body.name;
    db.addressUser = req.body.addressUser;
    db.addressContract =  req.body.addressContract;
    db.save(function(err){
      if(err) {
        response = {"error" : true,"message" : "Error adding data"};
      } else {
        response = {"error" : false,"message" : "Data added"};
      }
      res.json(response);
    });
  });

      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: config.mailAuth
      });
  router.route("/mailing-list")
    .post(function(req,res) {
      email = req.body.email;

      let mailOptions = {
          from: '"Ethercourt.io" <no-reply@ethercourt.io>',
          to: config.mailTo,
          subject: 'New subscriber mailing-list',
          html: email + 'subsribe mailing-list ethercourt.io'
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
	  transporter.close();
      });
    });

// parse application/json
app.use(bodyParser.json())

app.use(cors({}));
app.use('/',router);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

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
