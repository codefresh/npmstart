var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var routes = require('./routes/index');
var users = require('./routes/users');
var codesamples = require('./routes/codesamples');

var app = express();
var envs = require('./routes/envs')(app);
var nconf = require('nconf');

nconf.argv().env();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname ,'/public/assets/images/favicon.ico')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (nconf.get('prod'))
{
console.log("production mode");
app.use(express.static(path.join(__dirname, 'dist')));
}
else
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/codesamples', codesamples);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("error handler");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("the request was not handled");
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("the request was not handled");
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
