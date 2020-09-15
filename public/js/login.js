function jsLightbox(name, targetWidth, width, height) {		

    jQuery("."+name).css("display","block");
    jQuery("."+name+"-bg").fadeIn('slow');

    var left = ((jQuery(window).width() - jQuery("."+name).outerWidth()) / 2)+"px";
    var top = ((jQuery(window).height() - jQuery("."+name).outerHeight()) / 2)+"px";

    if(jQuery(window).width() <= targetWidth){
        jQuery("."+name).css({
           "left": "5%",
            "top": "5%",
            "width":"90%",
            "height":jQuery(window).height(),
            "overflow-y":"auto",
            "z-index":"9999"
        });
    }else{
        jQuery('.'+name).css({
            "height":  height+"px",
            "overflow-y":"auto",
            "width": width+"px",
            "left": left,
            "top": top
        });
    }
jQuery(window).resize(function() {
    if(jQuery(window).width() <= targetWidth){
        jQuery("."+name).css({
           "left": "5%",
            "top": "5%",
            "width":"90%",
            "height":jQuery(window).height(),
            "overflow-y":"auto",
            "z-index":"9999"
        });
    }else{
        jQuery('.'+name).css({
            "height":  height+"px",
            "overflow-y":"auto",
            "width": width+"px",
            "left": left,
            "top": top
        });
    }
});
jQuery("."+name+" #js-lightbox-close, #js-lightbox-bg").click(function() {
    jQuery("."+name+"-bg").fadeOut('slow');
    jQuery("."+name).fadeOut('slow');
    jQuery("html, body").css("overflow-y", "auto");
});
jQuery(document).keyup(function(e) {
    if (e.keyCode == 27) {
        jQuery("."+name+"-bg").fadeOut('slow');
        jQuery("."+name).fadeOut('slow');
        jQuery("html, body").css("overflow-y", "auto");
    }
});
}
