var sqlite3 = require('sqlite3').verbose();

var dbRequest = "SELECT * FROM `log-in` WHERE name = ? & token = ?";

function isInDatabase(req) {

    var db = new sqlite3.Database('./database.db');

    if ( !req.cookies.username || !req.cookies.token ) {
        return false;
    }

    var checkData = function(error, rows) {
        // console.log("rows", rows);

        if ( !rows || rows.length == 0 )
            return false;
        else
            return true;
    };

    return db.get(dbRequest, req.cookies.username, req.cookies.token, checkData);

}

module.exports = function(req, res, next) {
    if ( isInDatabase(req) ) {
        return next();
    }
    else {
        res.clearCookie("token");
        res.clearCookie("username");
        res.redirect('/');
    }
};
