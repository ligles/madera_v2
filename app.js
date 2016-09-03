/**
 * Created by ligles on 31/08/16.
 */
var app = require('express')(),

    root_path = './API',
    morgan = require('morgan'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// premiere route identification non restreinte
app.use('/api/authenticate',require('./API/Routes/authenticate'));

app.all('/*',require('./API/Routes/users'));


//user route
app.use('/api/user',require('./API/Routes/users'));
//client route
app.use('/api/client',require('./API/Routes/clients'));

//database route
app.use('/api/database', require('./API/Routes/database'))

app.get('/api',function(req, res){

    res.send('Coucou api');
});










//construction du server
var server = app.listen(3000, function () {
    var host = server.address().adress;
    host = (host === '::' ? 'localhost' : host);
    var port = server.address().port;
   // if(error) throw err;
    console.log('server is listening at http://%s:%s', host,port);

})