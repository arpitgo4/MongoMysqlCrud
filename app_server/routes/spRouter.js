/**
 * Created by arpit on 17/8/16.
 */

var express = require('express');
var router = express.Router();
var restController = require('../controllers/spRest');


router.post('/loginWithSP', restController.loginWithSP);
router.post('/createUserWithSP', restController.createUserWithSP);
router.post('/allUserWithFilter', restController.allUsersWithFilter);


module.exports = router;