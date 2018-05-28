var event = new Event('optimizedResize');

var dispatch = function() {
    window.dispatchEvent(event);
};

var resizeCountdown;

var resizeThrottler = function() {
    clearTimeout(resizeCountdown);
    resizeCountdown = setTimeout(dispatch, 100);
};

window.addEventListener("resize", resizeThrottler, false);
