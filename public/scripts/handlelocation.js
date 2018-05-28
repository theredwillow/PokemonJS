function Location(name) {

    var thisLocation = this;

    game.sprites.push(this);

    this.type = "location";

    this.name = name;
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    var loadedEvent = new CustomEvent( "LocationLoaded", {"detail": name} );
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', '/db/select?loc=' + name );
    ajax.onload = function() {
        if ( ajax.status === 200 ) {
            var dbResult = JSON.parse(ajax.responseText);
            if ( "error" in dbResult ) {
                throw dbResult.error;
            }
            else if ( dbResult.length == 1 ) {

                thisLocation.defaults = JSON.parse(dbResult.defaults);
                thisLocation.creator = dbResult.creator;
                thisLocation.image = dbResult.image;
                thisLocation.imageDimensions = { x: dbResult.rows, y: dbResult.columns };
                thisLocation.imageSize = { width: dbResult.width, height: dbResult.height };
                thisLocation.tileSize = { };
                thisLocation.tileSize.width = dbResult.width / dbResult.rows;
                thisLocation.tileSize.height = dbResult.height / dbResult.columns;

                thisLocation.map = generateMap(thisLocation);

                if ( !game.sprites.length ) {
                    thisLocation.map.draw();
                }

                console.log(name, "loaded, dispatching");
                document.dispatchEvent( loadedEvent );
            }
        }
        else {
            throw "Select query for location named " + name + " failed, status code " + ajax.status;
        }
    };
    ajax.send();

};
