var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var app = express();
var mongo = require("./mongo.js");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/admin/login', function(req, res){
    mongo.adminLoginHandle(__dirname + "/html/admin/adminLogin.html", req, res);
});

app.get('/admin/login/fail', function(req, res){
    mongo.adminLoginFailHandle(__dirname + "/html/admin/adminLoginFail.html", res);
});

app.get('/admin/dash', function(req, res){
    mongo.adminDashHandle(__dirname + "/html/admin/adminDash.html", req, res);
});

app.get('/admin/fishbowl', function(req, res){
    mongo.adminFishbowlHandle(__dirname + "/html/admin/adminFishbowl.html", req, res);
});

app.get('/admin/edit', function(req, res){
    mongo.adminEditHandle(__dirname + "/html/admin/adminEdit.html", req, res);
});

app.post('/fishbowl/submit',function(req, res){
    mongo.fishbowlSubmit(req, res);
});

app.post('/admin/dash',function(req,res){
    mongo.adminDashSubmit(req, res);
});

app.post('/admin/edit/change',function(req,res){
    mongo.adminChangeSubmit(req, res);
});

app.post('/admin/edit/edit/',function(req,res){
    mongo.adminEditSubmit(req, res);
});

app.post('/admin/edit/remove',function(req,res){
    mongo.adminRemoveSubmit(req, res);
});

//app.post('/admin/fishbowl',function(req,res){
//    mongo.adminFishbowlSubmit(req, res);
//});

app.post('/admin/login',function(req,res){
    mongo.adminLoginSubmit(req, res);
});

app.use(express.static(__dirname + '/html'));

var server = app.listen(81, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});