var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wines');
var fs = require("fs");


var wineCardSchema = new mongoose.Schema(
    {
        wines: { type: Array, "default": [] }
    });

var Wines = mongoose.model('Wines', wineCardSchema);

var winesBase;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);

    fs.readFile("./public/winecardsJSON.json", "utf8", function (err, data) {
        var parseData = JSON.parse(data);
        if (err) return console.error(err);
        console.log('parseData:', parseData)
        winesBase = new Wines({
            wines: parseData
        });
        // console.log(JSON.parse(data))
        winesBase.save(function (err, winesBase) {
            if (err) return console.error(err);
            console.log('base is saved')
        });
    })
});
