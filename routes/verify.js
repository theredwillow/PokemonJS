var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcrypt');

var failures = {};
var maxAttempts = 5;
var expiration = 5 * 60 * 1000; // 5 minutes
var cookieExpiration = 3 * 60 * 60 * 1000;
var tokenLength = 15;

var makeToken = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tokenLength; i++) {
      text += possible.charAt( Math.floor( Math.random() * possible.length ) );
    }
    return text;
};

var dbRequest = "SELECT passwordHash FROM users WHERE name = ?";
var addToken = "REPLACE INTO `log-in` (user, token) VALUES (?, ?)";

function dbSelect(req, res, next) {

    var db = new sqlite3.Database('./database.db');

    if ( !req.query.user || !req.query.pw ) {
        req.data = { "error": "You must provide a name and password to verify." };
        return next();
    }

    var displayData = function(error, rows) {
        // console.log("rows", rows);
    
        if ( !rows || rows.length == 0 )
            req.data = { "error": "No such user found." };
        else if ( failures[req.query.user] && failures[req.query.user].length == maxAttempts )
            req.data = { "error": "This user has exceeded the maximum number of log-in attempts." };
        else if ( !bcrypt.compareSync(req.query.pw, rows.passwordHash) ) {
            if (!failures[req.query.user])
                failures[req.query.user] = [];
            failures[req.query.user].push( new Date() );
            req.data = {
                "error": "You have provided an incorrect password.",
                "attempts": failures[req.query.user].length
            };
        }
        else {
            delete failures[req.query.user];
            var token = makeToken();
            req.data = { "status": "Success!" };
            db.get(addToken, req.query.user, token);
            res.cookie("token", token, { expire : new Date() + cookieExpiration });
            res.cookie("username", req.query.user);
        }
        return next();
    };

    if ( failures[req.query.user] ) {
        var tempMemory = [];
        failures[req.query.user].forEach(function(f) {
            if ( ( (new Date) - f ) < expiration )
                tempMemory.push(f);
        });
        failures[req.query.user] = tempMemory;
        delete tempMemory;
    }

    db.get(dbRequest, req.query.user, displayData);

}

function renderData(req, res) { 
    res.send( JSON.stringify(req.data) );
    db.close();
}

router.post('/', dbSelect, renderData);

module.exports = router;
