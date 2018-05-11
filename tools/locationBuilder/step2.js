steps[2] = function() {
    stepTitle.innerHTML = "Designate which tiles are walkable...";

    var displayTable = document.createElement("table");
    displayTable.style.width = "100%";
    display.appendChild(displayTable);

    var row = document.createElement("tr");
    displayTable.appendChild(row);

    var tiles = document.createElement("td");
    tiles.style.position = "relative";
    row.appendChild(tiles);
    tiles.style.height = ( (numOfRows * 5) + newLocation.imageSize.height ) + "px";
    tiles.style.width = ( (numOfColumns * 5) + newLocation.imageSize.width ) + "px";

    var chooseWalkable = function(e) {
        var thisTile = e.target;
        if ( /walk/.test(thisTile.className) ) {
            thisTile.style.border = "none";
            thisTile.className = thisTile.className.replace(" walk","");
        }
        else {
            thisTile.style.border = "3px solid black";
            thisTile.className += " walk";
        }
        save();
    };

    var a = {};
    var r = 0;
    var c = 0;
    var temporaryTiles = {};
    var allTheTiles = Object.keys(newLocation.tiles);
    for (var t = 0; t < allTheTiles.length; t++) {

        temporaryTiles[ alphabet[r] + c ] = newLocation.tiles[ allTheTiles[t] ];
        var theseBackgrounds = temporaryTiles[ alphabet[r] + c ].backgrounds;
        var clipping = document.createElement("div");
        clipping.style.position = "absolute";
        clipping.id = alphabet[r] + c;
        clipping.className = "tile";
        clipping.style.fontSize = ( newLocation.tileSize - 2 ) + "px";
        clipping.style.left = ( ((c + 1) * 5) + (c * newLocation.tileSize) ) + "px";
        clipping.style.top = ( ((r + 1) * 5) + (r * newLocation.tileSize) ) + "px";
        clipping.style.width = newLocation.tileSize;
        clipping.style.height = newLocation.tileSize;

        var background = "url('" + newLocation.image + "') ";
        background += theseBackgrounds[0].x + " ";
        background += theseBackgrounds[0].y;
        clipping.style.background = background;

        if ( theseBackgrounds.length > 1 )
            a[ alphabet[r] + c ] = 0;

        clipping.addEventListener("click", chooseWalkable);

        tiles.appendChild(clipping);

        c++;
        if ( c >= numOfColumns ) {
            c = 0;
            r++;
        }

    }
    newLocation.tiles = temporaryTiles;

    var animatedTiles = Object.keys(a);
    var animateBackgrounds = function() {
        for (var t = 0; t < animatedTiles.length; t++) {
            var thisId = animatedTiles[t];
            var theseBackgrounds = newLocation.tiles[thisId].backgrounds;
            var background = "url('" + newLocation.image + "') ";
            background += theseBackgrounds[ a[thisId] ].x + " ";
            background += theseBackgrounds[ a[thisId]++ ].y;
            document.getElementById(thisId).style.background = background;

            if ( a[thisId] >= theseBackgrounds.length )
                a[thisId] = 0;
        }
    };
    window.animationCycle = setInterval(animateBackgrounds, 500);

    var buttonHolder = document.createElement("td");
    row.appendChild(buttonHolder);

    var save = function() {
        var walkTiles = document.querySelectorAll(".walk");
        for (var t = 0; t < walkTiles.length; t++) {
            newLocation.tiles[ walkTiles[t].id ].walk = true;
        }
    };

};
