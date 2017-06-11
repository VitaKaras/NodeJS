const http = require('http');
const port = process.env.port || 1337;
const server = http.createServer(function (request, response) {
    console.log(` ${request.method} ${request.url} `);
    if (request.url == '/test'){
        response.end(JSON.stringify({message: "Hello World!"}));

    }

})

server.listen(port, function () {
    var options = {
        port: port,
        host: 'localhost',
        path: '/test'
    }
    var callback = function (response) {
        // Записывать данные в body по мере поступления
        var body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // Данные полностью получены
            console.log(body);
        });
    }
    var req = http.request(options, callback);
    req.end();
})
console.log("server on port " + (port))