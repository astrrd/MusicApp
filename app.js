
var express = require('express');
var app = express();
var swig  = require('swig');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('port', 8081);
app.set('db','mongodb://admin:admin@multichat-shard-00-00-2bu4e.mongodb.net:27017,multichat-shard-00-01-2bu4e.mongodb.net:27017,multichat-shard-00-02-2bu4e.mongodb.net:27017/test?ssl=true&replicaSet=multichat-shard-0&authSource=admin&retryWrites=true&w=majority');
let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app, mongo);
require("./routes/rusuarios.js")(app, swig, gestorBD);
require("./routes/rcanciones.js")(app, swig, gestorBD);


// lanzar el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo");
})