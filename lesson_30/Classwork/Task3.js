var express = require('express');
var app = express();
var url = require('url');
var path = require('path');
var port = process.env.port || 1337;
var bodyParser = require('body-parser');
app.get('/test', function (req, res) {
    console.log('get')
    res.sendFile(path.join(__dirname, '/index.html'))
});
app.use(bodyParser.urlencoded({extended: true}));


app.post('/test', function (req, res) {
    console.log(`POST req to '/test': ${req.body.data}`);
    res.send(req.body.data);
});
app.use(function (req, res, next) {
    res.send('<h1>Hello from Express</h1> ' + `${req.url} </br>` + `${req.method}`)
    next();

})


app.listen(port, function () {
    console.log('App listening on port ' + port);
});
