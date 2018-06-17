var Location = function(thisLocation) {

    thisLocation.type = "location";
    thisLocation.id = thisLocation._id.replace(/[\s()\[\]]/g,"");

    // Set the permanent defaults, clear it from template to save memory
    Object.defineProperty( thisLocation, "defaults", {
        value: thisLocation.defaults,
        writable: false,
        configurable: false
    });

    // Prepare setters for custom inputs
    Object.defineProperty( thisLocation, "coordinates", {
        get: function() { return thisLocation._coordinates; },
        set: function(value) {
            thisLocation._coordinates = value;
            if ( thisLocation.backgrounds )
                loopThru( null, setClass );
        }
    });

    Object.defineProperty( thisLocation, "backgrounds", {
        get: function() { return thisLocation._backgrounds; },
        set: function(value) {
            thisLocation._backgrounds = value;
            loopThru( null, setClass );
        }
    });

    Object.defineProperty( thisLocation, "walk", {
        get: function() { return thisLocation._walk; },
        set: function(value) {
            thisLocation._walk = value;
            loopThru( null, setWalkOrSurf, "walk" );
        }
    });

    Object.defineProperty( thisLocation, "surf", {
        get: function() { return thisLocation._surf; },
        set: function(value) {
            thisLocation._surf = value || [ ];
            loopThru( null, setWalkOrSurf, "surf");
        }
    });

    Object.defineProperty( thisLocation, "portals", {
        get: function() { return thisLocation._portals; },
        set: function(value) {
            thisLocation._portals = value || [ ];
            loopThru( null, setPortal, "portals" );
        }
    });

    var loopThru = function(inRow, inCell, otherInfo) {
        thisLocation.rows = thisLocation.rows || {};
        var arrayToLoopThru = ( otherInfo == "portals" ) ? thisLocation.portals.coordinates : thisLocation.coordinates;
        for (var r = 0; r < arrayToLoopThru.length; r++) {
            thisLocation.rows[r] = thisLocation.rows[r] || {};
            thisLocation.rows[r].cells = thisLocation.rows[r].cells || {};
            if (inRow)
                inRow(r, otherInfo);
            for (var c = 0; c < arrayToLoopThru[r].length; c++) {
                thisLocation.rows[r].cells[c] = thisLocation.rows[r].cells[c] || {};
                if (inCell)
                    inCell(r, c, otherInfo);
            }
        }
    };

    var drawRow = function(r) {
        thisLocation.rows[r].element = document.createElement("tr");
        thisLocation.rows[r].element.id = "row" + r;
        thisLocation.element.appendChild( thisLocation.rows[r].element );
        thisLocation.rows[r].relativeTop = r * game.css.tileSize;
    };

    var drawCell = function(r,c) {
        thisLocation.rows[r].cells[c].element = document.createElement("td");
        thisLocation.rows[r].cells[c].element.id = "row" + r + "-cell" + c;
        thisLocation.rows[r].element.appendChild( thisLocation.rows[r].cells[c].element );
        thisLocation.rows[r].cells[c].relativeLeft = c * game.css.tileSize;
    };

    var setClass = function(r,c) {
        if ( thisLocation.coordinates[r][c] == "--" )
            return;
        thisLocation.rows[r].cells[c].element.className =
           "tile " + thisLocation.id + " " + thisLocation.coordinates[r][c];
    };

    var setWalkOrSurf = function(r,c,ws) {
        if ( thisLocation.coordinates[r][c] == "--" )
            return;
        ws = ws || "walk";
        thisLocation.rows[r].cells[c][ws] = thisLocation[ws].includes( thisLocation.coordinates[r][c] );
    };

    var setPortal = function(r,c) {
        if ( thisLocation.portals.coordinates[r][c] != "--" ) {
            thisLocation.rows[r].cells[c].portal =
                thisLocation.portals.legend[ thisLocation.portals.coordinates[r][c] ];
            for (var i = 0; i < 4; i++) {
                var direction = thisLocation.rows[r].cells[c].portal.directions.charAt(i);
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
                        thisLocation.rows[r].cells[c].portal.west = direction;
                    else if ( i == 1 )
                        thisLocation.rows[r].cells[c].portal.north = direction;
                    else if ( i == 2 )
                        thisLocation.rows[r].cells[c].portal.south = direction;
                    else
                        thisLocation.rows[r].cells[c].portal.east = direction;

                }
            }
        }
    };

    thisLocation.coordinates = thisLocation.coordinates || thisLocation.defaults.coordinates;
    thisLocation.walk = thisLocation.walk || thisLocation.defaults.walk;
    thisLocation.surf = thisLocation.surf || thisLocation.defaults.surf;
    thisLocation.portals = thisLocation.portals || thisLocation.defaults.portals;

    thisLocation.draw = function() {
        thisLocation.element = document.createElement("table");
        thisLocation.element.id = "map";
        screen.appendChild( thisLocation.element );
        thisLocation.height = (thisLocation.coordinates.length * game.css.tileSize) + "px";
        thisLocation.width = (thisLocation.coordinates[0].length * game.css.tileSize) + "px";
        loopThru(drawRow, drawCell);
        thisLocation.backgrounds = thisLocation.backgrounds || thisLocation.image.tiles;
        thisLocation.css = generateCSS(thisLocation);
    };

    thisLocation.erase = function() {
        var parentNode = thisLocation.player.element.parentNode;
        parentNode.removeChild( thisLocation.player.element );
        delete thisLocation.player;
        delete thisLocation.css;
        document.body.removeChild( thisLocation.element );
        delete thisLocation.element;
    };

    thisLocation.move = (function(r,c) {
        if ( typeof r == "undefined" && thisLocation.player ) {
            r = thisLocation.player.walk.location.r;
            c = thisLocation.player.walk.location.c;
        }
        if ( thisLocation.rows[r] && thisLocation.rows[r].cells[c] ) {
            thisLocation.element.style.top = ( window.innerHeight / 2 ) - thisLocation.rows[r].relativeTop;
            thisLocation.element.style.left = ( window.innerWidth / 2 ) - thisLocation.rows[r].cells[c].relativeLeft;
        }
    });

    window.addEventListener('resize', thisLocation.move);

    return thisLocation;

};
