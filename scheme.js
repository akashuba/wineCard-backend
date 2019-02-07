var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wines');
var fs = require("fs");


var wineCardSchema = new mongoose.Schema(
    {
        wines: { type: Array, "default": [] }
    });

var Wines = mongoose.model('Wines', wineCardSchema);

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
    var db = mongoose.connection.db;
    db.dropDatabase(callback);

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
