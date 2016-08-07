var express = require('express');
var router = express.Router();
var viewController =  require('../controllers/views');
var restController = require('../controllers/rest');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/register', function(req, res, next){
  viewController.register(req, res);
});

router.post('/register', function(req, res, next){
  restController.register(req, res, next);
});

module.exports = router;
