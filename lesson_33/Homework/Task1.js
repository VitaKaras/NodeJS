var express  = require('express');
var restify = require('restify');

var server = restify.createServer({
    name: 'myApp'
});

var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.port || 1337;

// модуль для обработки запросов
var apiHandler = require('./api/homeApi1');

// создание сервера

server.get('/', apiHandler.table)
server.listen(port, function () {
    console.log('Listening '+ port)

})

