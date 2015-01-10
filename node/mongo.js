(function () {
    var sys = require("sys");
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "test"]
    var db = require("mongojs").connect(databaseUrl, collections);

    module.exports.pageHandle = function () {
        var homePage = db.collection("homePage");
        homePage.find().toArray(function(err, docs){
            console.log("retrieved records:");
            console.log(docs);
        });
        //console.log(db.homePage.summary);
    };

    module.exports.test = function () {
        db.names.find({ }, function (err, names) {
            if (err || !names) console.log("No names found");
            else names.forEach(function (names) {
                console.log(names.name);
            });
        });
    };

    function strStartsWith(str, prefix) {
        return str.indexOf(prefix) === 0;
    }

    function strEndsWith(str, suffix) {
        return str.match(suffix+"$")==suffix;
    }
}());

