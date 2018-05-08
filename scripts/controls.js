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

var keyupEvents = {
	up: new Event("releaseUp"),
	down: new Event("releaseDown"),
	right: new Event("releaseRight"),
	left: new Event("releaseLeft"),
	a: new Event("releaseA"),
	b: new Event("releaseB"),
	start: new Event("releaseStart"),
	select: new Event("releaseSelect")
};

function dispatchKeyDown(e) {
	var buttonPressed = controls[e.which];
	if ( buttonPressed ) {
		if ( buttonPressed == "speed" )
			spedUp = true;
		else {
			document.dispatchEvent( keydownEvents[buttonPressed] );
		}
	}
}

function dispatchKeyUp(e) {
	var buttonReleased = controls[e.which];
	if ( buttonReleased ) {
		if ( buttonReleased == "speed" )
			spedUp = false;
		else {
			document.dispatchEvent( keyupEvents[buttonReleased] );
		}
	}
}

var spedUp = false;
var keyDownHandler = document.addEventListener("keydown", dispatchKeyDown);
var keyUpHandler = document.addEventListener("keyup", dispatchKeyUp);
