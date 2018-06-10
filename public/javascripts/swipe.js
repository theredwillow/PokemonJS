document.addEventListener('touchstart', handleStart, false);
document.addEventListener('mousedown', handleStart, false);

var threshold = 20;

var xDown = null;
var yDown = null;

var swipeUp = new Event("swipeUp");
var swipeDown = new Event("swipeDown");
var swipeLeft = new Event("swipeLeft");
var swipeRight = new Event("swipeRight");

var handleStart = function(e) {
    xDown = e.clientX || e.touches[0].clientX;
    yDown = e.clientY || e.touches[0].clientY;
    document.addEventListener('touchend', handleEnd, false);
    document.addEventListener('mouseup', handleEnd, false);
};

var handleEnd = function(e) {
    var xUp = e.clientX || e.touches[0].clientX;
    var yUp = e.clientY || e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > threshold )
            document.dispatchEvent(swipeLeft);
        else
            document.dispatchEvent(swipeRight);
    }
    else {
        if ( yDiff > threshold ) 
            document.dispatchEvent(swipeUp);
        else
            document.dispatchEvent(swipeDown);
    }

    document.removeEventListener('touchend', handleEnd, false);
    document.removeEventListener('mouseup', handleEnd, false);

};
