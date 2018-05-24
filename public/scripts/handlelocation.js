function Location(name) {

    var thisLocation = this;

    game.sprites.push(this);

    this.type = "location";

    this.name = name;
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', '/db/select?loc=' + name );
    ajax.onload = function() {
        if ( ajax.status === 200 ) {
            var dbResult = JSON.parse(ajax.responseText);
            if ( "error" in dbResult ) {
                throw dbResult.error;
            }
            else if ( dbResult.length == 1 ) {
                dbResult = dbResult[0];
                dbResult.defaults = JSON.parse(dbResult.defaults);
                for ( var k in dbResult ) {
                    thisLocation[k] = dbResult[k];
                }
                thisLocation.image = thisLocation.sprite;

                thisLocation.imageDimensions = { x: 5, y: 3 };
                thisLocation.imageSize = { width: 80, height: 48 };
                thisLocation.tileSize = { width: 16, height: 16 };
            
                thisLocation.map = generateMap(thisLocation);
            }
        }
        else {
            throw "Select query for location named " + name + " failed, status code " + ajax.status;
        }
    };
    ajax.send();

};
