(function () {
    var fs = require("fs");
    var cheerio = require('cheerio');
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "homePage"];
    var db = require("mongojs").connect(databaseUrl, collections);

    module.exports.indexHandle = function(url, res) {
        fs.readFile(url, function (err, file) {
            var $ = cheerio.load(file);
            var homePage = db.collection("homePage");
            homePage.find(function (err, docs) {
                for (var i = 0; i < docs.length; i++) {
                    if (docs[i].section === "summary") {
                        $('#summary_content').html(docs[i].content);
                    }
                }
                res.send($.html());
            });
        });
    };
}());

