var sexualityURL = 'https://spreadsheets.google.com/pub?key=12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s&hl=en&output=html';
var genderURL = 'https://spreadsheets.google.com/pub?key=1M-3rloGazASnuSqzxwcxEcoTrAt6oucTOWP4uuSj-9U&hl=en&output=html';
var colNum = 3;

function fillSectionTitles () {
    localStorage.clear();
    document.getElementById('sexualities').innerHTML += '<p class="flagSectionTitle">Sexualities</p>';
    document.getElementById('genders').innerHTML += '<p class="flagSectionTitle">Genders</p>';
}

function getSexuality() {
    //localStorage.clear();
    var sexualitySpreadsheet = new GoogleSpreadsheet();
    sexualitySpreadsheet.url(sexualityURL);
    sexualitySpreadsheet.load(function(result) {
        document.getElementById("test").innerHTML = JSON.stringify(result);
        for(var i = 0; i < result.data.length; i += colNum){
            document.getElementById('sexualities').innerHTML += '<p class="flagTitle">' + result.data[i] + ':</p><img class="flagImg" src = "' + result.data[i + 1] + '"><p>' + result.data[i + 2] + '</p>';
        }
    });
}

function getGender() {
    //localStorage.clear();
    var genderSpreadsheet = new GoogleSpreadsheet();
    genderSpreadsheet.url(genderURL);
    genderSpreadsheet.load(function(result) {
        document.getElementById("test2").innerHTML = JSON.stringify(result);
        for(var i = 0; i < result.data.length; i += colNum){
            document.getElementById('genders').innerHTML += '<p class="flagTitle">' + result.data[i] + ':</p><img class="flagImg" src = "' + result.data[i + 1] + '"><p>' + result.data[i + 2] + '</p>';
        }
    });
}

function showFlags() {
    //localStorage.clear();
    fillSectionTitles();
    getSexuality();
    getGender();
}