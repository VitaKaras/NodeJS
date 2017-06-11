var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');

var port = process.env.port || 1337;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
var namespace = io.of('/namespace');

// подключение к именному пространству socket.io
namespace.on('connection', function (socket) {

    // генерация события greet
    namespace.emit('Message', {text: 'Hello from namespace!'});
    socket.on('reseiv', function (data) {
        console.log('mes: ' + data.mes)
    });


})

server.listen(port, function () {
    console.log('app running on port ' + port);
})


