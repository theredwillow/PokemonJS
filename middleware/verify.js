var mongo = require('mongodb').MongoClient;

var req, res, next;

var finish = function(err,rows) {
    if ( rows > 0 )
        return next();
    else {
        res.clearCookie("token");
        res.clearCookie("username");
        res.redirect('/');
    }
};


var isInDatabase = function isInDatabase() {
    mongo.connect(mongoURL, function(err, client) {
        var tokenCollection = client.db('database').collection('login');
        var tokenCookies = {
            _id: req.cookies.username,
            token: req.cookies.token
        };
        Boolean( tokenCollection.count(tokenCookies, finish) );
    });
};

var verify = function(request, result, nextFunc) {
    req = request;
    res = result;
    next = nextFunc;

    if ( !req.cookies.username || !req.cookies.token ) {
        res.clearCookie("token");
        res.clearCookie("username");
        res.redirect('/');
    }
    else
        isInDatabase();
};

module.exports = verify;
