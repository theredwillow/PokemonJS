var generateMap = function(thisLocation) {

    var thisMap = {};

    thisMap.tiles = thisLocation.tileRules;
    delete thisLocation.tileRules;

    thisMap.coordinates = thisLocation.defaultMap;

    thisMap.drawTile = function(r,c,t) {
        if (t)
            thisMap.coordinates[r][c] = t;
        var thisCell = thisMap.coordinates[r][c];
        thisMap.rows[r].cells[c].element.id = "row" + r + "-cell" + c;
        thisMap.rows[r].cells[c].element.className = "tile";
        if ( thisCell != "--" ) {
            thisMap.rows[r].cells[c].element.className += " " + thisLocation.id + " " + thisCell;
            thisMap.rows[r].cells[c].walk = thisMap.tiles[thisCell].walk;
            thisMap.rows[r].cells[c].surf = thisMap.tiles[thisCell].surf;
        }
    };

    thisMap.draw = function() {
        thisMap.element = document.createElement("table");
        thisMap.element.cellSpacing = "0px";
        thisMap.element.cellPadding = "0px";
        thisMap.element.style.position = "fixed";
        thisMap.height = thisMap.coordinates.length * game.css.tileSize;
        thisMap.width = thisMap.coordinates[0].length * game.css.tileSize;
        thisMap.rows = {};
        for (var r = 0; r < thisMap.coordinates.length; r++) {
            thisMap.rows[r] = {};
            thisMap.rows[r].element = document.createElement("tr");
            thisMap.rows[r].element.id = "row" + r;
            thisMap.rows[r].relativeTop = r * game.css.tileSize;
            thisMap.rows[r].cells = {};
            for (var c = 0; c < thisMap.coordinates[r].length; c++) {
                thisMap.rows[r].cells[c] = {};
                thisMap.rows[r].cells[c].element = document.createElement("td");
                thisMap.drawTile(r,c);
                thisMap.rows[r].element.appendChild( thisMap.rows[r].cells[c].element );
                thisMap.rows[r].cells[c].relativeLeft = c * game.css.tileSize;
            }
            thisMap.element.appendChild( thisMap.rows[r].element );
        }
        document.body.appendChild( thisMap.element );
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
