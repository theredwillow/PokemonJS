var game = {};

game.sprites = [];

game.speedMultiplier = 2;

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
        this.element.innerHTML += "height: " + this._tileSize + "; ";
        this.element.innerHTML += "width: " + this._tileSize + "; ";
        this.element.innerHTML += "margin: 0px; }";

        for (var c = 0; c < game.sprites.length; c++) {
            game.sprites[c].css.generateStyles();
        }

    }
};
game.css.element.type = "text/css";
game.css.element.id = "tile-size";
document.head.appendChild(game.css.element);
game.css.tileSize = 16;

function detectCollision( sprite, x, y ) {
    sprite = {
        x: x,
        y: y,
        w: Number(sprite.element.style.width.replace("px","")),
        h: Number(sprite.element.style.height.replace("px","")),
        element: sprite.element
    };
    for (var b = 0; b < allBlocking.length; b++) {
        var other = allBlocking[b];
        // console.log("Other:", other);
        if ( other == sprite.element )
            continue;
        other = {
            x: Number(other.style.left.replace("px","")),
            y: Number(other.style.top.replace("px","")),
            w: Number(other.style.width.replace("px","")),
            h: Number(other.style.height.replace("px",""))
        };
        /*
        var hitCondition = (
            sprite.x < other.x + other.w &&
            sprite.x + sprite.w > other.x &&
            sprite.y < other.y + other.h &&
            sprite.h + sprite.y > other.y
        );
        */
        
        if ( hitCondition ) {
            // console.log("Hit!");
            return true;
        }
    }
    return false;
}

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var directions = ["north", "south", "east", "west"];
var strides = ["standing", "leftFoot", "rightFoot"];
