(function () {
    var fs = require("fs");
    var cheerio = require('cheerio');
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "homePage"];
    var db = require("mongojs").connect(databaseUrl, collections);

    module.exports.pageHandle = function (url, res) {
        fs.readFile(url, function(err, file) {
            if (strEndsWith(url, "index.html")) {
                indexHandle(file, res);
            }
        });
    };

    function indexHandle(page, res){
        var $ = cheerio.load(page);
        var homePage = db.collection("homePage");
        homePage.find(function(err, docs){
            //console.log(docs);
            for(var i = 0; i < docs.length; i++) {
                //console.log(docs[i].content);
                if(docs[i].section === "summary"){
                    //console.log("Before: " + $('#summary_content').html());
                    $('#summary_content').html(docs[i].content);
                    //console.log("After: " + $('#summary_content').html());
                }
            };
            res.send($.html());
        });
    }

    function strEndsWith(str, suffix) {
        return str.match(suffix+"$")==suffix;
    }
}());

