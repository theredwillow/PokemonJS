document.addEventListener('touchstart', handleStart, false);
document.addEventListener('touchmove', handleMove, false);
document.addEventListener('mousedown', handleStart, false);
document.addEventListener('mousemove', handleMove, false);

var xDown = null;
var yDown = null;

var swipeUp = new Event("swipeUp");
var swipeDown = new Event("swipeDown");
var swipeLeft = new Event("swipeLeft");
var swipeRight = new Event("swipeRight");

function handleStart(e) {
    if (e.touches) {
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
    }
    else {
        xDown = e.clientX;
        yDown = e.clientY;
    }
};

function handleMove(e) {
    if ( ! xDown || ! yDown )
        return;

    if (e.touches) {
        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;
    }
    else {
        var xUp = e.clientX;
        var yUp = e.clientY;
    }

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 )
            document.dispatchEvent(swipeLeft);
        else
            document.dispatchEvent(swipeRight);
    }
    else {
        if ( yDiff > 0 ) 
            document.dispatchEvent(swipeUp);
        else
            document.dispatchEvent(swipeDown);
    }

    xDown = null;
    yDown = null;
};