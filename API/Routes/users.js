/**
 * Created by ligles on 01/09/16.
 */
var express = require('express');
var router = express.Router();
var userService = require('../Services/userService');

router.get('/:id', function (req, res){
    res.send('je cherche un user id = ' + req.params.id);
});

router.post('/add',userService.save)



/*router.post('/', function (req, res){

   // userService.save(req,res);

       // res.send('je cherche un user id = ' + req.params.id);
});*/

module.exports = router;