var express = require("express");
var app2 = express();
var router = express.Router();
var path = __dirname + '/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "charts.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app2.use("/",router);

app2.use(express.static(__dirname));

app2.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app2.listen(3000,function(){
  console.log("Live at Port 3000");
});