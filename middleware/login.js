var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var res, req, jsonToSend;
// Failure cleanup is handled by mongoDB expireAfterSeconds index

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

var closeOut = function() {
    res.send( JSON.stringify(jsonToSend) );
};

var checkPassword = function() {
    mongo.connect(mongoURL, function(err, client) {

        var userCollection = client.db('database').collection('users');
        var failureCollection = client.db('database').collection('loginFailures');
        var loginCollection = client.db('database').collection('login');

        var notifyIncorrect = function() {
            jsonToSend = { "error": "You have provided an incorrect password." };
            closeOut();
        };

        var compareOrFail = function(error, rows) {
            if (error) {
                jsonToSend = {
                    "error" : "There was an error while checking the database.",
                    "details" : error
                };
                closeOut();
            }
            else if ( !rows || !rows.length ) {
                jsonToSend = { "error": "No such user found." };
                closeOut();
            }
            else if ( failureCollection.count({ name : req.query.user }) >= maxAttempts ) {
                jsonToSend = { "error": "This user has exceeded the maximum number of log-in attempts." };
                closeOut();
            }
            else if ( !bcrypt.compareSync(req.query.pw, rows[0].passwordHash) ) {
                failuresCollection.insert({ name : req.query.user, datetime : new Date() }, notifyIncorrect);
            }
            else {
                jsonToSend = { "status": "Success!" };
                var oldRec = { _id : req.query.user };
                var newRec = {
                    _id : req.query.user,
                    token : makeToken()
                }
                loginCollection.update(oldRec, newRec, {upsert:true});
                res.cookie("token", newRec.token, { expire : new Date() + cookieExpiration });
                res.cookie("username", req.query.user);
                closeOut();
            }

        };

        userCollection.find({ _id : req.query.user }, { passwordHash : 1, _id : 0 }).toArray(compareOrFail);

    });
};

var login = function(request,result){
    req = request;
    res = result;

    if ( !req.query.user || !req.query.pw ) {
        jsonToSend = { "error": "You must provide a name and password to log in." };
        closeOut();
    }
    else {
        checkPassword();
    }
        

};

module.exports = login;
