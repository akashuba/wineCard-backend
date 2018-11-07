var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));

app.get("/api/wines", function(req, res) {
  fs.readFile("./public/winecardsJSON.json", "utf8", function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(3000);
