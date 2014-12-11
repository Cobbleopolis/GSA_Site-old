var sexualityURL = '//spreadsheets.google.com/pub?key=12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s&hl=en&output=html';
var colNum = 3;

function getSexuality() {
    localStorage.clear();
    document.getElementById('flags').innerHTML += '<p class="flagSectionTitle">Sexualities</p>';
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(sexualityURL);
    googleSpreadsheet.load(function(result) {
        for(var i = 0; i < result.data.length / colNum; i++){
            document.getElementById('flags').innerHTML += '<p class="flagTitle">' + result.data[i * 3] + ':</p><img class="flagImg" src = "' + result.data[i * 3 + 1] + '"><p>' + result.data[i * 3 + 2] + '</p>';
        }
    });
}

function showFlags() {
    getSexuality();

}