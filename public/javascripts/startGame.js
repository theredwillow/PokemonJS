window.screen = document.getElementById("screen");
var startGame = function() {

    var screen = window.screen;
    screen.style.backgroundColor = "white";

    Promise.all([
        load.js('/javascripts/controls.js'),
        load.css('/fonts/pokemon/pokemonFont.css'),
        load.js('/javascripts/menu.js'),
        load.css('/styles/menu.css')
    ]).then(function() {

        var mainMenu = new MenuDisplay();

        mainMenu.options = [
            "Resume Game",
            "New Game",
            "Settings"
        ];
    
        /*
        mainMenu.finalize.anySelection = function(selection) {
            alert("You chose to " + selection);
        };
        */
        mainMenu.finalize[0] = window.socketFuncs.tryToLoadGame;
        mainMenu.finalize[1] = function() {
            window.location.href = "/game/new";
        };
    
        mainMenu.draw(screen);

    }).catch(function(errUrl) {
        console.log('Oh no, epic failure!', errUrl);
    });

};


