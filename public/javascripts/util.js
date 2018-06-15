var game = {};

game.sprites = {};

game.loop = {};
game.loop.timing = 750;
game.loop.event = new Event("loopChanged");
game.loop.dispatch = function() { document.dispatchEvent(game.loop.event); };
game.loop.interval = setInterval(game.loop.dispatch, game.loop.timing);
game.loop.listeners = {};

game.css = {
    element: document.createElement("style"),
    get tileSize() {
        return this._tileSize;
    },
    set tileSize(newSize) {
        this._tileSize = newSize;
        
        this.element.innerHTML = ".tile { ";
        this.element.innerHTML += "min-height: " + this._tileSize + "px; ";
        this.element.innerHTML += "height: " + this._tileSize + "px; ";
        this.element.innerHTML += "max-height: " + this._tileSize + "px; ";
        this.element.innerHTML += "min-width: " + this._tileSize + "px; ";
        this.element.innerHTML += "width: " + this._tileSize + "px; ";
        this.element.innerHTML += "max-width: " + this._tileSize + "px; ";
        this.element.innerHTML += "margin: 0px; }";

        for (var c = 0; c < game.sprites.length; c++) {
            if ( game.sprites[c].css )
                game.sprites[c].css.generateStyles();
        }

    }
};
game.css.element.type = "text/css";
game.css.element.id = "tile-size";
document.head.appendChild(game.css.element);
game.css.tileSize = 16;

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var directions = ["north", "south", "east", "west"];
var strides = ["standing", "leftFoot", "rightFoot"];
