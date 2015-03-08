function makeHomePage() {
    $('#slideshow_entry').outerHeight($('#summery_entry').outerHeight());
    $('.slideshow_img').attr( 'height', $('#slideshow_entry').height());
    activateSlideshow();
}


