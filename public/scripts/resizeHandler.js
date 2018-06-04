var resizeEvent = new Event('optimizedResize');

var checkDisplayType = function() {

    var screen = {};

    var isPortrait = (window.innerHeight > window.innerWidth);
    if (isPortrait) {
        document.body.classList.remove("landscape");
        document.body.classList.add("portrait");
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
    }
    else {
        document.body.classList.remove("portrait");
        document.body.classList.add("landscape");
        screen.width = window.innerHeight;
        screen.height = window.innerWidth;
    }

    var mobileWidth = (screen.width <= 450);
    var mobileHeight = (screen.height <= 875);
    var isMobile = (mobileWidth && mobileHeight);
    if (isMobile) {
        document.body.classList.remove("desktop");
        document.body.classList.add("mobile");
    }
    else {
        document.body.classList.remove("mobile");
        document.body.classList.add("desktop");
    }

    // alert(window.innerWidth + "x" + window.innerHeight);

};

var dispatch = function() {
    window.dispatchEvent(resizeEvent);
    checkDisplayType();
};

var resizeCountdown;

var resizeThrottler = function() {
    clearTimeout(resizeCountdown);
    resizeCountdown = setTimeout(dispatch, 100);
};

window.addEventListener("resize", resizeThrottler, false);

window.addEventListener("load", checkDisplayType);
