var express = require('express');
var router = express.Router();
var viewController =  require('../controllers/views');
var restController = require('../controllers/rest');

/**
 * View Router
 */
router.get('/register', function(req, res, next){
  viewController.register(req, res);
});

router.get('/user-list', function (req, res, next) {
  viewController.userList(req, res, next);
});

router.get('/login', function(req, res, next) {
  viewController.login(req, res, next);
});


/**
 * REST APIs Router
 */
router.post('/register', function(req, res, next){
  restController.register(req, res, next);
});

router.post('/userList', function (req, res, next) {
  restController.userList(req, res, next);
});

router.post('/login', function(req, res, next){
  restController.login(req, res, next);
});

module.exports = router;
