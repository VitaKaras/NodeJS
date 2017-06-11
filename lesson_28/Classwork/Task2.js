const myBuf = Buffer.alloc(100)
var arr = [];

for (i=0;i<100;i++){
    arr.push([i])
}

myBuf.write(arr.toString(),0 , myBuf.length)
    console.log(myBuf)
