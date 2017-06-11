var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var path = require('path')
var port = process.env.port || 1337;

var users = [
    { name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
    { name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, {name: 'Jack', age: 26}
]

app.get('/users/:id', function (req, res) {
    res.send(`name: ${users[req.params.id].name} age: ${users[req.params.id].age}`)

})
app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))

})
app.use(function(err, req, res, next) {
    res.status(500).send('Ooops...Something went wrong!');
    next(err.message);
});

app.listen(port, function () {
    console.log("listening on " + port)
})
