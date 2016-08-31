/**
 * Created by ligles on 31/08/16.
 */
var app = require('express')();

// premiere route
app.get('/',function(req, res){
    res.send('Hello le monde');
});

//construction du server

var server = app.listen(3000, function () {
    var host = server.address().adress;
    host = (host === '::' ? 'localhost' : host);
    var port = server.address().port;

    console.log('server is listening at http://%s:%s', host,port);

})