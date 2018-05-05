steps[5] = function() {
    backButton.style.visibility = "visible";
    nextButton.style.visibility = "hidden";
    stepTitle.innerHTML = "Your location code is ready!";

    clearInterval(window.animationCycle);

    var resultingCode = JSON.parse( JSON.stringify(newLocation) );

    var hasTile = false;
    while( !hasTile ) {
        var firstRow = resultingCode.map[0];
        for ( var t = 0; t < firstRow.length; t++ ) {
            if ( firstRow[t] != "--" ) {
                hasTile = true;
                break;
            }
        }
        if ( !hasTile )
            resultingCode.map.shift();
    }

    hasTile = false;
    while( !hasTile ) {
        var lastRow = resultingCode.map[ resultingCode.map.length - 1 ];
        for ( var t = 0; t < lastRow.length; t++ ) {
            if ( lastRow[t] != "--" ) {
                hasTile = true;
                break;
            }
        }
        if ( !hasTile )
            resultingCode.map.pop();
    }

    hasTile = false;
    while ( !hasTile ) {
        for ( var r = 0; r < resultingCode.map.length; r++ ) {
            var thisTile = resultingCode.map[r][0];
            if ( thisTile != "--" ) {
                hasTile = true;
                break;
            }
        }
        if ( !hasTile )
            resultingCode.map.forEach(function(row){ row.shift(); });
    }

    hasTile = false;
    while ( !hasTile ) {
        for ( var r = 0; r < resultingCode.map.length; r++ ) {
            var thisRow = resultingCode.map[r];
            if ( thisRow[ thisRow.length - 1 ] != "--" ) {
                hasTile = true;
                break;
            }
        }
        if ( !hasTile )
            resultingCode.map.forEach(function(row){ row.pop(); });
    }

    resultingCode = JSON.stringify(resultingCode, null, 4);

    var displayCode = document.createElement("textarea");
    display.appendChild(displayCode);
    displayCode.innerHTML = resultingCode;
    displayCode.rows = 20;
    displayCode.cols = 100;

};
