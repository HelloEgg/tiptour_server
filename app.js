var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

app.set('views', path.join(dirname,'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); app
.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 
app.use(express.static(path.join(dirname,'public')));

app.use('/users', users);
app.use('/login', login);

app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env')== 'development'){
    app.use(function(err, req, res, next){

        res.status(err.status || 500);
        res.render('error', {message:err.message, error:err});
    });
}
app.use(function(err, req, res,next){
    res.status(err.status || 500);
    res.render('error', {message: err.message, error: {}});
});
module.exports = app;