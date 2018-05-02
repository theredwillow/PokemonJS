steps[2] = function() {
    backButton.style.visibility = "visible";
    stepTitle.innerHTML = "Create a default map...";

    var displayTable = document.createElement("table");
    displayTable.style.width = "100%";
    display.appendChild(displayTable);

    var row = document.createElement("tr");
    displayTable.appendChild(row);

    var brush;
    var setBrush = function(e) {
        brush.style.border = "none";
        brush = e.target;
        e.target.style.border = "3px solid black";
        console.log("New brush: ", brush);
    };

    var tiles = document.createElement("td");
    tiles.style.position = "relative";
    row.appendChild(tiles);
    tiles.style.height = ( (numOfRows * 5) + newLocation.imageSize.height ) + "px";
    tiles.style.width = ( (numOfColumns * 5) + newLocation.imageSize.width ) + "px";

    var a = {};
    var r = 0;
    var c = 0;
    var allTheTiles = Object.keys(newLocation.tiles);
    for (var t = 0; t < allTheTiles.length; t++) {
    
        var theseBackgrounds = newLocation.tiles[ allTheTiles[t] ].backgrounds;
        var clipping = document.createElement("div");
        clipping.style.position = "absolute";
        clipping.id = allTheTiles[t];
        clipping.className = "toolbar-tile";
        clipping.style.left = ( ((c + 1) * 5) + (c * newLocation.tileSize) ) + "px";
        clipping.style.top = ( ((r + 1) * 5) + (r * newLocation.tileSize) ) + "px";
        clipping.style.width = newLocation.tileSize;
        clipping.style.height = newLocation.tileSize;

        var background = "url('" + newLocation.image + "') ";
        background += theseBackgrounds[0].x + " ";
        background += theseBackgrounds[0].y;
        clipping.style.background = background;

        if ( theseBackgrounds.length > 1 )
            a[ allTheTiles[t] ] = 0;

        if ( t == 0 )
            brush = clipping;
        clipping.addEventListener("click", setBrush);

        tiles.appendChild(clipping);

        c++;
        if ( c >= numOfColumns ) {
            c = 0;
            r++;
        }

    }

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
    var animationCycle = setInterval(animateBackgrounds, 500);

    var addToSquare = function() {

        var tableRows = document.body.querySelectorAll("#map tr");
        for ( var r = 0; r < tableRows.length; r++ ) {
            var newFirstCell = document.createElement("td");
            var currentFirstCell = tableRows[r].querySelector("td");
            tableRows[r].insertBefore(newFirstCell, currentFirstCell);
    
            var newLastCell = document.createElement("td");
            tableRows[r].appendChild(newLastCell);
        }
    
        var newFirstRow = document.createElement("tr");
        var currentFirstRow = document.body.querySelector("#map tr");
        map.insertBefore(newFirstRow, currentFirstRow);
      
        var newLastRow = document.createElement("tr");
        map.appendChild(newLastRow);
    
        for ( var r = 0; r < tableRows.length + 2; r++ ) {
            var newFirstRowCell = document.createElement("td");
            newFirstRow.appendChild(newFirstRowCell);
    
            var newLastRowCell = document.createElement("td");
            newLastRow.appendChild(newLastRowCell);
        }
    
    };
    
    var mapHolder = document.createElement("td");
    row.appendChild(mapHolder);

    var map = document.createElement("table");
    map.style.border = "1px solid black";
    map.style.margin = "auto";
    map.id = "map";
    mapHolder.appendChild(map);
    
    var centerRow = document.createElement("tr");
    map.appendChild(centerRow);
    
    var centerCell = document.createElement("td");
    centerCell.id = "centerCell";
    centerRow.appendChild(centerCell);

};
