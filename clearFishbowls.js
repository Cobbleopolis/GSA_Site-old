db.fishbowl.drop();
db.mesc.update({field: "nextWipeDate"}, {field: "nextWipeDate", entry: new Date(+new Date + 12096e5)});
