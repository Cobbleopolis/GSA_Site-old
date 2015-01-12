(function () {
    var sys = require("sys");
    var cheerio = require('cheerio');
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "homePage"];
    var db = require("mongojs").connect(databaseUrl, collections);

    module.exports.pageHandle = function (request, page) {
        var out_page = page;
        //sys.puts(request);
        //sys.puts(strEndsWith(request, "index.html"));
        //sys.puts("--------------------");
        if (strEndsWith(request, "index.html")) {
            out_page = indexHandle(request, page);
        }
        return out_page;
    };

    function indexHandle(request, page){
        var $ = cheerio.load(page);
        var homePage = db.collection("homePage");
        homePage.find().toArray(function(err, docs){
            docs.forEach(function(doc) {
                if(doc.section === "summary"){
                    sys.puts("Before: " + $('#summary_content').html());
                    $('#summary_content').html(doc.content);
                    sys.puts("After: " + $('#summary_content').html());
                }
            });

        });
        sys.puts($.html());
        return $.html();
    }

    //module.exports.indexHandle = indexHandle(page);

    function strEndsWith(str, suffix) {
        return str.match(suffix+"$")==suffix;
    }
}());

