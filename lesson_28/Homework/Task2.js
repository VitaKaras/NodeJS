var fs = require('fs')

fs.open('test.txt', 'r', (err, fd)=>{
    if (err){
        console.log("error")
    }
    else{
        buf = Buffer.alloc(10)
        fs.read(fd, buf, 0, 5, 10, (err, bytesRead)=>{
            console.log(buf.slice(0, bytesRead).toString());
        });
        fs.close(fd)
    }
})
