function makeHomePage() {
    $('#slideshow_entry').outerHeight($('#summery_entry').outerHeight());
    $('.slideshow_img').attr( 'height', $('#slideshow_entry').height());
    activateSlideshow();
}

function activateSlideshow() {
    $(function(){
        $('#slideshow_entry div:gt(0)').hide();
        setInterval(function(){
                $('#slideshow_entry div:first-child').fadeOut(1000)
                    .next().fadeIn(1000)
                    .end().appendTo('#slideshow_entry');},
            4000);
    });
}