var restify = require('restify'),
    fs = require('fs');
var bodyParser = require('body-parser');


var port = process.env.port || 1337;

// модуль для обработки запросов
var apiHandler = require('./api/api2');

// создание сервера
var server = restify.createServer({
    name: 'myApp'
});

server.use(bodyParser.urlencoded({extended: true}))
server.get('/users', apiHandler.get)
server.post('/users', apiHandler.post)
server.listen(port, console.log('app listening '+ port));

