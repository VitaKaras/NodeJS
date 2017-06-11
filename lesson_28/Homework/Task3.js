var fs = require('fs');

var readerStr = fs.createReadStream('test.txt', {start: 10, end:20})

readerStr.setEncoding('utf-8');

readerStr.on('data', function (readedData) {
    var readData  = readedData

    console.log(readData)
    
    var writeStr = fs.createWriteStream('output.txt')
    writeStr.write(readData, 'utf-8');
    writeStr.end();
})
