var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var resolveDemand = function(demand, resultData) {
    if (!resultData.error) {
        console.log(demand, "was successful, sending this:", resultData);
        socket.emit('yesTo' + demand, resultData);
    }
    else {
        console.log(demand, "was unsuccessful, sending this:", resultData);
        socket.emit('noTo' + demand, resultData);
    }
};

var maxAttempts = 5;
var cookieExpiration = 3 * 60 * 60 * 1000;
var tokenLength = 15;

var makeToken = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tokenLength; i++)
      text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    return text;
};

var login = function(data) {
    username = data.username;
    password = data.password;

    if ( !username || !password )
        resolveDemand( "SignIn", { "error": "You must provide a name and password to log in." } );
    else {
        mongo.connect(mongoURL, function(err, client) {

            var userCollection = client.db('database').collection('users');
            var failureCollection = client.db('database').collection('loginFailures');
            var loginCollection = client.db('database').collection('login');
    
            var notifyIncorrect = function() {
                resolveDemand( "SignIn", { "error": "You have provided an incorrect password." } );
            };
    
            var compareOrFail = function(error, rows) {
                if (error) {
                    resolveDemand( "SignIn", {
                        "error" : "There was an error while checking the database.",
                        "details" : error
                    } );
                }
                else if ( !rows || !rows.length ) {
                    resolveDemand( "SignIn", { "error": "No such user found." } );
                }
                else if ( failureCollection.count({ name : username }) >= maxAttempts ) {
                    resolveDemand( "SignIn", { "error": "This user has exceeded the maximum number of log-in attempts." } );
                }
                else if ( !bcrypt.compareSync(password, rows[0].passwordHash) ) {
                    failureCollection.insert({ name : username, datetime : new Date() }, notifyIncorrect);
                }
                else {
                    var oldRec = { _id : username };
                    var newRec = {
                        _id : username,
                        token : makeToken()
                    };
                    loginCollection.update(oldRec, newRec, {upsert:true});
                    resolveDemand( "SignIn", {
                        "token": newRec.token,
                        "expire" : new Date() + cookieExpiration
                    } );
                }

            };
    
            userCollection.find({ _id : username }, { passwordHash : 1, _id : 0 }).toArray(compareOrFail);
    
        });
    }
};

var logout = function(data) {
    mongo.connect(mongoURL, function(err, client) {

        var tokenCollection = client.db('database').collection('login');

        var checkData = function(error, rows) {
            if (error) {
                resolveDemand( "SignOut", {
                    "error" : "There was an error while checking the database for the token.",
                    "details" : error
                });
            }
            else if ( !rows || !rows.length ) {
                resolveDemand( "SignOut", {
                    "status": "Success!",
                    "details": "Token had already expired or been deleted from database."
                });
            }
            else if ( data.token != rows.token ) {
                resolveDemand( "SignOut", {
                    "status": "Success!",
                    "details": "Your token did not match.",
                    rows
                });
            }
            else {
                var success = function() { resolveDemand( "SignOut", { "status": "Success!" } ); };
                tokenCollection.remove({ _id: data.username }, success);
            }
        };

        tokenCollection.find({ _id: data.username }).toArray(checkData);

    });
};

var countTokensInDB = function(err,countReturned) {
    var result;
    if (err)
        result = { error: "Database connection error: " + err };
    else if ( countReturned == 1 )
        result = { status: "Verified!" };
    else
        result = { error: "No such token in database!" };
    resolveDemand("TokenWorks", result);
};

var verify = function(data) {
    mongo.connect(mongoURL, function(err, client) {
        var tokenCollection = client.db('database').collection('login');
        data._id = data.username;
        delete data.username;
        tokenCollection.count(data, countTokensInDB);
    });
};

module.exports = function(socket) {  

    global.socket = socket;
    
    //io.to(data.location).emit();
    console.log("Socket connected");

    socket.on('askToSignIn', login);

    socket.on('askToSignOut', logout);

    socket.on('askIfTokenWorks', verify);

    socket.on('userSignIn', function(data) {
  
        console.log("user sign in: ", data);
    
        // Add player to location
        socket.join(data.location);
        socket.broadcast.to(data.location).emit('userSignedIn', data.name);
        socket.emit('signedIn');
    
    });

    socket.on('askToLoadGame', function(data) {
  
        console.log("someone's asking to load game", data);

        var testSprite = {

        };

        var testLocation = {
        
            name : "Pallet Town (Test)",
        
            image : "palletTown",
            imageDimensions : { x: 4, y: 11 },
            imageSize : { width: 64, height: 176 },
            tileSize : { width: 16, height: 16 },

            visitors : [
                {
                    user: "theredwillow",
                    image: "maleTrainer",
                    location: { r: 4, c: 2 }
                },
                {
                    user: "BobTest123",
                    image: "maleTrainer",
                    location: { r:1, c:6 }
                }
            ],

            defaults : {
        
                backgrounds : {
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
                    "d0": [
                    { "x": 0, "y": 3 }
                    ],
                    "d1": [
                    { "x": 1, "y": 3 }
                    ],
                    "d2": [
                    { "x": 2, "y": 3 }
                    ],
                    "d3": [
                    { "x": 3, "y": 3 }
                    ],
                    "e0": [
                    { "x": 0, "y": 4 }
                    ],
                    "e1": [
                    { "x": 1, "y": 4 }
                    ],
                    "e2": [
                    { "x": 2, "y": 4 }
                    ],
                    "e3": [
                    { "x": 3, "y": 4 }
                    ],
                    "f0": [
                    { "x": 0, "y": 5 }
                    ],
                    "f1": [
                    { "x": 1, "y": 5 }
                    ],
                    "f2": [
                    { "x": 1, "y": 6 }
                    ],
                    "f3": [
                    { "x": 2, "y": 6 }
                    ],
                    "g0": [
                    { "x": 3, "y": 6 }
                    ],
                    "g1": [
                    { "x": 0, "y": 7 }
                    ],
                    "g2": [
                    { "x": 1, "y": 7 }
                    ],
                    "g3": [
                    { "x": 2, "y": 7 }
                    ],
                    "h0": [
                    { "x": 2, "y": 8 }
                    ],
                    "h1": [
                    { "x": 3, "y": 8 }
                    ],
                    "h2": [
                    { "x": 0, "y": 9 }
                    ],
                    "h3": [
                    { "x": 1, "y": 9 }
                    ],
                    "i0": [
                    { "x": 2, "y": 9 }
                    ],
                    "i1": [
                    { "x": 3, "y": 9 }
                    ],
                    "i2": [
                    { "x": 0, "y": 10 }
                    ],
                    "i3": [
                    { "x": 1, "y": 10 }
                    ],
                    "j0": [
                    { "x": 2, "y": 10 }
                    ],
                    "j1": [
                    { "x": 3, "y": 10 }
                    ],
                    "j2": [
                    { "x": 2, "y": 5 },
                    { "x": 3, "y": 5 },
                    { "x": 0, "y": 6 }
                    ],
                    "j3": [
                    { "x": 3, "y": 7 },
                    { "x": 0, "y": 8 },
                    { "x": 1, "y": 8 }
                    ]
                },
            
                walk : [ "a0", "a2", "a3", "b0", "b1", "j2", "j3" ],
            
                surf : [ ],
            
                coordinates : [
                    [ "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a3", "a3", "b0", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a3", "a3", "a3", "a1" ],
                    [ "a1", "b1", "b1", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "b1", "b1", "a1", "a1", "a1", "a3", "a3", "b0", "a1" ],
                    [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "a1", "a1", "a1", "b1", "b1", "b1", "a1" ],
                    [ "a1", "b1", "b1", "e2", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "a1", "a1", "a1", "b1", "b1", "b0", "a1" ],
                    [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b0", "a1" ],
                    [ "a1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "j2", "a1" ],
                    [ "a1", "b1", "b1", "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "b2", "b3", "b3", "b3", "c0", "j2", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a1", "b1", "b1", "e2", "b1", "b1", "c1", "d3", "h1", "c2", "d0", "j2", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "e2", "b1", "b1", "j3", "a0", "j3", "j3", "j3", "j2", "a1" ],
                    [ "a1", "b1", "b1", "d1", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "e2", "b1", "b1", "d1", "a0", "a0", "a0", "a0", "j2", "a1" ],
                    [ "a1", "b1", "b1", "a0", "j2", "a0", "a0", "j2", "a0", "a0", "j2", "a0", "j2", "j2", "a0", "a0", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
                    [ "a1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "b1", "a0", "a1" ],
                    [ "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a1", "a0", "a1" ],
                    [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "b1", "b1", "b1" ]
                ],
                
                // Dev Idea: Load world by stringing together destinationLegends
                // Dev Idea: Throw error for one way portals
            
                /*
                    --- Portal Directions ---
                -Inbound directions are listed in this order: "west", "north", "south", "east"
                -Outbound directions are declared by the initial letter of the directional word
            
                Example
                -A common command is "--n-"
                    This means when you enter facing south (the third spot),
                    you will come out facing north (the letter n)
                */
                
                portals : {
                    legend : {
                        "l0" : {
                        destination: { location: "Pallet Town Lab (Test)", r: 4, c: 2 },
                        directions: "-n--"
                        },
                        "r0" : {
                        destination: { location: "Route One (Test)", r: 0, c: 0 },
                        directions: "--s-"
                        }
                    },
                    coordinates : [
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "l0", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--" ],
                        [ "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "r0", "r0", "r0" ]
                    ]
                }

            }
        };

        var stateOfGame = [
            testLocation
        ];

        resolveDemand("LoadGame", stateOfGame);

    });
  
};
