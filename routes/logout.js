var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var selectCall = "SELECT * FROM `log-in` WHERE user = ?";
var deleteCall = "DELETE FROM `log-in` WHERE user = ?";

function dbSelect(req, res, next) {

    var db = new sqlite3.Database('./database.db');

    if ( !req.cookies.username || !req.cookies.token ) {
        req.data = { "error": "You must be logged-in in order to log out." };
        return next();
    }

    var checkData = function(error, rows) {
        // console.log("rows", rows);
    
        if ( !rows || rows.length == 0 )
            req.data = { "error": "No such user was logged in." };
        else if ( req.cookies.token != rows.token )
            req.data = { "error": "Your token did not match." };
        else {
            req.data = { "status": "Success!" };
            db.get(deleteCall, req.cookies.username);
        }
        res.clearCookie("token");
        res.clearCookie("username");
        return next();
    };

    db.get(selectCall, req.cookies.username, checkData);

}

function renderData(req, res) { 
    res.send( JSON.stringify(req.data) );
    db.close();
}

router.post('/', dbSelect, renderData);

module.exports = router;
