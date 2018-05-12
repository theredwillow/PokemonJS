var generateMap = function(thisLocation) {

    var thisMap = {};

    // Set the permanent defaults, clear it from template to save memory
    Object.defineProperty( thisMap, "defaults", {
        value: thisLocation.defaults,
        writable: false,
        configurable: false
    });
    delete thisLocation.defaults;

    // Prepare setters for custom inputs
    Object.defineProperty( thisMap, "coordinates", {
        get: function() { return thisMap._coordinates; },
        set: function(value) {
            thisMap._coordinates = value;
            if ( thisMap.backgrounds )
                loopThru( null, setClass );
        }
    });

    Object.defineProperty( thisMap, "backgrounds", {
        get: function() { return thisMap._backgrounds; },
        set: function(value) {
            thisMap._backgrounds = value;
            loopThru( null, setClass );
        }
    });

    Object.defineProperty( thisMap, "walk", {
        get: function() { return thisMap._walk; },
        set: function(value) {
            thisMap._walk = value;
            loopThru( null, setWalkOrSurf, "walk" );
        }
    });

    Object.defineProperty( thisMap, "surf", {
        get: function() { return thisMap._surf; },
        set: function(value) {
            thisMap._surf = value || [ ];
            loopThru( null, setWalkOrSurf, "surf");
        }
    });

    Object.defineProperty( thisMap, "portals", {
        get: function() { return thisMap._portals; },
        set: function(value) {
            thisMap._portals = value || [ ];
            loopThru( null, setPortal );
        }
    });

    var loopThru = function(inRow, inCell, otherInfo) {
        thisMap.rows = thisMap.rows || {};
        for (var r = 0; r < thisMap.coordinates.length; r++) {
            thisMap.rows[r] = thisMap.rows[r] || {};
            thisMap.rows[r].cells = thisMap.rows[r].cells || {};
            if (inRow)
                inRow(r, otherInfo);
            for (var c = 0; c < thisMap.coordinates[r].length; c++) {
                thisMap.rows[r].cells[c] = thisMap.rows[r].cells[c] || {};
                if (inCell)
                    inCell(r, c, otherInfo);
            }
        }
    };

    var drawRow = function(r) {
        thisMap.rows[r].element = document.createElement("tr");
        thisMap.rows[r].element.id = "row" + r;
        thisMap.element.appendChild( thisMap.rows[r].element );
        thisMap.rows[r].relativeTop = r * game.css.tileSize;
    };

    var drawCell = function(r,c) {
        thisMap.rows[r].cells[c].element = document.createElement("td");
        thisMap.rows[r].cells[c].element.id = "row" + r + "-cell" + c;
        thisMap.rows[r].element.appendChild( thisMap.rows[r].cells[c].element );
        thisMap.rows[r].cells[c].relativeLeft = c * game.css.tileSize;
    };

    var setClass = function(r,c) {
        if ( thisMap.coordinates[r][c] == "--" )
            return;
        thisMap.rows[r].cells[c].element.className =
           "tile " + thisLocation.id + " " + thisMap.coordinates[r][c];
    };

    var setWalkOrSurf = function(r,c,ws) {
        if ( thisMap.coordinates[r][c] == "--" )
            return;
        ws = ws || "walk";
        thisMap.rows[r].cells[c][ws] = thisMap[ws].includes( thisMap.coordinates[r][c] );
    };

    var setPortal = function(r,c) {
        if ( thisMap.portals.coordinates[r][c] != "--" ) {
            thisMap.rows[r].cells[c].portal =
               thisMap.portals.legend[ thisMap.portals.coordinates[r][c] ];
            for (var i = 0; i < 4; i++) {
                var direction = thisMap.rows[r].cells[c].portal.directions.charAt(i);
                if ( direction != "-" ) {

                    if ( direction == "w" )
                        direction = "west";
                    else if ( direction == "n" )
                        direction = "north";
                    else if ( direction == "s" )
                        direction = "south";
                    else
                        direction = "east";
                    
                    if ( !i )
                        thisMap.rows[r].cells[c].portal.west = direction;
                    else if ( i == 1 )
                        thisMap.rows[r].cells[c].portal.north = direction;
                    else if ( i == 2 )
                        thisMap.rows[r].cells[c].portal.south = direction;
                    else
                        thisMap.rows[r].cells[c].portal.east = direction;

                }
            }
        }
    };

    thisMap.build = function() {
        thisMap.coordinates = thisMap.coordinates || thisMap.defaults.coordinates;

        thisMap.element = document.createElement("table");
        thisMap.element.id = "map";
        document.body.appendChild( thisMap.element );
        thisMap.height = thisMap.coordinates.length * game.css.tileSize;
        thisMap.width = thisMap.coordinates[0].length * game.css.tileSize;
        loopThru(drawRow, drawCell);

        thisMap.backgrounds = thisMap.backgrounds || thisMap.defaults.backgrounds;
        thisMap.walk = thisMap.walk || thisMap.defaults.walk;
        thisMap.surf = thisMap.surf || thisMap.defaults.surf;
        thisMap.portals = thisMap.portals || thisMap.defaults.portals;
        thisLocation.css = generateCSS(thisLocation);
    };

    thisMap.move = (function(r,c) {
        if ( typeof r == "undefined" && thisLocation.player ) {
            r = thisLocation.player.walk.location.r;
            c = thisLocation.player.walk.location.c;
        }
        thisMap.element.style.top = ( window.innerHeight / 2 ) - thisMap.rows[r].relativeTop;
        thisMap.element.style.left = ( window.innerWidth / 2 ) - thisMap.rows[r].cells[c].relativeLeft;
    });

    window.addEventListener('resize', thisMap.move);

    return thisMap;

};
