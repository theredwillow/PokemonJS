var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var resolveDemand = function(demand, resultData) {
    if (!resultData.error) {
        console.log(demand, "was successful, sending this:", JSON.stringify(resultData));
        socket.emit('yesTo' + demand, resultData);
    }
    else {
        console.log(demand, "was unsuccessful, sending this:", JSON.stringify(resultData));
        socket.emit('noTo' + demand, resultData);
    }
    /* Eventually I'll have to figure out how to close databases properly
    if ( resultData.final !== false )
        db.close();
    */
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

var getMap = function(data) {
    mongo.connect(mongoURL, function(err, client) {
        var db = client.db('database');
        var userCollection = db.collection('users');
        var locationsCollection = db.collection('locations');
        var spritesCollection = db.collection('sprites');

        var getTownImages = function() {
            spritesCollection.find( { $and: [ { _id : { $in: imagesToCollect } }, { type: "location" } ] } ).toArray(function(err,imageObjs) {
                if (err)
                    resolveDemand("LoadGame", {error: "Database connection error while getting town images."});
                else {
                    townsCollected = Object.keys(townsCollected).map(function(t) {
                        if (!townsCollected[t].error)
                            townsCollected[t].image = imageObjs.find( function(i){ return i._id == townsCollected[t].image; } );
                        return townsCollected[t];
                    });
                    resolveDemand("LoadGame", townsCollected);
                }
            });
        };

        var getTowns = function() {
            locationsCollection.find( { _id : { $in: townsToCollect } } ).toArray(function(err,townObjs) {
                if (err)
                    resolveDemand("LoadGame", {error: "Database connection error while getting towns."});
                else {
                    var townsToCollectNext = [];
                    for (var to = 0; to < townObjs.length; to++) {
                        var townObj = townObjs[to];
                        townsCollected[townObj._id] = townObj;
                        townsToCollect.splice( townsToCollect.indexOf(townObj._id), 1 );

                        if ( !townObj.error && !imagesToCollect.includes(townObj.image) )
                            imagesToCollect.push(townObj.image);

                        var thesePortals = Object.keys(townObj.defaults.portals.legend).map(function(key) { return townObj.defaults.portals.legend[key]; });
                        for (var tp = 0; tp < thesePortals.length; tp++) {
                            var thisPortal = thesePortals[tp].destination.location;
                            if ( townsToCollect.indexOf(thisPortal) < 0
                             && !townsCollected[thisPortal] )
                                townsToCollectNext.push(thisPortal);
                        }
                    }

                    for ( var tn = 0; tn < townsToCollect.length; tn++ ) {
                        townsCollected[ townsToCollect[tn] ] = {
                            _id: townsToCollect[tn],
                            error: "This town wasn't found."
                        };
                    }

                    townsToCollect = townsToCollectNext;

                    if ( townsToCollect.length )
                        getTowns();
                    else
                        getTownImages();
                }
            });
        };
        
        var townsCollected = {};
        var townsToCollect = [];
        var imagesToCollect = [];
        // Figure out where player is
        userCollection.findOne({ _id : data.username }, function(err, userObj) {
            if (err)
                resolveDemand("LoadGame", { error: "Database connection error, couldn't figure out where player was: " + err });
            else {
                townsToCollect.push(userObj.town);
                getTowns();
            }
        });
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

    socket.on('askToLoadGame', getMap);
  
};
