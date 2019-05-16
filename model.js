var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/wines')

var wineProps = new mongoose.Schema({
    name: String,
    sugarContent: String,
    colorType: String,
    rating: String,
    sparkling: Boolean,
    imgUrl: String,
    colorText: String,
    aromeText: String,
    tasteText: String,
    originText: String,
    priceText: String,
    noteText: String,
    contributor: String,
})

var winesScheme = new mongoose.Schema({
    wines: [wineProps],
})

exports.Wines = mongoose.model('Wines', winesScheme)
