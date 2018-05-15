var generateCSS = function(thisSprite) {

    var thisCSS = {};

    var resizeTiles = function() {
        if ( thisSprite.tileSize.width != thisSprite.tileSize.height ) {
            var ifWidthIsLonger = ( thisSprite.tileSize.width > thisSprite.tileSize.height );
            var longerSide = ( ifWidthIsLonger ) ? thisSprite.tileSize.width : thisSprite.tileSize.height;
            var shorterSide = ( ifWidthIsLonger ) ? thisSprite.tileSize.height : thisSprite.tileSize.width;
            var newShorterSide = ( game.css.tileSize / longerSide ) * shorterSide;
            thisSprite.tileSize.width = (ifWidthIsLonger) ? game.css.tileSize : newShorterSide;
            thisSprite.tileSize.height = (!ifWidthIsLonger) ? game.css.tileSize : newShorterSide;
        }
        else {
            thisSprite.tileSize.width = game.css.tileSize;
            thisSprite.tileSize.height =  game.css.tileSize;
        }
    };
 
    if ( thisSprite.type == "location" ) {
  
        thisCSS.states = {};

        thisCSS.generateRule = function(tileName) {
            var theseBackgrounds = thisSprite.map.backgrounds[tileName];
            if ( theseBackgrounds.length > 1 ) {
                thisCSS.states[tileName] = thisCSS.states[tileName] || 0;
                var thisTilesCoor = theseBackgrounds[ thisCSS.states[tileName]++ ];
                thisCSS.animated.innerHTML += "." + thisSprite.id + "." + tileName;
                thisCSS.animated.innerHTML += " { background-position: ";
                thisCSS.animated.innerHTML += (thisTilesCoor.x * -1 * thisSprite.tileSize.width) + "px ";
                thisCSS.animated.innerHTML += (thisTilesCoor.y * -1 * thisSprite.tileSize.height) + "px }\n";
                if ( thisCSS.states[tileName] >= theseBackgrounds.length )
                    delete thisCSS.states[tileName];
            }
            else {
                var thisTilesCoor = theseBackgrounds[0];
                thisCSS.static.innerHTML += "." + thisSprite.id + "." + tileName;
                thisCSS.static.innerHTML += " { background-position: ";
                thisCSS.static.innerHTML += (thisTilesCoor.x * -1 * thisSprite.tileSize.width) + "px ";
                thisCSS.static.innerHTML += (thisTilesCoor.y * -1 * thisSprite.tileSize.height) + "px }\n";
            }
        };

        thisCSS.animateBackgrounds = function() {
            thisCSS.animated.innerHTML = "";
            for (var a = 0; a < thisCSS.animatedTileNames.length; a++) {
                var thisTile = thisCSS.animatedTileNames[a];
                thisCSS.generateRule(thisTile);
            }
        };

        thisCSS.tileNames = Object.keys(thisSprite.map.backgrounds);
        thisCSS.animatedTileNames = [];
        var addAnimatedTiles = function(t){
            if ( thisSprite.map.backgrounds[t].length > 1 )
                thisCSS.animatedTileNames.push(t);
        };
        thisCSS.tileNames.forEach(addAnimatedTiles);

        thisCSS.generateStyles = function() {

            resizeTiles();

            var imageStyle = document.getElementById(thisSprite.id + "-imageStyle");
            if ( !imageStyle ) {
                thisCSS.image = document.createElement("style");
                thisCSS.image.type = "text/css";
                thisCSS.image.id = thisSprite.id + "-imageStyle";
                thisCSS.image.innerHTML += "." + thisSprite.id;
                thisCSS.image.innerHTML += " { background-image: url('locations/images/" + thisSprite.image + "') }";
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

                if ( !game.loop.listeners[ thisSprite.id + "Animation" ] ) {
                    game.loop.listeners[ thisSprite.id + "Animation" ] = document.addEventListener("loopChanged", thisCSS.animateBackgrounds);
                }
            }

            thisCSS.static.innerHTML = "." + thisSprite.id;
            thisCSS.static.innerHTML += " { background-size: ";
            thisCSS.static.innerHTML += ( thisSprite.imageDimensions.x * thisSprite.tileSize.width ) + "px ";
            thisCSS.static.innerHTML += ( thisSprite.imageDimensions.y * thisSprite.tileSize.height ) + "px; }\n";

            thisCSS.tileNames.forEach(thisCSS.generateRule);
        }
        thisCSS.generateStyles();

    }
    else {

        thisCSS.generateStyles = function() {

            resizeTiles();

            var imageStyle = document.getElementById(thisSprite.id + "-imageStyle");
            if ( !imageStyle ) {
                thisCSS.image = document.createElement("style");
                thisCSS.image.type = "text/css";
                thisCSS.image.id = thisSprite.id + "-imageStyle";
                document.head.appendChild(thisCSS.image);
            }
            else if ( !thisCSS.image ) {
                thisCSS.image = imageStyle;
            }

            thisCSS.image.innerHTML = "." + thisSprite.id + " {";
            thisCSS.image.innerHTML += "\tbackground-image: url('sprites/images/" + thisSprite.image + "');\n";
            thisCSS.image.innerHTML += "\tbackground-size: ";
            thisCSS.image.innerHTML += ( thisSprite.tileSize.width * thisSprite.imageDimensions.x ) + "px ";
            thisCSS.image.innerHTML += ( thisSprite.tileSize.height * thisSprite.imageDimensions.y ) + "px;\n";
            thisCSS.image.innerHTML += "\twidth: " + thisSprite.tileSize.width + "px;\n";
            thisCSS.image.innerHTML += "\theight: " + thisSprite.tileSize.height + "px;\n}\n";

            for (var i = 0; i < 4; i++) {
                var dir = directions[i];
                for (var j = 0; j < 3; j++) {
                    var stride = strides[j];
                    thisCSS.image.innerHTML += ".male-trainer." + dir + "." + stride;
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stride].flip ) ? "\n{\n\t" : " { ";
                    thisCSS.image.innerHTML += "background-position: ";
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stride].x * -1 * thisSprite.tileSize.width ) + "px ";
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stride].y * -1 * thisSprite.tileSize.height ) + "px;";
                    if ( thisSprite.tiles[dir][stride].flip ) {
                        if ( dir == "east" || dir == "west" ) {
                            thisCSS.image.innerHTML += `
                            -moz-transform: scaleX(-1);
                            -o-transform: scaleX(-1);
                            -webkit-transform: scaleX(-1);
                            transform: scaleX(-1);
                            filter: FlipH;
                            -ms-filter: "FlipH";`;
                        }
                        else {
                            thisCSS.image.innerHTML += `
                            -moz-transform: scaleY(-1);
                            -o-transform: scaleY(-1);
                            -webkit-transform: scaleY(-1);
                            transform: scaleY(-1);
                            filter: FlipV;
                            -ms-filter: "FlipV";`;
                        }
                        thisCSS.image.innerHTML = thisCSS.image.innerHTML.replace(/\t{2,}/g, "\t");
                        thisCSS.image.innerHTML += "\n}\n";
                    }
                    else
                        thisCSS.image.innerHTML += " }\n";
                }
            }

        };
        thisCSS.generateStyles();

    }

    return thisCSS;

};
