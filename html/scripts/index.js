function makeHomePage() {
    fillContent();
    fillSlideshow();
    activateSlideshow();
}

function fillContent() {
    $.getJSON("//spreadsheets.google.com/feeds/list/1ZSDcRkfQ8Mus6SIOp8qe0qsR3cTpGz6sJ7E4ZcZ0in0/od6/public/values?alt=json", function (data) {
        for (var i = 0; i < data.feed.entry.length; i++) {
            if (data.feed.entry[i]['gsx$section']['$t'].toLowerCase() === 'summery') {
                document.getElementById('summery_content').innerHTML = '';
                document.getElementById('summery_content').innerHTML = '<p class="content_paragraph">' + data.feed.entry[i]['gsx$content']['$t'] + '</p>';
            } else if (data.feed.entry[i]['gsx$section']['$t'].toLowerCase() === 'about') {
                document.getElementById('about_content').innerHTML = '';
                document.getElementById('about_content').innerHTML = '<p class="content_paragraph">' + data.feed.entry[i]['gsx$content']['$t'] + '</p>';
            } else if (data.feed.entry[i]['gsx$section']['$t'].toLowerCase() === 'meeting'){
                document.getElementById('meeting_content').innerHTML = '';
                document.getElementById('meeting_content').innerHTML = '<p class="content_paragraph">' + data.feed.entry[i]['gsx$content']['$t'] + '</p>';
            } else if (data.feed.entry[i]['gsx$section']['$t'].toLowerCase() === 'fishbowl') {
                document.getElementById('fishbowl_content').innerHTML = '';
                document.getElementById('fishbowl_content').innerHTML = '<p class="content_paragraph">' + data.feed.entry[i]['gsx$content']['$t'] + '</p>';
            }
        }
        $('#slideshow').height($('#summery_entry').outerHeight());
    });
}

function activateSlideshow() {
    $("#slideshow").find("> div:gt(0)").hide();
    setInterval(function () {
        $('#slideshow').find('> div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 3000);

}

function fillSlideshow() {
    $.getJSON("//spreadsheets.google.com/feeds/list/1T7fxjhZnCayw4Go-pX4gAmuuTwtqvnf_glgcwahuHDE/od6/public/values?alt=json", function (data) {
        var $slideshow = $('#slideshow');
        var html = '';
        for (var i = 0; i < data.feed.entry.length; i++) {
            if (i === 0) {
                html += '<div style="display: block">';
            } else {
                html += '<div style="display: none">';
            }
            html += '<img src="' + data.feed.entry[i]['gsx$content']['$t'] + '" width = "' + $slideshow.width() + '" height = "' + $slideshow.height() + '"></div>';
        }
        document.getElementById('slideshow').innerHTML = html;
    });
}