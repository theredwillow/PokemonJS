var updateOnlineSwitch = function(e) {
    console.log("Online/Offline triggered", e.type);
};
window.addEventListener('offline', updateOnlineSwitch);
window.addEventListener('online', updateOnlineSwitch);

var onlineSelection = document.getElementById("online-selection")
var limitedSelection = document.getElementById("limited-selection");
var offlineSelection = document.getElementById("offline-selection");

var currentMouseLoc;
var moveSlider = function(e) {
    currentMouseLoc = e.clientY || e.touches[0].pageY;
};

var limitedPosition;
var offlinePosition;
var sliderGrab = function(e) {
    e.preventDefault();
    limitedPosition = limitedSelection.getBoundingClientRect().top;
    offlinePosition = offlineSelection.getBoundingClientRect().top;
    document.addEventListener("mousemove", moveSlider);
    document.addEventListener("mouseup", sliderRelease);
    document.addEventListener("touchmove", moveSlider);
    document.addEventListener("touchend", sliderRelease);
};

var sliderRelease = function(e) {
    e.preventDefault();
    document.removeEventListener("mousemove", moveSlider);
    document.removeEventListener("mouseup", sliderRelease);
    document.removeEventListener("touchmove", moveSlider);
    document.removeEventListener("touchend", sliderRelease);
    if ( currentMouseLoc >= offlinePosition )
        offlineSelection.checked = true;
    else if ( currentMouseLoc >= limitedPosition )
        limitedSelection.checked = true;
    else
        onlineSelection.checked = true;
};

var offlineSlider = document.getElementById("offline-slider");
offlineSlider.addEventListener("mousedown", sliderGrab, false);
offlineSlider.addEventListener("touchstart", sliderGrab, false);
