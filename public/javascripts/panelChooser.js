var panels = document.getElementsByClassName("panel");
var panelIndex = 0;

for (var p = 0; p < panels.length; p++) {
    if ( panels[p].classList.contains("in-view") ) {
        panelIndex = p;
        break;
    }
}

var slideDivsRight = function() {
    if ( !document.body.classList.contains("mobile") || panelIndex == 0 )
        return;

    panels[panelIndex--].classList.remove("in-view");
    panels[panelIndex].classList.add("in-view");
};
document.addEventListener("swipeRight", slideDivsRight);

var slideDivsLeft = function() {
    if ( !document.body.classList.contains("mobile") || panelIndex == ( panels.length - 1 ) )
        return;

    panels[panelIndex++].classList.remove("in-view");
    panels[panelIndex].classList.add("in-view");
};
document.addEventListener("swipeLeft", slideDivsLeft);