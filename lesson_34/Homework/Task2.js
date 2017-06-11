var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');

var port = process.env.port || 1337;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index2.html'));
});
io.on('connection', function (socket) {
    socket.on('send_message', function (data) {

        console.log(data.text)
        io.sockets.emit('chat message', {text: data.text});
    })
})
server.listen(port, function () {
    console.log('app running on port ' + port);
})