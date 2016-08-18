/**
 * Created by arpit on 17/8/16.
 */

var express = require('express');
var router = express.Router();
var restController = require('../controllers/spMysqlRest');
var viewController = require('../controllers/spViews');


router.post('/loginWithSP', restController.loginWithSP);
router.post('/createUserWithSP', restController.createUserWithSP);
router.post('/allUserWithFilter', restController.allUsersWithFilter);
router.post('/allCompaniesAndCountries', restController.getAllCompaniesAndCountries);

router.get('/loginWithSP', viewController.loginWithSP);
router.get('/createUserWithSP', viewController.createUserWithSP);
router.get('/allUserWithFilter', viewController.allUserWithFilter);

module.exports = router;