function TestLocation() {

    var thisLocation = this;

    this.name = "Pallet Town (Test)";
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    this.image = "palletTown.png";
    this.imageDimensions = { x: 4, y: 11 };

    this.map = {};

    this.map.tiles = {
        "a0": {
            "backgrounds": [
                { "x": "0", "y": "0" }
            ],
            "walk": true
        },
        "a1": {
            "backgrounds": [
                { "x": "1", "y": "0" }
            ]
        },
        "a2": {
            "backgrounds": [
                { "x": "2", "y": "0" }
            ],
            "walk": true
        },
        "a3": {
            "backgrounds": [
                { "x": "3", "y": "0" }
            ],
            "walk": true
        },
        "b0": {
            "backgrounds": [
                { "x": "0", "y": "1" }
            ],
            "walk": true
        },
        "b1": {
            "backgrounds": [
                { "x": "1", "y": "1" }
            ],
            "walk": true
        },
        "b2": {
            "backgrounds": [
                { "x": "2", "y": "1" }
            ]
        },
        "b3": {
            "backgrounds": [
                { "x": "3", "y": "1" }
            ]
        },
        "c0": {
            "backgrounds": [
                { "x": "0", "y": "2" }
            ]
        },
        "c1": {
            "backgrounds": [
                { "x": "1", "y": "2" }
            ]
        },
        "c2": {
            "backgrounds": [
                { "x": "2", "y": "2" }
            ]
        },
        "c3": {
            "backgrounds": [
                { "x": "3", "y": "2" }
            ]
        },
        "d0": {
            "backgrounds": [
                { "x": "0", "y": "3" }
            ]
        },
        "d1": {
            "backgrounds": [
                { "x": "1", "y": "3" }
            ]
        },
        "d2": {
            "backgrounds": [
                { "x": "2", "y": "3" }
            ]
        },
        "d3": {
            "backgrounds": [
                { "x": "3", "y": "3" }
            ]
        },
        "e0": {
            "backgrounds": [
                { "x": "0", "y": "4" }
            ]
        },
        "e1": {
            "backgrounds": [
                { "x": "1", "y": "4" }
            ]
        },
        "e2": {
            "backgrounds": [
                { "x": "2", "y": "4" }
            ]
        },
        "e3": {
            "backgrounds": [
                { "x": "3", "y": "4" }
            ]
        },
        "f0": {
            "backgrounds": [
                { "x": "0", "y": "5" }
            ]
        },
        "f1": {
            "backgrounds": [
                { "x": "1", "y": "5" }
            ]
        },
        "f2": {
            "backgrounds": [
                { "x": "1", "y": "6" }
            ]
        },
        "f3": {
            "backgrounds": [
                { "x": "2", "y": "6" }
            ]
        },
        "g0": {
            "backgrounds": [
                { "x": "3", "y": "6" }
            ]
        },
        "g1": {
            "backgrounds": [
                { "x": "0", "y": "7" }
            ]
        },
        "g2": {
            "backgrounds": [
                { "x": "1", "y": "7" }
            ]
        },
        "g3": {
            "backgrounds": [
                { "x": "2", "y": "7" }
            ]
        },
        "h0": {
            "backgrounds": [
                { "x": "2", "y": "8" }
            ]
        },
        "h1": {
            "backgrounds": [
                { "x": "3", "y": "8" }
            ]
        },
        "h2": {
            "backgrounds": [
                { "x": "0", "y": "9" }
            ]
        },
        "h3": {
            "backgrounds": [
                { "x": "1", "y": "9" }
            ],
            "surf": true
        },
        "i0": {
            "backgrounds": [
                { "x": "2", "y": "9" }
            ],
            "surf": true
        },
        "i1": {
            "backgrounds": [
                { "x": "3", "y": "9" }
            ],
            "surf": true
        },
        "i2": {
            "backgrounds": [
                { "x": "0", "y": "10" }
            ],
            "surf": true
        },
        "i3": {
            "backgrounds": [
                { "x": "1", "y": "10" }
            ],
            "surf": true
        },
        "j0": {
            "backgrounds": [
                { "x": "2", "y": "10" }
            ],
            "surf": true
        },
        "j1": {
            "backgrounds": [
                { "x": "3", "y": "10" }
            ],
            "surf": true
        },
        "j2": {
            "backgrounds": [
                { "x": "2", "y": "5" },
                { "x": "3", "y": "5" },
                { "x": "0", "y": "6" }
            ],
            "walk": true
        },
        "j3": {
            "backgrounds": [
                { "x": "3", "y": "7" },
                { "x": "0", "y": "8" },
                { "x": "1", "y": "8" }
            ],
            "walk": true
        }
    };

    this.css = {};
    this.css.states = {};

    this.css.generateRule = function(tileName) {
        var thisTile = thisLocation.map.tiles[tileName];
        if ( thisTile.backgrounds.length > 1 ) {
            thisLocation.css.states[tileName] = thisLocation.css.states[tileName] || 0;
            var thisTilesCoor = thisTile.backgrounds[ thisLocation.css.states[tileName]++ ];
            thisLocation.css.animated.innerHTML += "." + thisLocation.id + "." + tileName;
            thisLocation.css.animated.innerHTML += " { background-position: ";
            thisLocation.css.animated.innerHTML += (thisTilesCoor.x * -1 * tileSize) + "px ";
            thisLocation.css.animated.innerHTML += (thisTilesCoor.y * -1 * tileSize) + "px }\n";
            if ( thisLocation.css.states[tileName] >= thisTile.backgrounds.length )
                delete thisLocation.css.states[tileName];
        }
        else {
            var thisTilesCoor = thisTile.backgrounds[0];
            thisLocation.css.static.innerHTML += "." + thisLocation.id + "." + tileName;
            thisLocation.css.static.innerHTML += " { background-position: ";
            thisLocation.css.static.innerHTML += (thisTilesCoor.x * -1 * tileSize) + "px ";
            thisLocation.css.static.innerHTML += (thisTilesCoor.y * -1 * tileSize) + "px }\n";
        }
    };    

    this.css.animateBackgrounds = function() {
        thisLocation.css.animated.innerHTML = "";
        for (var a = 0; a < thisLocation.css.animatedTileNames.length; a++) {
            var thisTile = thisLocation.css.animatedTileNames[a];
            thisLocation.css.generateRule(thisTile);
        }
    };

    this.css.tileNames = Object.keys(thisLocation.map.tiles);
    this.css.animatedTileNames = [];
    var addAnimatedTiles = function(t){
        if ( thisLocation.map.tiles[t].backgrounds.length > 1 )
            thisLocation.css.animatedTileNames.push(t);
    };
    this.css.tileNames.forEach(addAnimatedTiles);

    this.css.generateStyles = (function() {

        var imageStyle = document.getElementById(thisLocation.id + "-imageStyle");
        if ( !imageStyle ) {
            thisLocation.css.image = document.createElement("style");
            thisLocation.css.image.type = "text/css";
            thisLocation.css.image.id = thisLocation.id + "-imageStyle";
            thisLocation.css.image.innerHTML += "." + thisLocation.id;
            thisLocation.css.image.innerHTML += " { background-image: url('locations/" + thisLocation.image + "') }";
            document.head.appendChild(thisLocation.css.image);
        }
        else if ( !thisLocation.css.image ) {
            thisLocation.css.image = imageStyle;
        }

        var staticStyle = document.getElementById(thisLocation.id + "-staticStyle");
        if ( !staticStyle ) {
            thisLocation.css.static = document.createElement("style");
            thisLocation.css.static.type = "text/css";
            thisLocation.css.static.id = thisLocation.id + "-staticStyle";
            document.head.appendChild(thisLocation.css.static);
        }
        else if ( !thisLocation.css.static ) {
            thisLocation.css.static = staticStyle;
        }

        if ( thisLocation.css.animatedTileNames.length ) {
            var animatedStyle = document.getElementById(thisLocation.id + "-animatedStyle");
            if ( !animatedStyle ) {
                thisLocation.css.animated = document.createElement("style");
                thisLocation.css.animated.type = "text/css";
                thisLocation.css.animated.id = thisLocation.id + "-animatedStyle";
                document.head.appendChild(thisLocation.css.animated);
            }
            else if ( !thisLocation.css.animated ) {
                thisLocation.css.animated = animatedStyle;
            }

            if ( !loop.listeners[ thisLocation.id + "Animation" ] ) {
                loop.listeners[ thisLocation.id + "Animation" ] = document.addEventListener("loopChanged", thisLocation.css.animateBackgrounds);
            }
        }

        thisLocation.css.static.innerHTML = "." + thisLocation.id;
        thisLocation.css.static.innerHTML += " { background-size: ";
        thisLocation.css.static.innerHTML += ( thisLocation.imageDimensions.x * tileSize ) + "px ";
        thisLocation.css.static.innerHTML += ( thisLocation.imageDimensions.y * tileSize ) + "px; }\n";

        thisLocation.css.tileNames.forEach(thisLocation.css.generateRule);
    })();

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
