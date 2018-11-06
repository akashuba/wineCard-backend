var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

// app.get("/", function(request,response) {
//     response.send();
// })
app.listen(3000);
