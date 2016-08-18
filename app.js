var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var userModelMongoDB = require('./app_server/models/mongoDB/user');
var userModelMysql = require('./app_server/models/mysql/user');

var mysqlTables = require('./app_server/models/mysqlTables');
var mysqlSPs = require('./app_server/models/mysqlSPs');
var mysqlViews = require('./app_server/models/mysqlViews');

var mongoRoutes = require('./app_server/routes/mongoRouter');
var mysqlRoutes = require('./app_server/routes/mysqlRouter');
var spMysqlRoutes = require('./app_server/routes/spMysqlRouter');
var spMongoRoutes = require('./app_server/routes/spMongoRouter');

var setupMongoDB = require('./app_server/util/setupMongoDB');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mongo', mongoRoutes);
app.use('/mysql', mysqlRoutes);
app.use('/sp/mysql', spMysqlRoutes);
app.use('/sp/mongo', spMongoRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 * It creates Admin profile at startup, if it does'nt 
 * exists.
 */
(function setupMongoDB(){
  var admin = {
    firstName: 'Arpit',
    lastName: 'Goyal',
    username: 'admin',
    password: 'admin',
  };
  userModelMongoDB.find({username: 'admin'}, function(err, result){
    if(result.length == 0){
      userModelMongoDB.create(admin, function(err){
        if(err) throw err;
        console.log('Admin Account Created!')
      });
    }else return;
  });
})();

/**
 * Creates mysql tables (users, company, country).
 */
(function(){
  for(var key in mysqlTables){
    userModelMysql.query(mysqlTables[key]
      , function(err){
        if(err) throw err;
        console.log(key + ' table created!');
      });
  }
})();

/**
 * Creates mysql procedures
 */
(function(){
  for(var key in mysqlSPs){
    userModelMysql.query(mysqlSPs[key]
        , function(err){
          if(err) throw err;
          console.log(key + ' SP created!');
        });
  }
})();

/**
 * Creates mysql views (user_login_view)
 */
(function(){
  for(var key in mysqlViews){
    userModelMysql.query(mysqlViews[key]
        , function(err){
          if(err) throw err;
          console.log(key + ' view created!');
        });
  }
})();

setupMongoDB();

module.exports = app;
