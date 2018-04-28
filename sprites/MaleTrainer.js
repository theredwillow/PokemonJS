function MaleTrainer(name, type){

	var thisCharacter = this;

	this.type = type || "character";
	this.name = name || "Red";
	this.gender = "male";

	this.image = "sprites/maleTrainer.png";
	this.tileSize = { width: 28, height: 32 };

	this.element = document.createElement("div");
	this.element.style.position = "absolute";
    this.element.style.width = this.tileSize.width;
	this.element.style.height = this.tileSize.height;
	this.element.className = "trainer male";
	document.body.appendChild(this.element);

	this.tile = {
		north:
		{
			standing: { x: 1, y: 3 },
			leftFoot: { x: 0, y: 3 },
			rightFoot: { x: 2, y: 3 }
		},
		south:
		{
			standing: { x: 1, y: 0 },
			leftFoot: { x: 0, y: 0 },
			rightFoot: { x: 2, y: 0 }
		},
		west:
		{
			standing: { x: 1, y: 1 },
			leftFoot: { x: 0, y: 1 },
			rightFoot: { x: 2, y: 1 }
		},
		east:
		{
			standing: { x: 1, y: 2 },
			leftFoot: { x: 0, y: 2 },
			rightFoot: { x: 2, y: 2 }
		}
	};
	// Automatically convert tile positions to CSS backgrounds
	var directions = ["north", "south", "east", "west"];
	var stances = ["standing", "leftFoot", "rightFoot"];
	for (var i = 0; i < 4; i++) {
		var dir = directions[i];
		for (var j = 0; j < 3; j++) {
			var stnc = stances[j];
			var newVal = "url('" + this.image + "') ";
			newVal += (this.tile[dir][stnc].x * -1 * this.tileSize.width) + "px";
			newVal += " ";
			newVal += (this.tile[dir][stnc].y * -1 * this.tileSize.height) + "px";
			this.tile[dir][stnc] = newVal;
		}
	}

	this.face = function(direction) {
		thisCharacter.facing = direction;
		thisCharacter.element.style.background = thisCharacter.tile[direction].standing;
	};
	this.face("south");

	this.stride = "standing";
	this.foot = "right";
	this.step = function() {
		if ( thisCharacter.stride == "standing" ) {
			thisCharacter.stride = thisCharacter.foot + "Foot";
			thisCharacter.foot = ( thisCharacter.foot == "right" ) ? "left" : "right";
		}
		else
			thisCharacter.stride = "standing";
		thisCharacter.element.style.background = thisCharacter.tile[thisCharacter.facing][thisCharacter.stride];
	};
	this.stop = function() {
		thisCharacter.stride = "standing";
		thisCharacter.element.style.background = thisCharacter.tile[thisCharacter.facing].standing;
	};
	this.moveTo = function(x, y) {
		var currentX = Number(thisCharacter.element.style.left.replace("px","")) || 0;
		var currentY = Number(thisCharacter.element.style.top.replace("px","")) || 0;
		var currentWidth = Number(thisCharacter.tileSize.width);
		var currentHeight = Number(thisCharacter.tileSize.height);

		x = x || currentX;
		y = y || currentY;

		if ( x == "-" )
			x = currentX + currentWidth;
		else if ( x == "+" )
			x = currentX - currentWidth;

		if ( y == "-" )
			y = currentY + currentHeight;
		else if ( y == "+" )
			y = currentY - currentHeight;
		
		thisCharacter.element.style.left = x + "px";
		thisCharacter.element.style.top = y + "px";
		thisCharacter.step();
	};
	this.moveNorth = function() {
		thisCharacter.face("north");
		thisCharacter.moveTo(null,"+");
	};
	this.moveSouth = function() {
		thisCharacter.face("south");
		thisCharacter.moveTo(null,"-");
	};
	this.moveEast = function() {
		thisCharacter.face("east");
		thisCharacter.moveTo("-", null);
	};
	this.moveWest = function() {
		thisCharacter.face("west");
		thisCharacter.moveTo("+",null);
	};

	if (this.type == "character") {

		this.element.className += " villager";

		this.talk = new Event("talk");
		this.onTalk = function() {
			alert("You look an awful lot like me.");
		};
		this.element.addEventListener("talk", thisCharacter.onTalk, false);

		this.p = 0;
		this.pace = 3;
		this.pacing = function() {
			switch (thisCharacter.p) {
			    case 0:
			    case 1:
			        thisCharacter.moveWest();
			        break;
			    case 2:
			    case 3:
			    case 4:
			    case 5:
			    	thisCharacter.moveEast();
			        break;
			    case 6:
			    case 7:
			    	thisCharacter.moveWest();
			    	break;
			}
			setTimeout(thisCharacter.stop, 100);

			if ( thisCharacter.p < 7 )
				thisCharacter.p++;
			else
				thisCharacter.p = 0;
		};
		setInterval( thisCharacter.pacing, (thisCharacter.pace * 1000) );

	}
	else {

		thisCharacter.element.className += " player";
		document.addEventListener("pushUp", this.moveNorth);
		document.addEventListener("pushDown", this.moveSouth);
		document.addEventListener("pushRight", this.moveEast);
		document.addEventListener("pushLeft", this.moveWest);

		document.addEventListener("releaseUp", this.stop);
		document.addEventListener("releaseDown", this.stop);
		document.addEventListener("releaseRight", this.stop);
		document.addEventListener("releaseLeft", this.stop);

	}

}
