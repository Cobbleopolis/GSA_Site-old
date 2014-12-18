var sexualityURL = 'https://spreadsheets.google.com/pub?key=12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s&hl=en&output=html';
var romanticURL = 'https://spreadsheets.google.com/pub?key=1SlE3zpanxS1vZ2fAOsCJ4jkSddFYhUe6zJzM_7iCLmA&hl=en&output=html';
var genderURL = 'https://spreadsheets.google.com/pub?key=1M-3rloGazASnuSqzxwcxEcoTrAt6oucTOWP4uuSj-9U&hl=en&output=html';
var otherURL = 'https://spreadsheets.google.com/pub?key=1_AvDOvAjxUUl2xAaomSNi0VfrTMamccL7MdJzvSr-bg&hl=en&output=html';


function getSexuality() {
    var sexualitySpreadsheet = new GoogleSpreadsheet();
    sexualitySpreadsheet.url(sexualityURL);
    sexualitySpreadsheet.load(function(result) {
        var html = '';
        if (result === null) {
            setTimeout(getSexuality, 500);
            return;
        }
        for(var i = 0; i < result.data.length; i += 3){
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + result.data[i] + ':</p>' + 
                '</div>' + 
                '<div class="ui attached segment">' + 
                    '<img class="flagImg" src = "' + result.data[i + 1] + '">' + 
                '</div>' +
                '<div class="ui attached segment">' + 
                    '<p class="flagDesc">' + result.data[i + 2] + '</p>' + 
                '</div>' +
            '</div>';
        }
        document.getElementById('sexualitiesSection').innerHTML = html;
    });
}

function getSexuality2(){
    var html = "";
    $.getJSON("//spreadsheets.google.com/feeds/list/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/values?alt=json", function(data) {
        //first row "title" column
        for(var i = 0; i < data.feed.entry.length; i++){
            alert("loop");
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + data.feed.entry[i]['gsx$sexuality']['$t'] + ':</p>' + 
                '</div>';
        }
    });
    alert("test");
    console.log(html);
    document.getElementById('sexualitiesSection').innerHTML = html;
}

function getRomantic() {
    var romanticSpreadsheet = new GoogleSpreadsheet();
    romanticSpreadsheet.url(romanticURL);
    romanticSpreadsheet.load(function(result) {
        var html = '';
        if (result === null) {
            setTimeout(getRomantic, 500);
            return;
        }
        for(var i = 0; i < result.data.length; i += 3){
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + result.data[i] + ':</p>' + 
                '</div>' + 
                '<div class="ui attached segment">' + 
                    '<img class="flagImg" src = "' + result.data[i + 1] + '">' + 
                '</div>' +
                '<div class="ui attached segment">' + 
                    '<p class="flagDesc">' + result.data[i + 2] + '</p>' + 
                '</div>' +
            '</div>';
        }
        document.getElementById('romanticSection').innerHTML = html;
    });
}

function getGender() {
    var genderSpreadsheet = new GoogleSpreadsheet();
    genderSpreadsheet.url(genderURL);
    genderSpreadsheet.load(function(result) {
        var html = '';
        if (result === null) {
            setTimeout(getGender, 500);
            return;
        };
        for(var i = 0; i < result.data.length; i += 3){
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + result.data[i] + ':</p>' + 
                '</div>' + 
                '<div class="ui attached segment">' + 
                    '<img class="flagImg" src = "' + result.data[i + 1] + '">' + 
                '</div>' +
                '<div class="ui attached segment">' + 
                    '<p class="flagDesc">' + result.data[i + 2] + '</p>' + 
                '</div>' +
            '</div>';
        }
        document.getElementById('gendersSection').innerHTML = html;
    });
}

function getOtherTerms() {
    var html = '';
    var genderSpreadsheet = new GoogleSpreadsheet();
    genderSpreadsheet.url(otherURL);
    genderSpreadsheet.load(function(result) {
        if (result === null) {
            setTimeout(getOtherTerms, 500);
            return;
        };
        for(var i = 0; i < result.data.length; i += 2){
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + result.data[i] + ':</p>' + 
                '</div>' + 
                '<div class="ui attached segment">' + 
                    '<p class="flagDesc">' + result.data[i + 1] + '</p>' + 
                '</div>' +
            '</div>';
        }
        document.getElementById('otherTermsSection').innerHTML = html;
    });
}

function showFlags() {
    localStorage.clear();
    getSexuality2();
    // getRomantic();
    // getGender();
    // getOtherTerms();
}