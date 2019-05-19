var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/wines')
const Wines = require('./model').Wines
const readFile = require('./lib/readWrite').readFile

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(callback) {
    db.dropDatabase(callback)
    console.log('database is opened')
    readFile('./public/winecardsJSON.json')
        .then(data => JSON.parse(data))
        .then(data => {
            var winesBase = new Wines({ wines: data })
            winesBase.save(function(err, winesBase) {
                if (err) return console.error(err)
                console.log('base is saved')
            })
        })
})

exports.Wines
