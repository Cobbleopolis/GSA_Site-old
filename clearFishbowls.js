//run with mongo --port 25566 clearFishbowls.js
var db = connect("localhost:25566/gsa-site");

db.fishbowl.drop();
db.mesc.update({field: "nextWipeDate"}, {field: "nextWipeDate", entry: new Date(+new Date + 12096e5)});
