var controls = {
	38: "up",
	40: "down",
	39: "right",
	37: "left",
	90: "a", // z button
	88: "b", // x button
	13: "start", // Enter button
	16: "select", // Shift button
	32: "speed" // Space button
};

var keydownEvents = {
	up: new Event("pushUp"),
	down: new Event("pushDown"),
	right: new Event("pushRight"),
	left: new Event("pushLeft"),
	a: new Event("pushA"),
	b: new Event("pushB"),
	start: new Event("pushStart"),
	select: new Event("pushSelect")
};

function dispatchKeyDown(e) {
	var buttonPressed = controls[e.which];
	if ( buttonPressed ) {
		if ( buttonPressed == "speed" )
			speedUp = true;
		else
			document.dispatchEvent( keydownEvents[buttonPressed] );
	}
}

function slowDown(e) {
	if ( "speed" == controls[e.which] )
		speedUp = false;
}

var speedUp = false;
var keyDownHandler = document.addEventListener("keydown", dispatchKeyDown);
var keyUpHandler = document.addEventListener("keyup", slowDown);

document.addEventListener("pushUp", function(){ console.log("Up event happening"); } );