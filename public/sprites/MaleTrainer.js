function MaleTrainer(type){

	var thisCharacter = this;

	game.sprites.push(this);

	this.type = type || "character";
	this.name = name || "Red";
	this.gender = "male";
	this.location = { r: 0, c: 0 };

	this.id = "male-trainer";

	this.image = "maleTrainer.png";
	this.imageSize = { width: 84, height: 97 };
	this.tileSize = { width: 28, height: 32 };
	this.imageDimensions = { x: 3, y: 3 };

	this.tiles = {
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

	this.css = generateCSS(this);

	this.draw = function(townIn, r, c) {
		thisCharacter.element = document.createElement("div");
		thisCharacter.element.id = this.name;
		thisCharacter.element.className = "male-trainer";
		thisCharacter.element.className += " " + thisCharacter.type;
		thisCharacter.walk.facing = thisCharacter.walk.facing || "south";
		thisCharacter.walk.stride = thisCharacter.walk.stride || "standing";

		if ( thisCharacter.type == "player" )
			townIn.player = thisCharacter;
		thisCharacter.town = townIn;

		this.element.addEventListener("talk", thisCharacter.onTalk, false);
		
		thisCharacter.walk.location = { r, c };
	};

	this.walk = {

		foot: "right",

		set location(pos) {

			if ( thisCharacter.type == "player" ) {
				if ( !thisCharacter.town.map.element )
					thisCharacter.town.map.draw(thisCharacter.town, pos.r, pos.c);
				document.body.appendChild( thisCharacter.town.map.element );
			}
			
			var collision = false;
			var newRow = thisCharacter.town.map.rows[pos.r];
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
						this._location = { r: pos.r, c: pos.c };
						thisCharacter.town.map.move();
						newRow.cells[pos.c].element.appendChild(thisCharacter.element);
					}
				}
				else if ( !thisCharacter.god )
					console.log(thisCharacter.name, "can't move to row", pos.r + ", cell", pos.c + ". There's a", collision, "there.");
			}
			else {
				this._location = { r: pos.r, c: pos.c };
				thisCharacter.town.map.move();
				newRow.cells[pos.c].element.appendChild(thisCharacter.element);
			}
		},
		get location() {
			return this._location;
		},

		set facing(pos) {
			this._facing = pos;
			thisCharacter.element.className = thisCharacter.element.className.replace(/\s?((north)|(south)|(east)|(west))/gi, "");
			thisCharacter.element.className += " " + this._facing;
		},
		get facing() {
			return this._facing;
		},

		set stride(pos) {
			this._stride = pos;
			thisCharacter.element.className = thisCharacter.element.className.replace(/\s?((standing)|((left|right)Foot))/gi, "");
			thisCharacter.element.className += " " + this._stride;
		},
		get stride() {
			return this._stride;
		},

		step: function() {
			if ( this.stride == "standing" ) {
				this.stride = this.foot + "Foot";
				this.foot = ( this.foot == "right" ) ? "left" : "right";
			}
			else
				this.stride = "standing";
		},

		stand: function() { thisCharacter.walk.stride = "standing"; },

		stop: function() { setTimeout(thisCharacter.walk.stand, 100); }

	};

	this.teleport = function(portal, collision) {
		var destination = game.sprites.find(function(s){ return s.name == portal.destination.location; });
		if (destination) {
			if ( portal[ thisCharacter.walk.facing ] ) {
				thisCharacter.town.map.erase();
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

	this.moveTo = function(r,c) {

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
	this.moveNorth = function() {
		thisCharacter.walk.facing = "north";
		thisCharacter.walk.step();
		thisCharacter.moveTo("-1", null);
	};
	this.moveSouth = function() {
		thisCharacter.walk.facing = "south";
		thisCharacter.walk.step();
		thisCharacter.moveTo("+1", null);
	};
	this.moveEast = function() {
		thisCharacter.walk.facing = "east";
		thisCharacter.walk.step();
		thisCharacter.moveTo(null, "+1");
	};
	this.moveWest = function() {
		thisCharacter.walk.facing = "west";
		thisCharacter.walk.step();
		thisCharacter.moveTo(null,"-1");
	};

	if (this.type == "character") {

		this.talk = new Event("talk");
		this.onTalk = function() {
			alert("You look an awful lot like me.");
		};

		this.p = 0;
		this.pace = 3;
		this.pacing = function() {
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

		document.addEventListener("pushUp", this.moveNorth);
		document.addEventListener("pushDown", this.moveSouth);
		document.addEventListener("pushRight", this.moveEast);
		document.addEventListener("pushLeft", this.moveWest);

		document.addEventListener("releaseUp", this.walk.stop);
		document.addEventListener("releaseDown", this.walk.stop);
		document.addEventListener("releaseRight", this.walk.stop);
		document.addEventListener("releaseLeft", this.walk.stop);

	}

}
