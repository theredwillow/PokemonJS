function detectCollision( sprite, x, y ) {
    var allBlocking = document.querySelectorAll(".no-walk");
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
        var hitCondition = (
            sprite.x < other.x + other.w &&
            sprite.x + sprite.w > other.x &&
            sprite.y < other.y + other.h &&
            sprite.h + sprite.y > other.y
        );
        
        if ( hitCondition ) {
            // console.log("Hit!");
            return true;
        }
    }
    return false;
}
