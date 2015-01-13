(function () {
    var fs = require("fs");
    var cheerio = require('cheerio');
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "homePage"];
    var db = require("mongojs").connect(databaseUrl, collections);

    var navBar = fs.readFileSync(__dirname + "/html/resorcePages/navBar.html");
    var navButton = fs.readFileSync(__dirname + "/html/resorcePages/navButton.html");




    module.exports.indexHandle = function(url, res) {
        //console.log(__dirname);
        fs.readFile(url, function (err, file) {
            var $ = cheerio.load(file);
            $("#navBar").html(navBar);
            $("#navButton").html(navButton);
            var homePage = db.collection("homePage");
            homePage.find(function (err, docs) {
                for (var i = 0; i < docs.length; i++) {
                    switch(docs[i].section){
                        case "summary":
                            $('#summary_content').html(docs[i].content);
                            break;
                        case "about":
                            $('#about_content').html(docs[i].content);
                            break;
                        case "meetings":
                            $('#meeting_content').html(docs[i].content);
                            break;
                        case "fishbowl":
                            $('#fishbowl_content').html(docs[i].content);
                    }
                }
                res.send($.html());
            });
        });
    };



}());

