(function () {
    var sys = require("sys");
    var cheerio = require('cheerio');
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "homePage"];
    var db = require("mongojs").connect(databaseUrl, collections);

    module.exports.pageHandle = function (request, page, response) {
        //console.log(request);
        //console.log(strEndsWith(request, "index.html"));
        //console.log("--------------------");
        if (strEndsWith(request, "index.html")) {
            indexHandle(page, response);
        }
    };

    function indexHandle(page, response){
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
            response.write($.html());
            response.end();
        });
    }

    function strEndsWith(str, suffix) {
        return str.match(suffix+"$")==suffix;
    }
}());

