/**
 * Created by ligles on 01/09/16.
 */
var express = require('express');
var router = express.Router();
var userService = require('../Services/userService');
var clientService = require('../Services/clientService')


router.use(userService.VerifyToken);


router.get('/:id',clientService.getById);

router.post('/',clientService.save);
router.put('/',clientService.put);




module.exports = router;