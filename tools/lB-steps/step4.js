steps[4] = function() {
    backButton.style.visibility = "visible";
    nextButton.style.visibility = "visible";
    stepTitle.innerHTML = "Create a default map...";

    var displayTable = document.createElement("table");
    displayTable.style.width = "100%";
    display.appendChild(displayTable);

    var row = document.createElement("tr");
    displayTable.appendChild(row);

    var stamp;
    var selectStamp = function(e) {
        if (stamp) {
            stamp.innerHTML = "";
            stamp.className = stamp.className.replace(" currentStamp","");
        }
        stamp = e.target;
        stamp.innerHTML = "&#9632;";
        stamp.className += " currentStamp";
    };

    var setTile = function(e) {
        var thisTile = e.target;
        if ( thisTile.style.background != stamp.style.background ) {
            thisTile.style.background = stamp.style.background;
            thisTile.className += " tile-" + stamp.id;
        }
        else {
            thisTile.style.background = "";
            thisTile.className = thisTile.className.replace(/tile-.*(\s|$)/, "");
        }

        save();

        if (
             thisTile.parentNode == document.querySelector("#map tr") ||
             thisTile == thisTile.parentNode.querySelector("td") ||
             thisTile == thisTile.parentNode.lastChild ||
             thisTile.parentNode == map.lastChild
           )
           addToSquare();
    }

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
        clipping.id = alphabet[r] + c;
        clipping.className = "toolbar-tile";
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

        clipping.addEventListener("click", selectStamp);
        if ( t == 0 )
            clipping.click();

        tiles.appendChild(clipping);

        c++;
        if ( c >= numOfColumns ) {
            c = 0;
            r++;
        }

    }

    var mapHighlight;
    var selectMap = function(e) {
        if (mapHighlight) {
            mapHighlight.innerHTML = "";
            mapHighlight.className = mapHighlight.className.replace(/\s?currentHighlight/,"").replace(/^\s/,"");
        }
        mapHighlight = e.target;
        mapHighlight.innerHTML = "&#9632;";
        mapHighlight.className += (mapHighlight.className) ? " currentHighlight" : "currentHighlight";
    };

    var drawMapTile = function(parentEl, siblingEl) {
        var thisCell = document.createElement("td");
        thisCell.style.width = newLocation.tileSize;
        thisCell.style.height = newLocation.tileSize;
        thisCell.style.fontSize = ( newLocation.tileSize - 2 ) + "px";
        thisCell.addEventListener("click", selectMap);
        thisCell.addEventListener("dblclick", setTile);
        thisCell.addEventListener("selectHighlight", setTile);
        if (!siblingEl)
            parentEl.appendChild(thisCell);
        else
            parentEl.insertBefore(thisCell, siblingEl);
        return thisCell;
    };

    var addToSquare = function() {

        var tableRows = document.body.querySelectorAll("#map tr");
        for ( var r = 0; r < tableRows.length; r++ ) {
            var currentFirstCell = tableRows[r].querySelector("td");
            var newFirstCell = drawMapTile(tableRows[r], currentFirstCell);

            var newLastCell = drawMapTile(tableRows[r]);
        }
    
        var newFirstRow = document.createElement("tr");
        var currentFirstRow = document.querySelector("#map tr");
        map.insertBefore(newFirstRow, currentFirstRow);
      
        var newLastRow = document.createElement("tr");
        map.appendChild(newLastRow);
    
        for ( var r = 0; r < tableRows.length + 2; r++ ) {
            var newFirstRowCell = drawMapTile(newFirstRow);
            var newLastRowCell = drawMapTile(newLastRow);
        }
    
    };

    var mapHolder = document.createElement("td");
    row.appendChild(mapHolder);

    var map = document.createElement("table");
    map.cellSpacing = "0px";
    map.cellPadding = "0px";
    map.style.border = "1px solid black";
    map.style.margin = "auto";
    map.id = "map";
    mapHolder.appendChild(map);
    
    var save = function() {
        newLocation.map = [];
        var allRows = map.getElementsByTagName("tr");
        for (var r = 0, thisRow; thisRow = allRows[r]; r++) {
            newLocation.map[r] = [];
            var theseCells = thisRow.getElementsByTagName("td");
            for (var c = 0, thisCell; thisCell = theseCells[c]; c++) {
                var tileType = thisCell.className.match(/tile-(.*)(?:\s|$)/);
                newLocation.map[r][c] = (tileType) ? tileType[1] : "--";
            }
        }
    };

    var centerRow = document.createElement("tr");
    map.appendChild(centerRow);
    
    var centerCell = drawMapTile(centerRow);
    centerCell.id = "centerCell";
    centerCell.click();

    // keyboard controls

    var controls = {
        38: "up",
        40: "down",
        39: "right",
        37: "left",
        13: "enter",
        16: "shift"
    };
    
    var mapInUse = true;
    var selectHighlight = new Event("selectHighlight");

    var keyDownHandler = document.addEventListener("keydown", dispatchKeyDown);
    function dispatchKeyDown(e) {
        var buttonPressed = controls[e.which];
        if ( buttonPressed ) {
            if ( buttonPressed == "shift" ) {
                mapInUse = false;
                tiles.style.backgroundColor = "gainsboro";
            }
            else if ( buttonPressed == "left" && !mapInUse ) {
                var currentStamp = document.querySelector(".currentStamp");
                var stampToLeft = currentStamp.previousSibling;
                if ( stampToLeft )
                    stampToLeft.click();
            }
            else if ( buttonPressed == "left" && mapInUse ) {
                var currentHighlight = document.querySelector(".currentHighlight");
                var mapToLeft = currentHighlight.previousSibling;
                if ( mapToLeft )
                    mapToLeft.click();
            }
            else if ( buttonPressed == "right" && !mapInUse ) {
                var currentStamp = document.querySelector(".currentStamp");
                var stampToRight = currentStamp.nextSibling;
                if ( stampToRight )
                    stampToRight.click();
            }
            else if ( buttonPressed == "right" && mapInUse ) {
                var currentHighlight = document.querySelector(".currentHighlight");
                var mapToRight = currentHighlight.nextSibling;
                if ( mapToRight )
                    mapToRight.click();
            }
            else if ( buttonPressed == "up" && !mapInUse ) {
                var currentStamp = document.querySelector(".currentStamp");
                var currentIndex = alphabet.indexOf( currentStamp.id.match(/\D+/)[0] );
                if ( currentIndex > 0 ) {
                    var indexAbove = alphabet[currentIndex-1] + currentStamp.id.match(/\d+/)[0];
                    var stampAbove = document.getElementById(indexAbove);
                    stampAbove.click();
                }
            }
            else if ( buttonPressed == "up" && mapInUse ) {
                var currentHighlight = document.querySelector(".currentHighlight");
                var rowAbove = currentHighlight.parentElement.previousSibling;
                if ( rowAbove ) {
                    var mapAbove = rowAbove.childNodes[currentHighlight.cellIndex];
                    mapAbove.click();
                }
            }
            else if ( buttonPressed == "down" && !mapInUse ) {
                var currentStamp = document.querySelector(".currentStamp");
                var currentIndex = alphabet.indexOf( currentStamp.id.match(/\D+/)[0] );
                if ( currentIndex < numOfRows ) {
                    var indexBelow = alphabet[currentIndex+1] + currentStamp.id.match(/\d+/)[0];
                    var stampBelow = document.getElementById(indexBelow);
                    if (stampBelow)
                        stampBelow.click();
                }
            }
            else if ( buttonPressed == "down" && mapInUse ) {
                var currentHighlight = document.querySelector(".currentHighlight");
                var rowBelow = currentHighlight.parentElement.nextSibling;
                if ( rowBelow ) {
                    var mapBelow = rowBelow.childNodes[currentHighlight.cellIndex];
                    mapBelow.click();
                }
            }
            else if ( buttonPressed == "enter" && mapInUse ) {
                var currentHighlight = document.querySelector(".currentHighlight");
                currentHighlight.dispatchEvent(selectHighlight);
            }
            else {
                console.log(buttonPressed, "pressed");
            }
        }
    }

    var keyUpHandler = document.addEventListener("keyup", dispatchKeyUp);
    function dispatchKeyUp(e) {
        var buttonReleased = controls[e.which];
        if ( buttonReleased ) {
            if ( buttonReleased == "shift" ) {
                mapInUse = true;
                tiles.style.backgroundColor = "";
            }
        }
    }

};
