function TestLocation() {

    var thisLocation = this;

    this.name = "Pallet Town (Test)";
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    this.image = "palletTown.png";

    this.map = {};

    this.map.tiles = {
        "a0": {
            "backgrounds": [
                { "x": "0px", "y": "0px" }
            ],
            "walk": true
        },
        "a1": {
            "backgrounds": [
                { "x": "-16px", "y": "0px" }
            ]
        },
        "a2": {
            "backgrounds": [
                { "x": "-32px", "y": "0px" }
            ],
            "walk": true
        },
        "a3": {
            "backgrounds": [
                { "x": "-48px", "y": "0px" }
            ],
            "walk": true
        },
        "b0": {
            "backgrounds": [
                { "x": "0px", "y": "-16px" }
            ],
            "walk": true
        },
        "b1": {
            "backgrounds": [
                { "x": "-16px", "y": "-16px" }
            ],
            "walk": true
        },
        "b2": {
            "backgrounds": [
                { "x": "-32px", "y": "-16px" }
            ]
        },
        "b3": {
            "backgrounds": [
                { "x": "-48px", "y": "-16px" }
            ]
        },
        "c0": {
            "backgrounds": [
                { "x": "0px", "y": "-32px" }
            ]
        },
        "c1": {
            "backgrounds": [
                { "x": "-16px", "y": "-32px" }
            ]
        },
        "c2": {
            "backgrounds": [
                { "x": "-32px", "y": "-32px" }
            ]
        },
        "c3": {
            "backgrounds": [
                { "x": "-48px", "y": "-32px" }
            ]
        },
        "d0": {
            "backgrounds": [
                { "x": "0px", "y": "-48px" }
            ]
        },
        "d1": {
            "backgrounds": [
                { "x": "-16px", "y": "-48px" }
            ]
        },
        "d2": {
            "backgrounds": [
                { "x": "-32px", "y": "-48px" }
            ]
        },
        "d3": {
            "backgrounds": [
                { "x": "-48px", "y": "-48px" }
            ]
        },
        "e0": {
            "backgrounds": [
                { "x": "0px", "y": "-64px" }
            ]
        },
        "e1": {
            "backgrounds": [
                { "x": "-16px", "y": "-64px" }
            ]
        },
        "e2": {
            "backgrounds": [
                { "x": "-32px", "y": "-64px" }
            ]
        },
        "e3": {
            "backgrounds": [
                { "x": "-48px", "y": "-64px" }
            ]
        },
        "f0": {
            "backgrounds": [
                { "x": "0px", "y": "-80px" }
            ]
        },
        "f1": {
            "backgrounds": [
                { "x": "-16px", "y": "-80px" }
            ]
        },
        "f2": {
            "backgrounds": [
                { "x": "-16px", "y": "-96px" }
            ]
        },
        "f3": {
            "backgrounds": [
                { "x": "-32px", "y": "-96px" }
            ]
        },
        "g0": {
            "backgrounds": [
                { "x": "-48px", "y": "-96px" }
            ]
        },
        "g1": {
            "backgrounds": [
                { "x": "0px", "y": "-112px" }
            ]
        },
        "g2": {
            "backgrounds": [
                { "x": "-16px", "y": "-112px" }
            ]
        },
        "g3": {
            "backgrounds": [
                { "x": "-32px", "y": "-112px" }
            ]
        },
        "h0": {
            "backgrounds": [
                { "x": "-32px", "y": "-128px" }
            ]
        },
        "h1": {
            "backgrounds": [
                { "x": "-48px", "y": "-128px" }
            ]
        },
        "h2": {
            "backgrounds": [
                { "x": "0px", "y": "-144px" }
            ]
        },
        "h3": {
            "backgrounds": [
                { "x": "-16px", "y": "-144px" }
            ],
            "surf": true
        },
        "i0": {
            "backgrounds": [
                { "x": "-32px", "y": "-144px" }
            ],
            "surf": true
        },
        "i1": {
            "backgrounds": [
                { "x": "-48px", "y": "-144px" }
            ],
            "surf": true
        },
        "i2": {
            "backgrounds": [
                { "x": "0px", "y": "-160px" }
            ],
            "surf": true
        },
        "i3": {
            "backgrounds": [
                { "x": "-16px", "y": "-160px" }
            ],
            "surf": true
        },
        "j0": {
            "backgrounds": [
                { "x": "-32px", "y": "-160px" }
            ],
            "surf": true
        },
        "j1": {
            "backgrounds": [
                { "x": "-48px", "y": "-160px" }
            ],
            "surf": true
        },
        "j2": {
            "backgrounds": [
                { "x": "-32px", "y": "-80px" },
                { "x": "-48px", "y": "-80px" },
                { "x": "0px", "y": "-96px" }
            ],
            "walk": true
        },
        "j3": {
            "backgrounds": [
                { "x": "-48px", "y": "-112px" },
                { "x": "0px", "y": "-128px" },
                { "x": "-16px", "y": "-128px" }
            ],
            "walk": true
        }
    };

    this.css = {};
    this.css.static = document.createElement("style");
    this.css.static.type = "text/css";
    this.css.static.id = thisLocation.id + "-staticStyles";
    this.css.static.innerHTML += "." + thisLocation.id;
    this.css.static.innerHTML += " { background-image: url('locations/" + thisLocation.image + "') }\n";

    this.css.animated = document.createElement("style");
    this.css.animated.type = "text/css";
    this.css.animated.id = thisLocation.id + "-animatedStyles";
    this.css.states = {};

    var generateRule = function(t) {
        var thisTilesLoc = thisLocation.map.tiles[t].backgrounds[0];
        if ( thisLocation.map.tiles[t].backgrounds.length == 1 ) {
            thisLocation.css.static.innerHTML += "." + thisLocation.id + "." + t;
            thisLocation.css.static.innerHTML += " { background-position: ";
            thisLocation.css.static.innerHTML += thisTilesLoc.x + " " + thisTilesLoc.y + " }\n";
        }
        else {
            thisLocation.css.states[t] = 0;
            thisLocation.css.animated.innerHTML += "." + thisLocation.id + "." + t;
            thisLocation.css.animated.innerHTML += " { background-position: ";
            thisLocation.css.animated.innerHTML += thisTilesLoc.x + " " + thisTilesLoc.y + " }\n";
        }
    };

    this.css.changeBackgrounds = function() {
        thisLocation.css.animated.innerHTML = "";
        for (var a = 0; a < thisLocation.css.animatedTileNames.length; a++) {
            var t = thisLocation.css.animatedTileNames[a];
            thisLocation.css.animated.innerHTML += "." + thisLocation.id + "." + t;
            thisLocation.css.animated.innerHTML += " { background-position: ";
            var thisTilesLoc = thisLocation.map.tiles[t].backgrounds[ thisLocation.css.states[t] ];
            thisLocation.css.animated.innerHTML += thisTilesLoc.x + " " + thisTilesLoc.y + " }\n";
            var isLast = ( thisLocation.css.states[t] >= thisLocation.map.tiles[t].backgrounds.length - 1 );
            thisLocation.css.states[t] = isLast ? 0 : thisLocation.css.states[t] + 1;
        }
    };

    var tileNames = Object.keys(thisLocation.map.tiles);
    tileNames.forEach(generateRule);
    document.head.appendChild(this.css.static);
    this.css.animatedTileNames = Object.keys(this.css.states);
    if ( this.css.animatedTileNames.length ) {
        document.head.appendChild(this.css.animated);
        document.addEventListener("loopChanged", this.css.changeBackgrounds);
    }

    this.map.coordinates = [
        [ "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a3", "a3", "b0", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a3", "a3", "a3", "a1" ],
        [ "a1", "b1", "b1", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "b1", "b1", "a1", "a1", "a1", "a3", "a3", "b0", "a1" ],
        [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "a1", "a1", "a1", "b1", "b1", "b1", "a1" ],
        [ "a1", "b1", "b1", "e2", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "a1", "a1", "a1", "b1", "b1", "b0", "a1" ],
        [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b0", "a1" ],
        [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "j2", "a1" ],
        [ "a1", "b1", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b2", "b3", "b3", "b3", "c0", "j2", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a1", "b1", "b1", "e2", "b1", "b1", "c1", "d3", "h1", "c2", "d0", "j2", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "j3", "a0", "j3", "j3", "j3", "j2", "a1" ],
        [ "a1", "b1", "b1", "d1", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "b1", "b1", "d1", "a0", "a0", "a0", "a0", "j2", "a1" ],
        [ "a1", "b1", "b1", "a0", "j2", "a0", "a0", "j2", "a0", "a0", "j2", "a0", "j2", "j2", "a0", "a0", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
        [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
        [ "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a0", "a1" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "b1", "b1", "b1" ]
    ];

    this.map.drawTile = function(r,c,t){
        if (t)
            thisLocation.map.coordinates[r][c] = t;
        var thisCell = thisLocation.map.coordinates[r][c];
        thisLocation.map.rows[r].cells[c].element.id = "row" + r + "-cell" + c;
        thisLocation.map.rows[r].cells[c].element.className = "tile";
        if ( thisCell != "--" ) {
            thisLocation.map.rows[r].cells[c].element.className += " " + thisLocation.id + " " + thisCell;
            thisLocation.map.rows[r].cells[c].walk = thisLocation.map.tiles[thisCell].walk;
            thisLocation.map.rows[r].cells[c].surf = thisLocation.map.tiles[thisCell].surf;
        }
    };
    
    this.map.draw = function() {
        thisLocation.map.element = document.createElement("table");
        thisLocation.map.element.cellSpacing = "0px";
        thisLocation.map.element.cellPadding = "0px";
        thisLocation.map.element.style.position = "fixed";
        thisLocation.map.height = thisLocation.map.coordinates.length * tileSize;
        thisLocation.map.width = thisLocation.map.coordinates[0].length * tileSize;
        thisLocation.map.rows = {};
        for (var r = 0; r < thisLocation.map.coordinates.length; r++) {
            thisLocation.map.rows[r] = {};
            thisLocation.map.rows[r].element = document.createElement("tr");
            thisLocation.map.rows[r].element.id = "row" + r;
            thisLocation.map.rows[r].top = r * tileSize;
            thisLocation.map.rows[r].cells = {};
            for (var c = 0; c < thisLocation.map.coordinates[r].length; c++) {
                thisLocation.map.rows[r].cells[c] = {};
                thisLocation.map.rows[r].cells[c].element = document.createElement("td");
                thisLocation.map.drawTile(r,c);
                thisLocation.map.rows[r].element.appendChild( thisLocation.map.rows[r].cells[c].element );
                thisLocation.map.rows[r].cells[c].left = c * tileSize;
            }
            thisLocation.map.element.appendChild( thisLocation.map.rows[r].element );
        }
        document.body.appendChild( thisLocation.map.element );
    };

    this.map.move = function(r,c) {
        town.map.element.style.top = ( window.innerHeight / 2 ) - thisLocation.map.rows[r].top;
        town.map.element.style.left = ( window.innerWidth / 2 ) - thisLocation.map.rows[r].cells[c].left;
    };
    
}
