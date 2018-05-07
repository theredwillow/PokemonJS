var CSSHandler = function(thisSprite) {

    var thisCSS = this;

    this.resizeTiles = function() {
        if ( thisSprite.tileSize.width != thisSprite.tileSize.height ) {
            var ifWidthIsLonger = ( thisSprite.tileSize.width > thisSprite.tileSize.height );
            var longerSide = ( ifWidthIsLonger ) ? thisSprite.tileSize.width : thisSprite.tileSize.height;
            var shorterSide = ( ifWidthIsLonger ) ? thisSprite.tileSize.height : thisSprite.tileSize.width;
            var newShorterSide = ( tileSize / longerSide ) * shorterSide;
            thisSprite.tileSize.width = (ifWidthIsLonger) ? tileSize : newShorterSide;
            thisSprite.tileSize.height = (!ifWidthIsLonger) ? tileSize : newShorterSide;
        }
        else {
            thisSprite.tileSize.width = tileSize;
            thisSprite.tileSize.height =  tileSize;
        }
    };
 
    if ( thisSprite.type == "location" ) {
  
        this.states = {};

        this.generateRule = function(tileName) {
            var thisTile = thisSprite.map.tiles[tileName];
            if ( thisTile.backgrounds.length > 1 ) {
                thisCSS.states[tileName] = thisCSS.states[tileName] || 0;
                var thisTilesCoor = thisTile.backgrounds[ thisCSS.states[tileName]++ ];
                thisCSS.animated.innerHTML += "." + thisSprite.id + "." + tileName;
                thisCSS.animated.innerHTML += " { background-position: ";
                thisCSS.animated.innerHTML += (thisTilesCoor.x * -1 * thisSprite.tileSize.width) + "px ";
                thisCSS.animated.innerHTML += (thisTilesCoor.y * -1 * thisSprite.tileSize.height) + "px }\n";
                if ( thisCSS.states[tileName] >= thisTile.backgrounds.length )
                    delete thisCSS.states[tileName];
            }
            else {
                var thisTilesCoor = thisTile.backgrounds[0];
                thisCSS.static.innerHTML += "." + thisSprite.id + "." + tileName;
                thisCSS.static.innerHTML += " { background-position: ";
                thisCSS.static.innerHTML += (thisTilesCoor.x * -1 * thisSprite.tileSize.width) + "px ";
                thisCSS.static.innerHTML += (thisTilesCoor.y * -1 * thisSprite.tileSize.height) + "px }\n";
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

            thisCSS.resizeTiles();

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
            thisCSS.static.innerHTML += ( thisSprite.imageDimensions.x * thisSprite.tileSize.width ) + "px ";
            thisCSS.static.innerHTML += ( thisSprite.imageDimensions.y * thisSprite.tileSize.height ) + "px; }\n";

            thisCSS.tileNames.forEach(thisCSS.generateRule);
        })();

    }
    else {

        this.generateStyles = (function() {

            thisCSS.resizeTiles();

            var imageStyle = document.getElementById(thisSprite.id + "-imageStyle");
            if ( !imageStyle ) {
                thisCSS.image = document.createElement("style");
                thisCSS.image.type = "text/css";
                thisCSS.image.id = thisSprite.id + "-imageStyle";
                thisCSS.image.innerHTML += "." + thisSprite.id + " {";
                thisCSS.image.innerHTML += "\tposition: absolute;\n";
                thisCSS.image.innerHTML += "\tbackground-image: url('sprites/" + thisSprite.image + "');\n";
                thisCSS.image.innerHTML += "\tbackground-size: ";
		        thisCSS.image.innerHTML += ( thisSprite.tileSize.width * thisSprite.imageDimensions.x ) + "px ";
		        thisCSS.image.innerHTML += ( thisSprite.tileSize.height * thisSprite.imageDimensions.y ) + "px;\n";
		        thisCSS.image.innerHTML += "\twidth: " + thisSprite.tileSize.width + "px;\n";
		        thisCSS.image.innerHTML += "\theight: " + thisSprite.tileSize.height + "px;\n}\n";
                document.head.appendChild(thisCSS.image);
            }
            else if ( !thisCSS.image ) {
                thisCSS.image = imageStyle;
            }

            for (var i = 0; i < 4; i++) {
                var dir = directions[i];
                for (var j = 0; j < 3; j++) {
                    var stance = stances[j];
                    thisCSS.image.innerHTML += ".male-trainer." + dir + "." + stance;
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stance].flip ) ? "\n{\n\t" : " { ";
                    thisCSS.image.innerHTML += "background-position: ";
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stance].x * -1 * thisSprite.tileSize.width ) + "px ";
                    thisCSS.image.innerHTML += ( thisSprite.tiles[dir][stance].y * -1 * thisSprite.tileSize.height ) + "px;";
                    if ( thisSprite.tiles[dir][stance].flip ) {
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

        })();

    }
};
