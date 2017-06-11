var fs = require('fs');

fs.writeFile('test.txt', process.argv[2] , function () {
    return true
})