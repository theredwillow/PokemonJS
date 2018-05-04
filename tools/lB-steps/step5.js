steps[5] = function() {
    backButton.style.visibility = "visible";
    nextButton.style.visibility = "hidden";
    stepTitle.innerHTML = "Your location code is ready!";

    clearInterval(window.animationCycle);

    var resultingCode = document.createElement("textarea");
    display.appendChild(resultingCode);
    resultingCode.innerHTML = JSON.stringify(newLocation, null, 4);
    resultingCode.rows = 20;
    resultingCode.cols = 100;

};
