var newLocation = {};

var loadBuilder = function() {

    var stepTitle = document.querySelector("#step-title");
    var leftOptions = document.querySelector("#left-options");
    var display = document.querySelector("#display");
    var rightOptions = document.querySelector("#right-options");

    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    var nextStep = 0;
    var steps = [];

    var numOfRows;
    var numOfColumns;

    var backButton = document.createElement("button");
    backButton.innerHTML = "<<< Previous Step";
    var goBack = function() {
        display.innerHTML = "";
        nextStep--;
        steps[(nextStep - 1)]();
    };
    backButton.addEventListener("click", goBack);
    leftOptions.appendChild(backButton);

    var nextButton = document.createElement("button");
    nextButton.style.visibility = "hidden";
    nextButton.innerHTML = "Next Step >>>";
    var goForward = function() {
        display.innerHTML = "";
        steps[nextStep++]();
    };
    nextButton.addEventListener("click", goForward);
    rightOptions.appendChild(nextButton);

    steps[0] = function() {
        backButton.style.visibility = "hidden";
        stepTitle.innerHTML = "Choose an image...";
        
        var updateImage = function() {
            var fileSrc = "locations/" + fileUpload.value.replace("C:\\fakepath\\", "");
            img.src = "file:///C:/Users/Jared/Scripts/PokemonJS/" + fileSrc;
            newLocation.image = fileSrc;
        };

        var addImageSize = function() {
            newLocation.imageSize = {
                width: img.naturalWidth,
                height: img.naturalHeight
            };
            img.style.visibility = "visible";
            nextButton.style.visibility = "visible";

            var ifWidthIsLonger = ( newLocation.imageSize.width > newLocation.imageSize.height );
            var longerSide = ifWidthIsLonger ? newLocation.imageSize.width : newLocation.imageSize.height;
            var shorterSide = ifWidthIsLonger ? newLocation.imageSize.height : newLocation.imageSize.width;
            
            var numOfTilesOnLongSide = 1;
            var tileSize = longerSide / numOfTilesOnLongSide;

            while ( shorterSide % tileSize ) {
                numOfTilesOnLongSide++;
                tileSize = longerSide / numOfTilesOnLongSide;
            }
            newLocation.tileSize = tileSize;

            var numOfTilesOnShortSide = shorterSide / tileSize;
            numOfRows = ifWidthIsLonger ? numOfTilesOnShortSide : numOfTilesOnLongSide;
            numOfColumns = ifWidthIsLonger ? numOfTilesOnLongSide : numOfTilesOnShortSide;
        };

        var img = document.createElement("img");
        img.addEventListener('load', addImageSize);
        if ( newLocation.image )
            img.src = newLocation.image;
        else
            img.style.visibility = "hidden";
        display.appendChild(img);

        var fileUpload = document.createElement("input");
        fileUpload.setAttribute("type", "file");
        fileUpload.addEventListener("change", updateImage);
        display.appendChild(fileUpload);

    };

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
            selectionDisplay.appendChild(newAnimation);

            savedCombos.push( JSON.parse( JSON.stringify(currentCombo) ) );
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
    steps[2] = function() {
        backButton.style.visibility = "visible";
        stepTitle.innerHTML = "Create a default map...";

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

        var map = document.createElement("td");
        row.appendChild(map);

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
            // clipping.style.border = "none";
            // clipping.addEventListener("click", formCombo);
    
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

    };

    steps[nextStep++]();
};
