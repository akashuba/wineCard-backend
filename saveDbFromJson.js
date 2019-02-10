var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wines');
var fs = require("fs");
const Wines = require('./model').Wines


// var wineCardSchema = new mongoose.Schema(
//     {
//         wines: { type: Array, "default": [] }
//     });

const readFile = (path, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    db.dropDatabase(callback);
    console.log('database is opened')
    readFile("./public/winecardsJSON.json")
        .then(data => JSON.parse(data))
        .then(data => {
            var winesBase = new Wines({ wines: data });
            winesBase.save(function (err, winesBase) {
                if (err) return console.error(err);
                console.log('base is saved')
            });
        });

});

exports.Wines
