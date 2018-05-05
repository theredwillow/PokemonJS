function MaleTrainer(town, type){

	var thisCharacter = this;

	this.type = type || "character";
	this.name = name || "Red";
	this.gender = "male";

	this.image = "maleTrainer.png";
	this.imageSize = { width: 84, height: 97 };
	this.tileSize = { width: 28, height: 32 };
	this.imageDimensions = { x: 2, y: 2 };

	this.tiles = {
		north:
		{
			standing: { x: 1, y: 2 },
			leftFoot: { x: 0, y: 2 },
			rightFoot: { x: 2, y: 2 }
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
			standing: { x: 1, y: 1, flip: true },
			leftFoot: { x: 0, y: 1, flip: true },
			rightFoot: { x: 2, y: 1, flip: true }
		}
	};

	this.css = {};
	this.css.element = document.head.querySelector("#MaleTrainer-style");
	if ( !this.css.element ) {
		this.css.element = document.createElement("style");
		this.css.element.type = "text/css";
		this.css.element.id = "MaleTrainer-style";

		this.css.element.innerHTML = ".male-trainer {\n";
		var ifWidthIsLonger = ( this.tileSize.width > this.tileSize.height );
		var longerSide = ( ifWidthIsLonger ) ? this.tileSize.width : this.tileSize.height;
		var shorterSide = ( ifWidthIsLonger ) ? this.tileSize.height : this.tileSize.width;
		var newShorterSide = ( tileSize / longerSide ) * shorterSide;
		this.css.element.innerHTML += "\tbackground-image: url('sprites/" + this.image + "');\n";
		this.css.element.innerHTML += "\tbackground-size: ";
		this.css.element.innerHTML += ( this.imageSize.width / this.imageDimensions.x ) + "px ";
		this.css.element.innerHTML += ( this.imageSize.height / this.imageDimensions.y ) + "px;\n";
		this.tileSize.width = (ifWidthIsLonger) ? tileSize : newShorterSide;
		this.tileSize.height = (!ifWidthIsLonger) ? tileSize : newShorterSide;
		this.css.element.innerHTML += "\twidth: " + this.tileSize.width + "px;\n";
		this.css.element.innerHTML += "\theight: " + this.tileSize.height + "px;\n}\n";

		for (var i = 0; i < 4; i++) {
			var dir = directions[i];
			for (var j = 0; j < 3; j++) {
				var stance = stances[j];
				this.css.element.innerHTML += ".male-trainer." + dir + "." + stance;
				this.css.element.innerHTML += ( this.tiles[dir][stance].flip ) ? "\n{\n\t" : " { ";
				this.css.element.innerHTML += "background-position: ";
				this.css.element.innerHTML += ( this.tiles[dir][stance].x * -1 * this.tileSize.width ) + "px ";
				this.css.element.innerHTML += ( this.tiles[dir][stance].y * -1 * this.tileSize.height ) + "px;";
				if ( this.tiles[dir][stance].flip ) {
					if ( dir == "east" || dir == "west" ) {
						this.css.element.innerHTML += `
						-moz-transform: scaleX(-1);
						-o-transform: scaleX(-1);
						-webkit-transform: scaleX(-1);
						transform: scaleX(-1);
						filter: FlipH;
						-ms-filter: "FlipH";`;
					}
					else {
						this.css.element.innerHTML += `
						-moz-transform: scaleY(-1);
						-o-transform: scaleY(-1);
						-webkit-transform: scaleY(-1);
						transform: scaleY(-1);
						filter: FlipV;
						-ms-filter: "FlipV";`;
					}
					this.css.element.innerHTML = this.css.element.innerHTML.replace(/\t{2,}/g, "\t");
					this.css.element.innerHTML += "\n}\n";
				}
				else
					this.css.element.innerHTML += " }\n";
			}
		}

		document.head.appendChild(this.css.element);
	}

	this.draw = function(townIn, r, c) {
		thisCharacter.element = document.createElement("div");
		thisCharacter.element.id = this.name;
		if ( !thisCharacter.facing )
			this.face("south");
		thisCharacter.element.className = "male-trainer";
		thisCharacter.element.className += " " + thisCharacter.type;
		thisCharacter.element.className += " " + thisCharacter.facing;
		thisCharacter.element.className += " " + thisCharacter.step;
		townIn.map.rows[r].cells[c].element.appendChild( thisCharacter.element );
	};

	this.face = function(direction) {
		thisCharacter.facing = direction;
		thisCharacter.element.className = deleteDirection(thisCharacter.element.className);
		thisCharacter.element.className += " " + direction;
	};

	/*
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
	this.stand = function() {
		thisCharacter.stride = "standing";
		thisCharacter.element.style.background = thisCharacter.tile[thisCharacter.facing].standing;
	};
	this.stop = function() { setTimeout(thisCharacter.stand, 100); };
	this.moveTo = function(x, y, special) {
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
		
		if ( !special )
			thisCharacter.step();
		if ( !detectCollision(thisCharacter, x, y) || thisCharacter.god ) {
			thisCharacter.element.style.left = x + "px";
			thisCharacter.element.style.top = y + "px";
		}
		else
			thisCharacter.stop();
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
			thisCharacter.stop();

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
	*/

}
