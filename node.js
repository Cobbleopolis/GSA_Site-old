var express = require('express');
var app = express();
var path = require("path");
var mongo = require("./mongo.js");

app.use(express.static(__dirname + '/html'));

app.get('/', function(req, res){
    mongo.indexHandle(res);
    res.sendFile(__dirname + '/html/index.html');
});


app.get('/flag', function(req, res){
    res.sendFile(__dirname + '/html/flag.html');
});

app.get('/events', function(req, res){
    res.sendFile(__dirname + '/html/events.html');
});

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/html/chat.html');
});

app.get('/about', function (req, res) {
    res.send("Hello World about");
});

var server = app.listen(80, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

})