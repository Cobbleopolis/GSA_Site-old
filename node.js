var express = require('express');
var app = express();
var path = require("path");
var mongo = require("./mongo.js");

app.get('/', function(req, res){
    mongo.pageHandle(__dirname + "/html/index.html", res);
    //res.sendFile(__dirname + '/html/index.html');
});

app.get('/flag', function(req, res){
    res.sendFile(__dirname + '/flag.html');
});

app.get('/events', function(req, res){
    res.sendFile(__dirname + '/events.html');
});

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

app.use(express.static(__dirname + '/html'));

var server = app.listen(80, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

})