function MaleTrainer(type){

	var thisCharacter = this;

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
		if ( thisCharacter.type == "player" )
			townIn.player = thisCharacter;
		thisCharacter.town = townIn;

		thisCharacter.location = { r, c };

		thisCharacter.element = document.createElement("div");
		thisCharacter.element.id = this.name;
		thisCharacter.element.className = "male-trainer";
		thisCharacter.element.className += " " + thisCharacter.type;
		thisCharacter.walk.facing = thisCharacter.walk.facing || "south";
		thisCharacter.walk.stride = thisCharacter.walk.stride || "standing";
		thisCharacter.element.style.top = townIn.map.rows[r].relativeTop + ( game.css.tileSize / 2 );
		thisCharacter.element.style.left = townIn.map.rows[r].cells[c].relativeLeft + ( game.css.tileSize / 2 );
		document.body.appendChild( thisCharacter.element );

		if ( thisCharacter.type == "character" )
			this.element.addEventListener("talk", thisCharacter.onTalk, false);
	};

	this.walk = {

		foot: "right",

		set facing(pos) {
			this._facing = pos;
			thisCharacter.element.className = thisCharacter.element.className.replace(/\s?((north)|(south)|(east)|(west))/gi, "");;
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

	this.moveTo = function(r,c) {

		// Need to add spedUp functionality

		r = r || thisCharacter.location.r;
		c = c || thisCharacter.location.c;

		if ( r[0] == "-" ) {
			r = Number( r.substr(1) );
			r = thisCharacter.location.r - r;
		}
		else if ( r[0] == "+" ) {
			r = Number( r.substr(1) );
			r += thisCharacter.location.r;
		}

		if ( c[0] == "-" ) {
			c = Number( c.substr(1) );
			c = thisCharacter.location.c - c;
		}
		else if ( c[0] == "+" ){
			c = Number( c.substr(1) );
			c += thisCharacter.location.c;
		}

		var collision = false;
		if ( !thisCharacter.town.map.rows[r] || !thisCharacter.town.map.rows[r].cells[c] )
			collision = "border";
		else if ( !thisCharacter.town.map.rows[r].cells[c].walk )
			collision = "tile";
		// Need to add character checker game.sprites
		
		if ( !collision || thisCharacter.god ) {
			thisCharacter.element.style.top = thisCharacter.town.map.rows[r].element.getBoundingClientRect().top;
			thisCharacter.element.style.left = thisCharacter.town.map.rows[r].cells[c].element.getBoundingClientRect().left;
			thisCharacter.location.r = r;
			thisCharacter.location.c = c;
			thisCharacter.walk.step();
		}
		else
			console.log("Bump! There's a", collision, "in the way!");

	};
	this.moveNorth = function() {
		thisCharacter.walk.facing = "north";
		thisCharacter.moveTo("-1", null);
	};
	this.moveSouth = function() {
		thisCharacter.walk.facing = "south";
		thisCharacter.moveTo("+1", null);
	};
	this.moveEast = function() {
		thisCharacter.walk.facing = "east";
		thisCharacter.moveTo(null, "+1");
	};
	this.moveWest = function() {
		thisCharacter.walk.facing = "west";
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
