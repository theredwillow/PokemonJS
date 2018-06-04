var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var mongo = require('mongodb').MongoClient;
var io = require('socket.io').listen(4000);

global.mongoURL = "mongodb://127.0.0.1";

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');

var login = require('./middleware/login');
var logout = require('./middleware/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/socket');

app.use('/', indexRouter);
app.use('/game', gameRouter);

app.post('/login', login);
app.post('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
