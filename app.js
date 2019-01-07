var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require('multer');
var upload = multer();
// var cors = require('cors');

var app = express();
// var jsonParser = bodyParser.json();
// app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/wines", function (req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  fs.readFile("./public/winecardsJSON.json", "utf8", function (err, data) {
    if (err) throw err;
    res.send(data);
  })
});

app.post("/api/wines/upload", upload.array(), function (req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')

  res.send('Get your form data!')
  fs.readFile("./public/winecardsJSON.json", "utf8", function (err, data) {
    if (err) { console.log(err) }
    const newData = JSON.parse(data)
    newData.push(req.body)
    fs.writeFile("./public/winecardsJSON.json", JSON.stringify(newData), err => {
      if (err) { console.log(err) }

    })
  })
});

app.listen(3004);
