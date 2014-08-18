"use strict"

var events = require('events');
var eventEmitter = new events.EventEmitter();
console.log('Events init');

module.exports.getEmitter = function() {
    return eventEmitter;
}

