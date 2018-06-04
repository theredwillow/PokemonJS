var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var io = require('socket.io').listen(4000);
var verify = require('../middleware/verify');

io.on('connection', function(socket) {  

    //io.to(data.location).emit();

    socket.on('userSignIn', function(data) {
 
        console.log("user sign in", data);

        // Add player to location
        socket.join(data.location);
        socket.broadcast.to(data.location).emit('userSignedIn', data.name);
        socket.emit('signedIn');

    });

});

var req, res, next;

var loadGame = function (request, result, nextFunc) {
    req = request;
    res = result;
    next = nextFunc;

    mongo.connect(mongoURL, function(err, client) {

        var userCollection = client.db('database').collection('users');

        var loadOrNew = function(error, rows) {
            if ( rows && rows.length ) {
                req.data = rows[0];
                drawGame();
            }
            else {
                req.data = { "error": "No such records found." };
                newGame(req, res, next);
            }
        };

        userCollection.find({ _id : req.cookies.username }, { town:1, _id:0 }).toArray(loadOrNew);

    });
};

var drawGame = function() {
    res.render('game.load.hbs', { user : req.cookies.username, town: req.data.town });
};

var newGame = function(request, result, nextFunc) {
    req = request;
    res = result;
    next = nextFunc;

    if (req.cookies.username)
        res.render('game.new.hbs', { user : req.cookies.username });
    else
        res.redirect('/');
};

router.get('/', verify, loadGame);
router.get('/new', newGame);

module.exports = router;
