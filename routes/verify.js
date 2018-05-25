var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var failures = {};
var maxAttempts = 5;
var expiration = 5 * 60 * 1000; // 5 minutes
function dbSelect(req, res, next) {

    var db = new sqlite3.Database('./database.db');

    if ( !req.query.user || !req.query.hash ) {
        req.data = { "error": "You must provide a name and hash to verify." };
        return next();
    }

    var displayData = function(error, rows) {
        // console.log("rows", rows);
        if ( !rows || rows.length == 0 )
            req.data = { "error": "No such user found." };
        else if ( failures[req.query.user] && failures[req.query.user].length == maxAttempts )
            req.data = { "error": "This user has exceeded the maximum number of log-in attempts." };
        else if (rows.passwordHash != req.query.hash) {
            if (!failures[req.query.user])
                failures[req.query.user] = [];
            failures[req.query.user].push( new Date() );
            req.data = {
                "error": "You have provided an incorrect password hash.",
                "attempts": failures[req.query.user].length
            };
        }
        else {
            delete failures[req.query.user];
            req.data = { "validation": true };
        }
        return next();
    };

    if ( failures[req.query.user] ) {
        var tempMemory = [];
        failures[req.query.user].forEach(function(f) {
            if ( ( (new Date) - f ) < 60000 )
                tempMemory.push(f);
        });
        failures[req.query.user] = tempMemory;
        delete tempMemory;
    }

    var dbRequest = "SELECT passwordHash FROM users WHERE name = ?";
    db.get(dbRequest, req.query.user, displayData);

}

function renderData(req, res) { 
    res.send( JSON.stringify(req.data) );
    db.close();
}

router.get('/', dbSelect, renderData);

module.exports = router;
