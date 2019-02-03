var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wines');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected');
});

var wineCardSchema = new mongoose.Schema({
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
    contributor: String
});

var Wines = mongoose.model('Wines', wineCardSchema);

var cabernet_saperavi = new Wines({
    name: 'Cabernet Saperavi',
    imgUrl: 'http://localhost:3004/img/cabernet_saperavi.jpg'
});
console.log(cabernet_saperavi); // 'Silence'

cabernet_saperavi.save(function (err, cabernet_saperavi) {
    if (err) return console.error(err);
});