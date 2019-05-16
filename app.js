var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var multer = require('multer')
const Wines = require('./model').Wines
const readFile = require('./lib/readWrite').readFile

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img')
    },
    filename: function(req, file, cb) {
        if (!file) {
            console.warn('file is not provided')
            return
        }
        cb(null, file.originalname)
    },
})

var upload = multer({ storage: storage })
// var cors = require('cors');

var app = express()
// var jsonParser = bodyParser.json();
// app.use(cors());
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/wines/', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    Wines.findOne(function(err, data) {
        if (err) return console.error(err)
        // console.log(data.wines)
        res.send(data.wines)
        next()
    })
    // Without mongoDB
    // readFile("./public/winecardsJSON.json")
    //   .then(data => res.send(data))
    //   .catch(err => { console.warn('err:', err) })
})
app.get('/api/wines/:folder/:wine', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    const getWine = req.params.wine
    Wines.findOne(function(err, data) {
        if (err) return console.error(err)
        data.wines.forEach(function(wine) {
            if (wine.name === getWine) {
                res.send([wine])
                next()
            }
        })
    })
})

app.post('/api/wines/upload', upload.single('file'), function(req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    const imgUrl = req.file ? 'http://localhost:3004/img/' + req.file.originalname : ''
    const newCard = {
        ...req.body,
        imgUrl,
    }

    Wines.findOneAndUpdate('wines', { $push: { wines: newCard } }, { safe: true, upsert: true }, function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            console.log('data is added:')
        }
    })
    res.send('Get your form data!')

    fs.readFile('./public/winecardsJSON.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err)
        }
        const withAddedCard = JSON.parse(data).concat(newCard)
        fs.writeFile('./public/winecardsJSON.json', JSON.stringify(withAddedCard), err => {
            if (err) {
                console.log(err)
            }
        })
    })
})

app.listen(3004)
