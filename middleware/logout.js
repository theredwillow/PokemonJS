var mongo = require('mongodb').MongoClient;

var req, res, jsonToSend;

var closeOut = function(clearCookies) {
    clearCookies = clearCookies || true;
    if ( clearCookies !== true ) {
        jsonToSend = {
            "error" : "There was an error while deleting the token from the database.",
            "details" : error
        };
    }
    else if ( clearCookies ) {
        res.clearCookie("token");
        res.clearCookie("username");
    }
    res.send( JSON.stringify(jsonToSend) );
};

var findAndDelete = function() {
    mongo.connect(mongoURL, function(err, client) {

        var tokenCollection = client.db('database').collection('login');

        var checkData = function(error, rows) {
            if (error) {
                jsonToSend = {
                    "error" : "There was an error while checking the database for the token.",
                    "details" : error
                };
                closeOut(false);
            }
            else if ( !rows || !rows.length ) {
                jsonToSend = {
                    "status": "Success!",
                    "details": "Token had already expired or been deleted from database."
                };
                closeOut();
            }
            else if ( req.cookies.token != rows.token ) {
                jsonToSend = {
                    "status": "Success!",
                    "details": "Your token did not match."
                };
                closeOut();
            }
            else {
                jsonToSend = { "status": "Success!" };
                tokenCollection.remove({ _id: req.cookies.username }, closeOut);
            }
        };

        tokenCollection.find({ _id: req.cookies.username }).toArray(checkData);

    });
};

var logout = function(request,result) {
    req = request;
    res = result;
    if ( !req.cookies.username || !req.cookies.token ) {
        jsonToSend = { "error": "You must be logged-in in order to log out." };
        closeOut();
    }
    else
        findAndDelete();
};

module.exports = logout;
