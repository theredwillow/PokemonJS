var newLocation = {};

var stepTitle = document.querySelector("#step-title");
var leftOptions = document.querySelector("#left-options");
var display = document.querySelector("#display");
var rightOptions = document.querySelector("#right-options");

var nextStep = 0;
var steps = [];

var numOfRows;
var numOfColumns;

var backButton = document.querySelector("#backButton");
var goBack = function() {
    display.innerHTML = "";
    nextStep--;
    steps[(nextStep - 1)]();
};
backButton.addEventListener("click", goBack);
backButton.addEventListener("focus", function() { backButton.blur(); } );

var nextButton = document.querySelector("#nextButton");
nextButton.style.visibility = "hidden";
var goForward = function() {
    display.innerHTML = "";
    steps[nextStep++]();
};
nextButton.addEventListener("click", goForward);
nextButton.addEventListener("focus", function() { nextButton.blur(); } );

var s = 0;
var numOfSteps = 6;
var loadNextStep = function(){
    var script = document.createElement("script");
    script.onload = function () {
        s++;
        if (s == numOfSteps) {
            steps[nextStep++]();
        }
        else
            loadNextStep();
    };
    script.src = "lB-steps/step" + s + ".js";
    document.head.appendChild(script);
};
loadNextStep();
