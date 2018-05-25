var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

function dbSelect(req, res, next) {

    var db = new sqlite3.Database('./database.db');
    /*
    Possible Variables
        loc: location
        user: user
        newLoc: replacement location in update query or new location in insert
        newUser: replacement username in update query or new user in insert
        database: locations or users, chosen via loc or user existance
        queryType: select, insert, update, etc... chosen via route
    */

    // var queryType = req.url.replace(/(^\/)|(\?.*$)/g,"").toUpperCase();

    if ( !req.query.loc && !req.query.user && !req.query.table ) {
        req.data = { "error": "No table name provided." };
        return next();
    }

    var table = req.query.table;
    if (!table) {
        table = ( req.query.loc ) ? "locations" : "users";
    }
    var item = req.query.loc || req.query.user;
    var hashSent = req.query.hash;

    var displayData = function(error, rows) {
        // console.log("rows", rows);
        if ( rows && rows.length !== 0 )
            req.data = rows;
        else
            req.data = { "error": "No such records found." };
        return next();
    };

    var dbRequest;
    if ( table == "locations" ) {
        dbRequest = "SELECT * FROM locations"
            + " INNER JOIN location_images"
            + " ON location_images.path = locations.image";
    }
    else {
        dbRequest = "SELECT name, location, sprite FROM users";
    }

    if (item) {
        dbRequest += " WHERE name = ?";
        db.get(dbRequest, item, displayData);
    }
    else {
        db.all(dbRequest, displayData);
    }

}

function renderData(req, res) {
    res.send( JSON.stringify(req.data) );
    db.close();
}

router.get('/select', dbSelect, renderData);
// router.get('/insert', dbCall, renderData);
// router.get('/update', dbCall, renderData);

module.exports = router;
