(function () {
    var sys = require("sys");
    var databaseUrl = "gsa-site:gayisok1@99.62.101.62:25566/gsa-site"; // "username:password@example.com/mydb"
    var collections = ["names", "test"]
    var db = require("mongojs").connect(databaseUrl, collections);


    module.exports.test = function () {
        db.names.find({sex: "male"}, function (err, names) {
            if (err || !names) console.log("No female users found");
            else names.forEach(function (maleUser) {
                console.log(maleUser);
            });
        });
    }
}());

