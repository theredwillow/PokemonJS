var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var verify = require('../middleware/verify');

var dbRequest = "SELECT town FROM users WHERE name = ?";

var loadGame = function (req, res, next) {

    var db = new sqlite3.Database('./database.db');

    var displayData = function(error, rows) {
        console.log("rows", rows);
        if ( rows && rows.length !== 0 ) {
            req.data = rows;
            drawGame(req, res, next);
        }
        else {
            req.data = { "error": "No such records found." };
            newGame(req, res, next);
        }
    };

    db.get(dbRequest, req.cookies.username, displayData);

};

var drawGame = function(req, res, next) {
    res.render('game', { user : req.cookies.username, town: req.data.town });
};

var newGame = function(req, res, next) {
    res.render('game', { user : "NEW " + req.cookies.username });
};

router.get('/', verify, loadGame);
router.get('/new', newGame);

module.exports = router;
