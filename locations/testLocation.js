function TestLocation() {

    var thisLocation = this;

    this.type = "location";

    this.name = "Pallet Town (Test)";
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    this.image = "palletTown.png";
    this.imageDimensions = { x: 4, y: 11 };
	this.imageSize = { width: 64, height: 176 };
	this.tileSize = { width: 16, height: 16 };

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

    this.css = generateCSS(this);

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
        thisLocation.map.height = thisLocation.map.coordinates.length * game.css.tileSize;
        thisLocation.map.width = thisLocation.map.coordinates[0].length * game.css.tileSize;
        thisLocation.map.rows = {};
        for (var r = 0; r < thisLocation.map.coordinates.length; r++) {
            thisLocation.map.rows[r] = {};
            thisLocation.map.rows[r].element = document.createElement("tr");
            thisLocation.map.rows[r].element.id = "row" + r;
            thisLocation.map.rows[r].relativeTop = r * game.css.tileSize;
            thisLocation.map.rows[r].cells = {};
            for (var c = 0; c < thisLocation.map.coordinates[r].length; c++) {
                thisLocation.map.rows[r].cells[c] = {};
                thisLocation.map.rows[r].cells[c].element = document.createElement("td");
                thisLocation.map.drawTile(r,c);
                thisLocation.map.rows[r].element.appendChild( thisLocation.map.rows[r].cells[c].element );
                thisLocation.map.rows[r].cells[c].relativeLeft = c * game.css.tileSize;
            }
            thisLocation.map.element.appendChild( thisLocation.map.rows[r].element );
        }
        document.body.appendChild( thisLocation.map.element );
    };

    this.map.move = (function(r,c) {
        if ( typeof r == "object" && thisLocation.player ) {
            r = thisLocation.player.location.r;
            c = thisLocation.player.location.c;
        }
        thisLocation.map.element.style.top = ( window.innerHeight / 2 ) - thisLocation.map.rows[r].relativeTop;
        thisLocation.map.element.style.left = ( window.innerWidth / 2 ) - thisLocation.map.rows[r].cells[c].relativeLeft;
    });

    window.addEventListener('resize', thisLocation.map.move);
    
}
