function TestLab () {

    var thisLocation = this;

    this.type = "location";

    this.name = "Pallet Town Lab (Test)";
    this.id = this.name.replace(/[\s()\[\]]/g,"");

    this.image = "oaksLab.png";
    this.imageDimensions = { x: 5, y: 3 };
    this.imageSize = { width: 80, height: 48 };
    this.tileSize = { width: 16, height: 16 };

    this.tileRules = {
        "a0": {
            "backgrounds": [
                { "x": 0, "y": 0 }
            ]
        },
        "a1": {
            "backgrounds": [
                { "x": 1, "y": 0 }
            ]
        },
        "a2": {
            "backgrounds": [
                { "x": 2, "y": 0 }
            ]
        },
        "a3": {
            "backgrounds": [
                { "x": 3, "y": 0 }
            ]
        },
        "a4": {
            "backgrounds": [
                { "x": 4, "y": 0 }
            ]
        },
        "b0": {
            "backgrounds": [
                { "x": 0, "y": 1 }
            ]
        },
        "b1": {
            "backgrounds": [
                { "x": 1, "y": 1 }
            ]
        },
        "b2": {
            "backgrounds": [
                { "x": 2, "y": 1 }
            ],
            "walk": true
        },
        "b3": {
            "backgrounds": [
                { "x": 3, "y": 1 }
            ],
            "walk": true
        },
        "b4": {
            "backgrounds": [
                { "x": 4, "y": 1 }
            ],
            "walk": true
        },
        "c0": {
            "backgrounds": [
                { "x": 0, "y": 2 }
            ]
        },
        "c1": {
            "backgrounds": [
                { "x": 1, "y": 2 }
            ],
            "walk": true
        },
        "c2": {
            "backgrounds": [
                { "x": 2, "y": 2 }
            ]
        },
        "c3": {
            "backgrounds": [
                { "x": 3, "y": 2 }
            ]
        },
        "c4": {
            "backgrounds": [
                { "x": 4, "y": 2 }
            ],
            "walk": true
        }
    };

    this.defaultMap = [
        [ "a2", "a2", "a0", "a2", "a2", "a0", "a2", "a0", "a0", "a2" ],
        [ "c2", "a3", "a1", "b4", "b4", "b4", "b4", "b4", "b4", "b4" ],
        [ "c3", "b2", "b3", "b4", "b4", "b0", "c0", "b1", "b4", "c2" ],
        [ "b4", "b4", "b4", "b4", "b4", "b2", "c1", "b3", "b4", "c3" ],
        [ "b4", "b4", "c4", "c4", "b4", "b4", "b4", "b4", "b4", "b4" ]
    ];

    this.map = generateMap(this);
    this.css = generateCSS(this);

};
