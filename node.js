var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require("./mongo.js");

app.get('/', function(req, res){
    mongo.indexHandle(__dirname + "/html/index.html", res);
});

app.get('/flags', function(req, res){
    mongo.flagHandle(__dirname + "/html/flag.html", res);
});

app.get('/events', function(req, res){
    mongo.eventsHandle(__dirname + "/html/events.html", res);
});

app.get('/chat', function(req, res){
    mongo.chatHandle(__dirname + "/html/chat.html", res);
});

app.get('/fishbowl', function(req, res){
    mongo.chatHandle(__dirname + "/html/fishbowl.html", res);
});

app.get('/admin', function(req, res){
    mongo.chatHandle(__dirname + "/html/admin.html", res);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/admin',function(req,res){
    console.log(req.body);
    mongo.adminSubmit(req, res);
});

//app.post('/admin',function(req,res){
//    console.log(req.body);
//    mongo.adminSubmit(req, res);
//});

app.use(express.static(__dirname + '/html'));

var server = app.listen(81, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

});