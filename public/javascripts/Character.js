var Character = function(thisCharacter) {

	thisCharacter.type = (window.credentials.username == thisCharacter.user) ? "player" : "character";
	thisCharacter.gender = "male";

	thisCharacter.id = "male-trainer";

	thisCharacter.image = {
		_id: "maleTrainer",
		dimensions: {
			width: 84,
			height: 97,
			tiles: { width: 28, height: 32 }
			// tile dimensions: 3,3
			// tileSize game: 16px
		}
	};

	thisCharacter.tiles = {
		north: {
			standing: { x: 1, y: 2 },
			leftFoot: { x: 0, y: 2 },
			rightFoot: { x: 2, y: 2 }
		},
		south: {
			standing: { x: 1, y: 0 },
			leftFoot: { x: 0, y: 0 },
			rightFoot: { x: 2, y: 0 }
		},
		west: {
			standing: { x: 1, y: 1 },
			leftFoot: { x: 0, y: 1 },
			rightFoot: { x: 2, y: 1 }
		},
		east: {
			standing: { x: 1, y: 1, flip: true },
			leftFoot: { x: 0, y: 1, flip: true },
			rightFoot: { x: 2, y: 1, flip: true }
		}
	};

	thisCharacter.css = generateCSS(thisCharacter);

	thisCharacter.draw = function(townIn) {
		thisCharacter.element = document.createElement("div");
		thisCharacter.element.id = thisCharacter.user;
		thisCharacter.element.className = "male-trainer";
		thisCharacter.element.className += " " + thisCharacter.type;
		thisCharacter.walk.facing = thisCharacter.walk.facing || "south";
		thisCharacter.walk.stride = thisCharacter.walk.stride || "standing";

		if ( thisCharacter.type == "player" )
			townIn.player = thisCharacter;
		thisCharacter.town = townIn;

		thisCharacter.walk.location = thisCharacter.location;

		thisCharacter.element.addEventListener("talk", thisCharacter.onTalk, false);

	};

	thisCharacter.walk = {

		foot: "right",

		set location(pos) {
			
			var collision = false;
			var newRow = thisCharacter.town.rows[pos.r];
			if ( newRow && newRow.cells && newRow.cells[pos.c] ) {
				if ( newRow.cells[pos.c].element ) {
					if ( newRow.cells[pos.c].element.innerHTML )	
						collision = "character";
					else if ( newRow.cells[pos.c].portal )
						collision = "building";
					else if ( !newRow.cells[pos.c].walk )	
						collision = "nonwalkable tile";
				}
				else if ( newRow.cells[pos.c].portal )	
					collision = "route";
			}
			else	
				collision = "border";
			
			if ( collision ) {
				if ( collision == "building" || collision == "route" ) {
					var thisPort = thisCharacter.teleport(newRow.cells[pos.c].portal, collision);
					if (!thisPort) {
						thisCharacter._location = { r: pos.r, c: pos.c };
						thisCharacter.town.move();
						newRow.cells[pos.c].element.appendChild(thisCharacter.element);
					}
				}
				else if ( !thisCharacter.god )
					console.log(thisCharacter.user, "can't move to row", pos.r + ", cell", pos.c + ". There's a", collision, "there.");
			}
			else {
				thisCharacter._location = { r: pos.r, c: pos.c };
				thisCharacter.town.move();
				newRow.cells[pos.c].element.appendChild(thisCharacter.element);
			}
		},
		get location() {
			return thisCharacter._location;
		},

		set facing(pos) {
			thisCharacter._facing = pos;
			thisCharacter.element.className = thisCharacter.element.className.replace(/\s?((north)|(south)|(east)|(west))/gi, "");
			thisCharacter.element.className += " " + thisCharacter._facing;
		},
		get facing() {
			return thisCharacter._facing;
		},

		set stride(pos) {
			thisCharacter._stride = pos;
			thisCharacter.element.className = thisCharacter.element.className.replace(/\s?((standing)|((left|right)Foot))/gi, "");
			thisCharacter.element.className += " " + thisCharacter._stride;
		},
		get stride() {
			return thisCharacter._stride;
		},

		step: function() {
			if ( thisCharacter.stride == "standing" ) {
				thisCharacter.stride = thisCharacter.foot + "Foot";
				thisCharacter.foot = ( thisCharacter.foot == "right" ) ? "left" : "right";
			}
			else
				thisCharacter.stride = "standing";
		},

		stand: function() { thisCharacter.walk.stride = "standing"; },

		stop: function() { setTimeout(thisCharacter.walk.stand, 100); }

	};

	thisCharacter.teleport = function(portal, collision) {
		var destination = game.sprites.find(function(s){ return s.user == portal.destination.location; });
		if (destination) {
			if ( portal[ thisCharacter.walk.facing ] ) {
				thisCharacter.town.erase();
				thisCharacter.draw( destination, portal.destination.r, portal.destination.c );
				return true;
			}
			else
				return false;
		}
		else {
			console.log("Portal is broken,", portal.destination.location, "wasn't loaded.");
			return false;
		}
	};

	thisCharacter.moveTo = function(r,c) {

		// Need to add spedUp functionality

		if ( !thisCharacter.walk.location )
			return;

		r = r || thisCharacter.walk.location.r;
		c = c || thisCharacter.walk.location.c;

		if ( r[0] == "-" ) {
			r = Number( r.substr(1) );
			r = thisCharacter.walk.location.r - r;
		}
		else if ( r[0] == "+" ) {
			r = Number( r.substr(1) );
			r += thisCharacter.walk.location.r;
		}

		if ( c[0] == "-" ) {
			c = Number( c.substr(1) );
			c = thisCharacter.walk.location.c - c;
		}
		else if ( c[0] == "+" ){
			c = Number( c.substr(1) );
			c += thisCharacter.walk.location.c;
		}
		
		thisCharacter.walk.location = { r, c };

	};
	thisCharacter.moveNorth = function() {
		thisCharacter.walk.facing = "north";
		thisCharacter.walk.step();
		thisCharacter.moveTo("-1", null);
	};
	thisCharacter.moveSouth = function() {
		thisCharacter.walk.facing = "south";
		thisCharacter.walk.step();
		thisCharacter.moveTo("+1", null);
	};
	thisCharacter.moveEast = function() {
		thisCharacter.walk.facing = "east";
		thisCharacter.walk.step();
		thisCharacter.moveTo(null, "+1");
	};
	thisCharacter.moveWest = function() {
		thisCharacter.walk.facing = "west";
		thisCharacter.walk.step();
		thisCharacter.moveTo(null,"-1");
	};

	if (thisCharacter.type == "character") {

		thisCharacter.talk = new Event("talk");
		thisCharacter.onTalk = function() {
			alert("You look an awful lot like me.");
		};

		thisCharacter.p = 0;
		thisCharacter.pace = 3;
		thisCharacter.pacing = function() {
			if ( !thisCharacter.town.player )
				return;

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
			thisCharacter.walk.stop();

			if ( thisCharacter.p < 7 )
				thisCharacter.p++;
			else
				thisCharacter.p = 0;
		};
		setInterval( thisCharacter.pacing, (thisCharacter.pace * 1000) );

	}
	else {

		document.addEventListener("pushUp", thisCharacter.moveNorth);
		document.addEventListener("pushDown", thisCharacter.moveSouth);
		document.addEventListener("pushRight", thisCharacter.moveEast);
		document.addEventListener("pushLeft", thisCharacter.moveWest);

		document.addEventListener("releaseUp", thisCharacter.walk.stop);
		document.addEventListener("releaseDown", thisCharacter.walk.stop);
		document.addEventListener("releaseRight", thisCharacter.walk.stop);
		document.addEventListener("releaseLeft", thisCharacter.walk.stop);

	}

	return thisCharacter;

}
