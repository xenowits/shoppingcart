var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var path = require('path')
var passport = require('passport')

var indexRouter = require('./routes/index');
var sellersRouter = require('./routes/seller');
var customersRouter = require('./routes/customer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(__dirname + 'uploads'));

//// connection to database section

mongoose.connect('mongodb://admin:admin123@ds119996.mlab.com:19996/shoppingcart',{ useNewUrlParser: true },)

// mongoose.connect('mongodb://localhost/pragyanhackathon1',{ useNewUrlParser: true })

mongoose.connection.once('open',function(){

console.log("Connection is established successfully")

}).on('error',function(error){

	console.log('Connection error',error)

})

//module.exports = mongoose.connection

//// connection to database done ok 200

/// models imported here

const Seller = require('./models/seller')
const Customer = require('./models/customer')
const OrderDetails = require('./models/orderdetails')
const Orders = require('./models/orders')
const Product = require('./models/product')

///

app.use('/', indexRouter);
app.use('/seller', sellersRouter);
app.use('/customer', customersRouter);

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
