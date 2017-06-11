var express = require('express');
var app = express();
var url = require('url')
var port = process.env.port || 1337;
app.use(function (req, res) {
    res.send('<h1>Hello from Express</h1> '+ `${req.url} </br>`+ `${req.method}`)

})
app.listen(port, function () {
    console.log('App listening on port ' + port);
});
