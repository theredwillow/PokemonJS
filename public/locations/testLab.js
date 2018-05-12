function TestLab () {

    var thisLocation = this;

    this.type = "location";

    this.name = "Pallet Town Lab (Test)";
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    this.image = "oaksLab.png";
    this.imageDimensions = { x: 5, y: 3 };
    this.imageSize = { width: 80, height: 48 };
    this.tileSize = { width: 16, height: 16 };

    this.defaults = {};

    this.defaults.backgrounds = {
        "a0": [
			{ "x": 0, "y": 0 }
        ],
        "a1": [
			{ "x": 1, "y": 0 }
        ],
        "a2": [
			{ "x": 2, "y": 0 }
        ],
        "a3": [
			{ "x": 3, "y": 0 }
        ],
        "a4": [
			{ "x": 4, "y": 0 }
        ],
        "b0": [
			{ "x": 0, "y": 1 }
        ],
        "b1": [
			{ "x": 1, "y": 1 }
        ],
        "b2": [
			{ "x": 2, "y": 1 }
        ],
        "b3": [
			{ "x": 3, "y": 1 }
        ],
        "b4": [
			{ "x": 4, "y": 1 }
        ],
        "c0": [
			{ "x": 0, "y": 2 }
        ],
        "c1": [
			{ "x": 1, "y": 2 }
        ],
        "c2": [
			{ "x": 2, "y": 2 }
        ],
        "c3": [
			{ "x": 3, "y": 2 }
        ],
        "c4": [
			{ "x": 4, "y": 2 }
        ]
    };

    this.defaults.walk = [ "b2", "b3", "b4", "c1", "c4"];

    this.defaults.surf = [ ];

    this.defaults.coordinates = [
        [ "a2", "a2", "a0", "a2", "a2", "a0", "a2", "a0", "a0", "a2" ],
        [ "c2", "a3", "a1", "b4", "b4", "b4", "b4", "b4", "b4", "b4" ],
        [ "c3", "b2", "b3", "b4", "b4", "b0", "c0", "b1", "b4", "c2" ],
        [ "b4", "b4", "b4", "b4", "b4", "b2", "c1", "b3", "b4", "c3" ],
        [ "b4", "b4", "c4", "c4", "b4", "b4", "b4", "b4", "b4", "b4" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ]
    ];

    /*
        --- Portal Directions ---
    -Inbound directions are listed in this order: "left", "up", "down", "right"
    -Outbound directions are declared by the initial letter of the directional word

    Example
     -The most common command is "--u-"
        This means you can only enter by heading downwards into it (third spot),
        and you can only come out upward bound (the letter u)
    */
    this.defaults.portals = {};
    this.defaults.portals.legend = {
        "p1" : {
            destination: { location: "Pallet Town (Test)", r: 10, c: 19 },
            directions: "--s-"
        }
    };
    this.defaults.portals.coordinates = [
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
        [ "--", "--", "p1", "p1", "--", "--", "--", "--", "--", "--" ]
    ];

    this.map = generateMap(this);

};
