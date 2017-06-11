var http = require('http');
var fs = require('fs');
const port = process.env.port || 1337;
var count = 0;

const server = http.createServer(function (req, resp) {
    count+=1;
    fs.writeFile(`${count}`, `${req.rawHeaders}`)
    console.log('file created')
}).listen(port, function () {
    console.log('Server started on '+ port)
})
