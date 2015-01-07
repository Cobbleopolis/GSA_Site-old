function makeSlideshow() {

    fillSummery();
    fillSlideshow();
    activateSlideshow();

}

function fillSummery(){
    $.getJSON("//spreadsheets.google.com/feeds/list/1ZSDcRkfQ8Mus6SIOp8qe0qsR3cTpGz6sJ7E4ZcZ0in0/od6/public/values?alt=json", function (data) {
       for(var i = 0; i < data.feed.entry.length; i++){
           if(data.feed.entry[i]['gsx$section']['$t'].toLowerCase() === 'summery'){
               document.getElementById('summery_content').innerHTML = data.feed.entry[i]['gsx$content']['$t'];
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
        var $slideshow = $('#slideshow')
        for (var i = 0; i < data.feed.entry.length; i++) {
            var entry = '';
            if (data.feed.entry[i]['gsx$type']['$t'].toLowerCase() === 'image') {
                entry += '<div style="display: none;"><img src="' + data.feed.entry[i]['gsx$content']['$t'] + '" width = "' + $slideshow.width() + '" height = "' + $slideshow.height() + '"></div>';
            } else if (data.feed.entry[i]['gsx$type']['$t'].toLowerCase() === 'text') {
                entry += '<div style="display: none;">' + data.feed.entry[i]['gsx$content']['$t'] + '</div>';
            }
            $slideshow.append(entry);
        }
    });
}