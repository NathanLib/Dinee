function addEvent(element, type, listener) {
    if (element.addEventListener) {
        element.addEventListener(type, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, listener);
    }
}

// *****************************************

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}

// *****************************************

function log_form_center() {
    $('.containerLog').center();
}

addEvent(window, "resize", log_form_center);

// *****************************************

$(document).ready(function () {
    window.onload(log_form_center());
});