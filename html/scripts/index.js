function makeHomePage() {
    $('#slideshow_entry').outerHeight($('#summery_entry').outerHeight());
    $('.slideshow_img').attr( 'height', $('#slideshow_entry').height());
    activateSlideshow();
}

function activateSlideshow() {
    $(function() {
        $("#slideshow_entry > div:gt(0)").hide();
        setInterval(function() {
            $('#slideshow_entry > div:first').fadeOut(1000);
            $('#slideshow_entry > div:first').next().delay(1000).fadeIn(1000);
            $('#slideshow_entry > div:first').appendTo("#slideshow_entry");
        }, 3000);
    });

}