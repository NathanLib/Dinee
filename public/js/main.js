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

addEvent(window, "load", log_form_center);
addEvent(window, "resize", log_form_center);

// *****************************************

function truncateText(element, maxLength) {

    if (element.length > maxLength) {
        element = element.substr(0, maxLength) + '...';
    }
    return element;
}

// *****************************************

$(document).ready(function () {

    $(".recipe-preview")
        .mouseenter(function () {
            $(this).addClass("shadow-lg");
        })
        .mouseleave(function () {
            $(this).removeClass("shadow-lg");
        });

    $(".filters__search .search1").click(function () {
        if ($(".filters__search #search1").prop("checked")) {
            $(".filters__search #search1").prop("checked", false);
            $(".filters__search #search2").prop("checked", false);
        } else {
            $(".filters__search #search1").prop("checked", true);
            $(".filters__search #search2").prop("checked", false);
        }
    });
    $(".filters__search .search2").click(function () {
        if ($(".filters__search #search2").prop("checked")) {
            $(".filters__search #search2").prop("checked", false);
            $(".filters__search #search1").prop("checked", false);
        } else {
            $(".filters__search #search2").prop("checked", true);
            $(".filters__search #search1").prop("checked", false);
        }
    });

    // ****************************

    var sheet = document.createElement('style'),
        $rangeInput = $('.range input'),
        prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

    document.body.appendChild(sheet);

    var getTrackStyle = function (el) {
        var curVal = el.value,
            val = (curVal - 1) * 50,
            style = '';

        // Set active label
        $('.range-labels li').removeClass('active selected');

        var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

        curLabel.addClass('active selected');
        curLabel.prevAll().addClass('selected');

        // Change background gradient
        for (var i = 0; i < prefs.length; i++) {
            style += '.range {background: linear-gradient(to right, #3bccaa 0%, #3bccaa ' + val + '%, #fff ' + val + '%, #fff 100%)}';
            style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #3bccaa 0%, #3bccaa ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
        }

        return style;
    }

    $rangeInput.on('input', function () {
        sheet.textContent = getTrackStyle(this);
    });

    // Change input value on label click
    $('.range-labels li').on('click', function () {
        var index = $(this).index();

        $rangeInput.val(index + 1).trigger('input');

    });

    // ********************************

    if ($(window).width() < 576) {
        $("#filters-container").removeClass("col-2");
        $(".container-fluid > .row").css({ "padding": "0 1rem", "justify-content": "center" });
        $(".filters--open").css({ "display": "block" });

        $(".filters__price, .filters__time, .filters__difficulty, .filters__type, .filters__specificities, .filters__search").css("display", "none");

        $(".filters--open").css({ "cursor": "pointer" })
        $(".filters--close").css({ "cursor": "pointer" })

        $(".filters--open").click(function () {
            $(".filters__price, .filters__time, .filters__difficulty, .filters__type, .filters__specificities, .filters__search").css("display", "block");
            $(".filters--open").css({ "display": "none" });
            $(".filters--close").css({ "display": "block" });
        });

        $(".filters--close").click(function () {
            $(".filters__price, .filters__time, .filters__difficulty, .filters__type, .filters__specificities, .filters__search").css("display", "none");
            $(".filters--open").css({ "display": "block" });
            $(".filters--close").css({ "display": "none" });
        });
    }

    $(window).bind('resize', function (e) {
        if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(function () {
            this.location.reload(false); /* false to get page from cache */
        }, 100);
    });

    // ********************************

    $(".categories .popular, .categories .recent, .categories .bestRated").click(function () {
        $(this).attr("id", 'selected');
        $(".categories .popular, .categories .recent, .categories .bestRated").not(this).removeAttr('id', "selected");
    })

    // ********************************

    $(".recipe-preview #recipe3").css("padding-bottom", "1rem");
    $(".recipe-preview #recipe5, .recipe-preview #recipe6").css("padding-top", "18px");

    $('.recipe-preview__title h4').toArray().forEach(function (element) {
        if (element.innerText.length > 16) {
            element.innerText = truncateText(element.innerText, 12);
        }
    });

    // ********************************

    var $serves = $(".serves__number p").text();

    $(".serves__btnLess").click(function () {
        $serves = $serves - 1;
        $(".serves__number p").text($serves);
    });
    $(".serves__btnMore").click(function () {
        $serves = parseInt($serves) + 1;
        $(".serves__number p").text($serves);
    });

    // ********************************

    $(".social #save").click(function () {
        $("#save span i").removeClass("far");
        $("#save span i").addClass("fas");
        $("#save span").css('color', "#b30000");
        $("#save h6 #save__text").text("Saved!");
    })
});