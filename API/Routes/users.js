/**
 * Created by ligles on 01/09/16.
 */
var express = require('express');
var router = express.Router();
var userService = require('../Services/userService');



router.use(userService.VerifyToken);


router.get('/:id',userService.getById);


//router.post('/',userService.hello);
router.post('/',userService.save);
router.put('/',userService.put);




module.exports = router;