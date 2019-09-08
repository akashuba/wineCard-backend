var express = require("express")
var bodyParser = require("body-parser")
var fs = require("fs")
var multer = require("multer")
var cors = require('cors');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

var app = express()
// var jsonParser = bodyParser.json();
app.use(cors());
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/wines", function (req, res) {
  // res.set("Access-Control-Allow-Origin", "http://192.168.1.52:3000")
  fs.readFile("./public/winecardsJSON.json", "utf8", function (err, data) {
    if (err) throw err
    res.send(data)
  })
})

app.post("/api/wines/upload", upload.single("file"), function (req, res) {
  // res.set("Access-Control-Allow-Origin", "http://192.168.1.52:3000")

  // console.log(req.file)
  const newCard = {
    ...req.body,
    imgUrl: "http://77.37.232.187:8081/img/" + req.file.originalname
  }
  // console.log(newCard)
  res.send("Get your form data!")
  fs.readFile("./public/winecardsJSON.json", "utf8", function (err, data) {
    if (err) {
      console.log(err)
    }
    const withAddedCard = JSON.parse(data).concat(newCard)
    fs.writeFile(
      "./public/winecardsJSON.json",
      JSON.stringify(withAddedCard),
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
  })
})

// app.listen(3004);

var server = require('http').createServer(app);

server.listen(3004, '192.168.1.52', function () {
  console.log("Listening on port 3004!");
});