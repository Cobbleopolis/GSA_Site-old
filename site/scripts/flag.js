var sexualityURL = 'https://spreadsheets.google.com/pub?key=12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s&hl=en&output=html';
var romanticURL = 'https://spreadsheets.google.com/pub?key=1SlE3zpanxS1vZ2fAOsCJ4jkSddFYhUe6zJzM_7iCLmA&hl=en&output=html';
var genderURL = 'https://spreadsheets.google.com/pub?key=1M-3rloGazASnuSqzxwcxEcoTrAt6oucTOWP4uuSj-9U&hl=en&output=html';
var otherURL = 'https://spreadsheets.google.com/pub?key=1_AvDOvAjxUUl2xAaomSNi0VfrTMamccL7MdJzvSr-bg&hl=en&output=html';

function getSexuality(){
    $.getJSON("//spreadsheets.google.com/feeds/list/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/values?alt=json", function(data) {
        loadSection(data, 'sexualitiesSection');
    });
}

function getRomantic() {
    $.getJSON("//spreadsheets.google.com/feeds/list/1SlE3zpanxS1vZ2fAOsCJ4jkSddFYhUe6zJzM_7iCLmA/od6/public/values?alt=json", function(data) {
        loadSection(data, 'romanticSection');
    });
}

function getGender() {
    $.getJSON("//spreadsheets.google.com/feeds/list/1M-3rloGazASnuSqzxwcxEcoTrAt6oucTOWP4uuSj-9U/od6/public/values?alt=json", function(data) {
        loadSection(data, "gendersSection");
    });
}

function getOtherTerms() {
    $.getJSON("//spreadsheets.google.com/feeds/list/1_AvDOvAjxUUl2xAaomSNi0VfrTMamccL7MdJzvSr-bg/od6/public/values?alt=json", function(data){
        loadSection(data, "otherTermsSection");
    });
}

function loadSection(data, section){
        var html = "";
        for(var i = 0; i < data.feed.entry.length; i++){
            html += '<div class="flagEntry">' + 
                '<div class="ui top attached header">' + 
                    '<p class="flagTitle">' + data.feed.entry[i]['gsx$identification']['$t'] + ':</p>' + 
                '</div>';
                if(data.feed.entry[i]['gsx$imagelink']['$t']){
                    html += '<div class="ui attached segment">' + 
                        '<img class="flagImg" src = "' + data.feed.entry[i]['gsx$imagelink']['$t'] + '">' + 
                    '</div>';
                }
                html += '<div class="ui attached segment">' + 
                    '<p class="flagDesc">' + data.feed.entry[i]['gsx$description']['$t'] + '</p>' + 
                '</div>' +
            '</div>';
        }
        // console.log(html);
        document.getElementById(section).innerHTML = html;
}

function showFlags() {
    localStorage.clear();
    getSexuality();
    getRomantic();
    getGender();
    getOtherTerms();
}