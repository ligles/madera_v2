/**
 * Created by ligles on 01/09/16.
 */
var express = require('express');
var router = express.Router();
var databaseService = require('../Services/databaseService');



router.get('/init', databaseService.init );
router.get('/drop', databaseService.drop );



module.exports = router;