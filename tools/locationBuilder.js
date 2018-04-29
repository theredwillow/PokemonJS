var newLocation = {};

var loadBuilder = function() {

    var stepTitle = document.querySelector("#step-title");
    var leftOptions = document.querySelector("#left-options");
    var display = document.querySelector("#display");
    var rightOptions = document.querySelector("#right-options");

    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    var nextStep = 0;
    var steps = [];

    var numOfRows = 1;
    var numOfColumns = 1;

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
        stepTitle.innerHTML = "Specify the number of rows...";

        backButton.style.visibility = "visible";

        var displayTable = document.createElement("table");
        display.appendChild(displayTable);

        var tileRow = document.createElement("tr");
        displayTable.appendChild(tileRow);

        var tiles = document.createElement("td");
        tiles.style.position = "relative";
        tileRow.appendChild(tiles);

        var buildTiles = function() {
            tiles.innerHTML = "";
            var rowHeight = newLocation.imageSize.height / numOfRows;
            for (var r = 0; r < numOfRows; r++) {
                var clipping = document.createElement("div");
                clipping.style.position = "absolute";
                clipping.style.left = "0px";
                clipping.style.top = ( ((r + 1) * 5) + (r * rowHeight) ) + "px";
                clipping.style.width = newLocation.imageSize.width;
                clipping.style.height = rowHeight;

                var background = "url('" + newLocation.image + "') 0px ";
                background += ( r * rowHeight * -1 ) + "px";
                clipping.style.background = background;

                tiles.appendChild(clipping);

                displayCount.innerHTML = numOfRows + " Rows";
                tiles.style.height = ( (numOfRows * 5) + newLocation.imageSize.height ) + "px";

                newLocation.tileSize = { height: rowHeight };
            }
        };

        var buttonRow = document.createElement("tr");
        displayTable.appendChild(buttonRow);

        var buttons = document.createElement("td");
        buttonRow.appendChild(buttons);

        var lessRows = document.createElement("button");
        lessRows.innerHTML = "<<< Remove Some Rows";
        var calLess = function() {
            numOfRows--;
            while ( ! newLocation.imageSize.height % numOfRows ) {
                numOfRows--;
            }
            buildTiles();
            if ( numOfRows == 1 )
                lessRows.style.visibility = "hidden";
        };
        lessRows.addEventListener("click", calLess);
        lessRows.style.visibility = "hidden";
        buttons.appendChild(lessRows);

        var displayCount = document.createElement("span");
        buttons.appendChild(displayCount);

        var moreRows = document.createElement("button");
        moreRows.innerHTML = "Add More Rows >>>";
        var calMore = function() {
            lessRows.style.visibility = "visible";
            numOfRows++;
            while ( ! newLocation.imageSize.height % numOfRows ) {
                numOfRows++;
            }
            buildTiles();
        };
        moreRows.addEventListener("click", calMore);
        buttons.appendChild(moreRows);

        buildTiles();

    };

    steps[2] = function() {
        stepTitle.innerHTML = "Specify the number of columns...";

        var displayTable = document.createElement("table");
        display.appendChild(displayTable);

        var tileRow = document.createElement("tr");
        displayTable.appendChild(tileRow);

        var tiles = document.createElement("td");
        tiles.style.position = "relative";
        tileRow.appendChild(tiles);
        tiles.style.height = ( (numOfRows * 5) + newLocation.imageSize.height ) + "px";

        var buildTiles = function() {
            tiles.innerHTML = "";

            var columnWidth = newLocation.imageSize.width / numOfColumns;
            for (var r = 0; r < numOfRows; r++) {
                for (var c = 0; c < numOfColumns; c++) {
            
                    var clipping = document.createElement("div");
                    clipping.style.position = "absolute";
                    clipping.style.left = ( ((c + 1) * 5) + (c * columnWidth) ) + "px";
                    clipping.style.top = ( ((r + 1) * 5) + (r * newLocation.tileSize.height) ) + "px";
                    clipping.style.width = columnWidth;
                    clipping.style.height = newLocation.tileSize.height;
            
                    var background = "url('" + newLocation.image + "') ";
                    background += ( c * -1 * columnWidth ) + "px ";
                    background += ( r * -1 * newLocation.tileSize.height ) + "px";
                    clipping.style.background = background;
            
                    tiles.appendChild(clipping);
            
                    displayCount.innerHTML = numOfColumns + " Columns";
            
                    newLocation.tileSize.width = columnWidth;
            
                }
            }
        };

        var buttonRow = document.createElement("tr");
        displayTable.appendChild(buttonRow);

        var buttons = document.createElement("td");
        buttonRow.appendChild(buttons);

        var lessColumns = document.createElement("button");
        lessColumns.innerHTML = "<<< Remove Some Columns";
        var calLess = function() {
            numOfColumns--;
            while ( ! newLocation.imageSize.width % numOfColumns ) {
                numOfColumns--;
            }
            buildTiles();
            if ( numOfColumns == 1 )
                lessColumns.style.visibility = "hidden";
        };
        lessColumns.addEventListener("click", calLess);
        lessColumns.style.visibility = "hidden";
        buttons.appendChild(lessColumns);

        var displayCount = document.createElement("span");
        buttons.appendChild(displayCount);

        var moreColumns = document.createElement("button");
        moreColumns.innerHTML = "Add More Columns >>>";
        var calMore = function() {
            lessColumns.style.visibility = "visible";
            numOfColumns++;
            while ( ! newLocation.imageSize.width % numOfColumns ) {
                numOfColumns++;
            }
            buildTiles();
        };
        moreColumns.addEventListener("click", calMore);
        buttons.appendChild(moreColumns);

        buildTiles();

    };

    steps[3] = function() {
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

        var selectionDisplay = document.createElement("div");
        selectionDisplay.style.padding = "5px";
        selectionDisplay.style.border = "1px solid black";
        animations.appendChild(selectionDisplay);

        var animationDisplay = document.createElement("div");
        animationDisplay.style.width = newLocation.tileSize.width;
        animationDisplay.style.height = newLocation.tileSize.height;
        selectionDisplay.appendChild(animationDisplay);

        var selectedTiles = document.createElement("div");
        selectedTiles.style.border = "1px solid black";
        selectedTiles.style.padding = "5px";
        selectionDisplay.appendChild(selectedTiles);

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

            selectedTiles.innerHTML = "";
            for (var i = 0; i < currentCombo.length; i++) {
                var thisSelection = currentCombo[i];
                var clipping = document.createElement("div");
                clipping.style.margin = "3px";
                clipping.style.width = newLocation.tileSize.width;
                clipping.style.height = newLocation.tileSize.height;
                clipping.style.background = document.getElementById(thisSelection.id).style.background;
                clipping.style.display = "inline-block";
                selectedTiles.appendChild(clipping);
            }

        };

        for (var r = 0; r < numOfRows; r++) {
            for (var c = 0; c < numOfColumns; c++) {
        
                var clipping = document.createElement("div");
                clipping.style.position = "absolute";
                clipping.id = alphabet[r] + c;
                clipping.style.left = ( ((c + 1) * 5) + (c * newLocation.tileSize.width) ) + "px";
                clipping.style.top = ( ((r + 1) * 5) + (r * newLocation.tileSize.height) ) + "px";
                clipping.style.width = newLocation.tileSize.width;
                clipping.style.height = newLocation.tileSize.height;
        
                var background = "url('" + newLocation.image + "') ";
                background += ( c * -1 * newLocation.tileSize.width ) + "px ";
                background += ( r * -1 * newLocation.tileSize.height ) + "px";
                clipping.style.background = background;

                clipping.style.border = "none";
                clipping.addEventListener("click", formCombo);
        
                tiles.appendChild(clipping);
        
            }
        }

    };

    steps[nextStep++]();
};
