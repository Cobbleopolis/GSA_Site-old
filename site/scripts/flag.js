var flagURL = "https://spreadsheets.google.com/pub?key=12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s&hl=en&output=html";

//{"url":"https://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic",
//    "key":"12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s",
//    "jsonUrl":"http://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic?alt=json-in-script",
//    "googleUrl":{"sourceIdentifier":"https://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic",
//    "url":"https://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic",
//    "key":"12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s",
//    "jsonCellsUrl":"http://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic?alt=json-in-script",
//    "jsonListUrl":"http://spreadsheets.google.com/feeds/list/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic?alt=json-in-script",
//    "jsonUrl":"http://spreadsheets.google.com/feeds/cells/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/basic?alt=json-in-script"},
//    "data":["Gay (Homosexual-Male)",
//    "Generally refers to a man who is attracted to men. Sometimes refers to all people who are attracted to people of the same sex; sometimes \"homosexual\" is used for this also,
//    although this label is seen by many today as a medical term that should be retired from common use.",
//    "images/flags/gay.png"]}

function getFlag() {
    localStorage.clear();
    var flagJSON;
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(flagURL);
    googleSpreadsheet.load(function(result) {
        flagJSON = JSON.parse(result);
    });
    document.getElementById("test").innerHTML = flagJSON.data[0];
}

function showFlags() {
    getFlag();
    //alert("test");

}