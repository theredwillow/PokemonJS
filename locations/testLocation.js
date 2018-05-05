function TestLocation() {

    var thisLocation = this;

    thisLocation.image = "palletTown.png";

    thisLocation.imageSize = {
        "width": 64,
        "height": 176
    };

    thisLocation.tileSize = 16;

    thisLocation.tiles = {
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

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".mapTile { ";
    css.innerHTML += "height: " + thisLocation.tileSize + "; ";
    css.innerHTML += "width: " + thisLocation.tileSize + "; ";
    css.innerHTML += "margin: 0px; }\n";
    var generateCSS = function(t) {
        css.innerHTML += "." + t;
        css.innerHTML += " { background: ";
        css.innerHTML += "url('locations/" + thisLocation.image + "') ";
        var thisTilesLoc = thisLocation.tiles[t].backgrounds[0];
        css.innerHTML += thisTilesLoc.x + " " + thisTilesLoc.y + " }\n";
    };
    var tileNames = Object.keys(thisLocation.tiles);
    tileNames.forEach(generateCSS);
    document.head.appendChild(css);

    thisLocation.mapCoordinates = [
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

    this.drawMap = function() {
        thisLocation.map = {}
        thisLocation.map.element = document.createElement("table");
        thisLocation.map.element.cellSpacing = "0px";
        thisLocation.map.element.cellPadding = "0px";
        thisLocation.map.rows = {};
        for (var r = 0; r < thisLocation.mapCoordinates.length; r++) {
            thisLocation.map.rows[r] = {};
            thisLocation.map.rows[r].element = document.createElement("tr");
            var thisRow = thisLocation.mapCoordinates[r];
            thisLocation.map.rows[r].cells = {};
            for (var c = 0; c < thisRow.length; c++) {
                thisLocation.map.rows[r].cells[c] = {};
                thisLocation.map.rows[r].cells[c].element = document.createElement("td");
                var thisCell = thisRow[c];
                thisLocation.map.rows[r].cells[c].tile = document.createElement("div");
                thisLocation.map.rows[r].cells[c].tile.className = "mapTile";
                if ( thisCell != "--" )
                    thisLocation.map.rows[r].cells[c].tile.className += " " + thisCell;
                thisLocation.map.rows[r].cells[c].element.appendChild( thisLocation.map.rows[r].cells[c].tile );
                thisLocation.map.rows[r].element.appendChild( thisLocation.map.rows[r].cells[c].element );
            }
            thisLocation.map.element.appendChild( thisLocation.map.rows[r].element );
        }
        document.body.appendChild(thisLocation.map.element);
    };
    
}
