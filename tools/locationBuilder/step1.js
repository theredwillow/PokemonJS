steps[1] = function() {
    backButton.style.visibility = "visible";
    stepTitle.innerHTML = "Combine tiles to animate them...";

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

    var animations = document.createElement("td");
    row.appendChild(animations);

    var currentCombo = [];
    var savedCombos = [];

    var selectionDisplay = document.createElement("div");
    selectionDisplay.style.padding = "5px";
    selectionDisplay.style.border = "1px solid black";
    animations.appendChild(selectionDisplay);

    var animationDisplay = document.createElement("div");
    animationDisplay.style.width = newLocation.tileSize;
    animationDisplay.style.height = newLocation.tileSize;
    animationDisplay.style.display = "inline-block";
    animationDisplay.style.margin = "3px";
    var animationCycle = 0;
    var animateBackground = function() {
        if ( currentCombo.length && currentCombo[animationCycle] ) {
            animationDisplay.style.background = currentCombo[animationCycle++].style.background;
            if ( animationCycle >= currentCombo.length )
                animationCycle = 0;
        }
        else
            animationDisplay.style.background = "";
    };
    var bkgroundAnimation = setInterval(animateBackground, 250);
    selectionDisplay.appendChild(animationDisplay);

    var selectedTiles = document.createElement("div");
    selectedTiles.style.border = "1px solid black";
    selectedTiles.style.padding = "5px";
    selectedTiles.style.display = "inline-block";
    selectionDisplay.appendChild(selectedTiles);

    var getTileBackground = function(thisTile) {
        var thisSavedTile = newLocation.tiles[thisTile.id];
        var thisBackground = thisTile.style.background.replace(/url\(.*?\)\s/i, "").split(" ");
        if (!thisSavedTile)
            thisSavedTile = newLocation.tiles[thisTile.parentElement.id];
        thisSavedTile.backgrounds.push( {x: thisBackground[0], y: thisBackground[1] } );
    };
    var saveTile = function(thisTile) {
        newLocation.tiles[thisTile.id] = {};
        newLocation.tiles[thisTile.id].backgrounds = [];
        if ( thisTile.className.indexOf("animated") == -1 )
            getTileBackground(thisTile);
        else
            thisTile.querySelectorAll(".frame-tile").forEach(getTileBackground);
    };
    var saveAllTiles = function() {
        newLocation.tiles = {};
        document.querySelectorAll(".still-tile, .animated-tile").forEach(saveTile);
    };

    var displayCombo = function(){
        selectedTiles.innerHTML = "";
        for (var i = 0; i < currentCombo.length; i++) {
            var thisSelection = currentCombo[i];
            var clipping = document.createElement("div");
            clipping.style.margin = "3px";
            clipping.style.width = newLocation.tileSize;
            clipping.style.height = newLocation.tileSize;
            clipping.style.background = document.getElementById(thisSelection.id).style.background;
            clipping.style.display = "inline-block";
            selectedTiles.appendChild(clipping);
        }

        if ( currentCombo.length > 1 ) {
            var saveButton = document.createElement("button");
            saveButton.innerHTML = "Save this combination";
            saveButton.addEventListener("click", saveCombo);
            selectedTiles.appendChild(saveButton);
        }

    };

    var saveCombo = function() {
        var newAnimation = document.createElement("div");
        newAnimation.style.border = "1px solid black";
        newAnimation.style.padding = "5px";
        newAnimation.style.margin = "3px";
        newAnimation.className = "animated-tile";
        for (var i = 0; i < currentCombo.length; i++) {
            var thisTile = currentCombo[i];
            var clipping = document.createElement("div");
            if ( !i )
                newAnimation.id = thisTile.id;
            clipping.className = "frame-tile";
            clipping.style.width = newLocation.tileSize;
            clipping.style.height = newLocation.tileSize;
            clipping.style.background = thisTile.style.background;
            clipping.style.display = "inline-block";
            clipping.style.margin = "3px";
            newAnimation.appendChild(clipping);
            tiles.removeChild(thisTile);
        }

        var thisCombo = JSON.parse( JSON.stringify(currentCombo) );

        /*
        var remove = function() {
            selectionDisplay.removeChild(newAnimation);
            savedCombos.splice( savedCombos.indexOf(thisCombo), 1 );
            console.log(savedCombos);
        };

        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove this animation";
        newAnimation.appendChild(removeButton);
        removeButton.addEventListener("click", remove);
        */

        selectionDisplay.appendChild(newAnimation);

        savedCombos.push( thisCombo );
        currentCombo = [];
        
        displayCombo();
        saveAllTiles();
    };

    var formCombo = function(e) {
        var thisTile = e.target;
        var index = currentCombo.indexOf(thisTile);
        if ( index == -1 ) {
            currentCombo.push( thisTile );
            thisTile.style.border = "3px solid black";
        }
        else {
            currentCombo.splice(index, 1);
            thisTile.style.border = "none";
        }

        displayCombo();

    };

    for (var r = 0; r < numOfRows; r++) {
        for (var c = 0; c < numOfColumns; c++) {
    
            var clipping = document.createElement("div");
            clipping.style.position = "absolute";
            clipping.id = alphabet[r] + c;
            clipping.className = "still-tile";
            clipping.style.left = ( ((c + 1) * 5) + (c * newLocation.tileSize) ) + "px";
            clipping.style.top = ( ((r + 1) * 5) + (r * newLocation.tileSize) ) + "px";
            clipping.style.width = newLocation.tileSize;
            clipping.style.height = newLocation.tileSize;
    
            var background = "url('" + newLocation.image + "') ";
            background += ( c * -1 * newLocation.tileSize ) + "px ";
            background += ( r * -1 * newLocation.tileSize ) + "px";
            clipping.style.background = background;

            clipping.style.border = "none";
            clipping.addEventListener("click", formCombo);
    
            tiles.appendChild(clipping);
    
        }
    }
    displayCombo();
    saveAllTiles();

};

var animations = [];
var addBackgrounds = function() {
    for (var i = 0; i < animations.length; i++) {
        animations[i]();
    }
};

setInterval(addBackgrounds, 500);