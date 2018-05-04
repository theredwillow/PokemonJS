steps[3] = function() {
    stepTitle.innerHTML = "Designate which tiles are surfable...";

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

    var chooseSurfable = function(e) {
        var thisTile = e.target;
        if ( /surf/.test(thisTile.className) ) {
            thisTile.style.border = "none";
            thisTile.className = thisTile.className.replace(" surf","");
        }
        else {
            thisTile.style.border = "3px solid black";
            thisTile.className += " surf";
        }
        saveButton.disabled = false;
    };

    var a = {};
    var r = 0;
    var c = 0;
    var allTheTiles = Object.keys(newLocation.tiles);
    for (var t = 0; t < allTheTiles.length; t++) {

        var theseBackgrounds = newLocation.tiles[ allTheTiles[t] ].backgrounds;
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

        clipping.addEventListener("click", chooseSurfable);

        tiles.appendChild(clipping);

        c++;
        if ( c >= numOfColumns ) {
            c = 0;
            r++;
        }

    }

    var buttonHolder = document.createElement("td");
    row.appendChild(buttonHolder);

    var save = function() {
        var surfTiles = document.querySelectorAll(".surf");
        for (var t = 0; t < surfTiles.length; t++) {
            newLocation.tiles[ surfTiles[t].id ].surf = true;
        }
        saveButton.disabled = true;
    };

    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save Tiles";
    saveButton.disabled = true;
    buttonHolder.appendChild(saveButton);
    saveButton.addEventListener("click", save);

};
