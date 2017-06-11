var events = require('events');
var timer = require('timers');

const EvEmitter = new events.EventEmitter;
var i = 0
EvEmitter.on('error', (err)=>{
    console.log(err)
});

EvEmitter.on('tick', ()=> {
    console.log(i++);
})
var myTimer = timer.setInterval
myTimer(()=>{
    EvEmitter.emit('tick')
}, 1000)