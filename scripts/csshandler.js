var CSSHandler = function(thisSprite) {

    var thisCSS = this;

    this.states = {};

    this.generateRule = function(tileName) {
        var thisTile = thisSprite.map.tiles[tileName];
        if ( thisTile.backgrounds.length > 1 ) {
            thisCSS.states[tileName] = thisCSS.states[tileName] || 0;
            var thisTilesCoor = thisTile.backgrounds[ thisCSS.states[tileName]++ ];
            thisCSS.animated.innerHTML += "." + thisSprite.id + "." + tileName;
            thisCSS.animated.innerHTML += " { background-position: ";
            thisCSS.animated.innerHTML += (thisTilesCoor.x * -1 * tileSize) + "px ";
            thisCSS.animated.innerHTML += (thisTilesCoor.y * -1 * tileSize) + "px }\n";
            if ( thisCSS.states[tileName] >= thisTile.backgrounds.length )
                delete thisCSS.states[tileName];
        }
        else {
            var thisTilesCoor = thisTile.backgrounds[0];
            thisCSS.static.innerHTML += "." + thisSprite.id + "." + tileName;
            thisCSS.static.innerHTML += " { background-position: ";
            thisCSS.static.innerHTML += (thisTilesCoor.x * -1 * tileSize) + "px ";
            thisCSS.static.innerHTML += (thisTilesCoor.y * -1 * tileSize) + "px }\n";
        }
    };    

    this.animateBackgrounds = function() {
        thisCSS.animated.innerHTML = "";
        for (var a = 0; a < thisCSS.animatedTileNames.length; a++) {
            var thisTile = thisCSS.animatedTileNames[a];
            thisCSS.generateRule(thisTile);
        }
    };

    this.tileNames = Object.keys(thisSprite.map.tiles);
    this.animatedTileNames = [];
    var addAnimatedTiles = function(t){
        if ( thisSprite.map.tiles[t].backgrounds.length > 1 )
            thisCSS.animatedTileNames.push(t);
    };
    this.tileNames.forEach(addAnimatedTiles);

    this.generateStyles = (function() {

        var imageStyle = document.getElementById(thisSprite.id + "-imageStyle");
        if ( !imageStyle ) {
            thisCSS.image = document.createElement("style");
            thisCSS.image.type = "text/css";
            thisCSS.image.id = thisSprite.id + "-imageStyle";
            thisCSS.image.innerHTML += "." + thisSprite.id;
            thisCSS.image.innerHTML += " { background-image: url('locations/" + thisSprite.image + "') }";
            document.head.appendChild(thisCSS.image);
        }
        else if ( !thisCSS.image ) {
            thisCSS.image = imageStyle;
        }

        var staticStyle = document.getElementById(thisSprite.id + "-staticStyle");
        if ( !staticStyle ) {
            thisCSS.static = document.createElement("style");
            thisCSS.static.type = "text/css";
            thisCSS.static.id = thisSprite.id + "-staticStyle";
            document.head.appendChild(thisCSS.static);
        }
        else if ( !thisCSS.static ) {
            thisCSS.static = staticStyle;
        }

        if ( thisCSS.animatedTileNames.length ) {
            var animatedStyle = document.getElementById(thisSprite.id + "-animatedStyle");
            if ( !animatedStyle ) {
                thisCSS.animated = document.createElement("style");
                thisCSS.animated.type = "text/css";
                thisCSS.animated.id = thisSprite.id + "-animatedStyle";
                document.head.appendChild(thisCSS.animated);
            }
            else if ( !thisCSS.animated ) {
                thisCSS.animated = animatedStyle;
            }

            if ( !loop.listeners[ thisSprite.id + "Animation" ] ) {
                loop.listeners[ thisSprite.id + "Animation" ] = document.addEventListener("loopChanged", thisCSS.animateBackgrounds);
            }
        }

        thisCSS.static.innerHTML = "." + thisSprite.id;
        thisCSS.static.innerHTML += " { background-size: ";
        thisCSS.static.innerHTML += ( thisSprite.imageDimensions.x * tileSize ) + "px ";
        thisCSS.static.innerHTML += ( thisSprite.imageDimensions.y * tileSize ) + "px; }\n";

        thisCSS.tileNames.forEach(thisCSS.generateRule);
    })();

};
