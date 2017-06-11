var events = require('events');
var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();
event.on("myEvent", function () {
    console.log("Event emitted");
});

event.emit("myEvent");