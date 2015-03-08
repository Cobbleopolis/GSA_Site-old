function makeHomePage() {
    $('#slideshow_entry').outerHeight($('#summery_entry').outerHeight());
    $('.slideshow_img').attr( 'height', $('#slideshow_entry').height());
    activateSlideshow();
}

var animTime = 500;

function activateSlideshow() {
    $(function() {
        $("#slideshow_entry > div:gt(0)").hide();
        setInterval(function() {
            $('#slideshow_entry > div:first').fadeOut(animTime);
            $('#slideshow_entry > div:first').next().delay(animTime).fadeIn(animTime);
            $('#slideshow_entry > div:first').appendTo("#slideshow_entry");
        }, 4000);
    });

}
