function makeHomePage() {
    $('#slideshow').height($('#summery_entry').outerHeight());
    $('.slideshow_img').attr( 'height', $('#slideshow').height());
    $('.slideshow_img').attr( 'width', $('#slideshow').width());
    activateSlideshow();
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
    }, 4000);

}