"use strict"
var fetch = require('node-fetch');

module.exports = function() {
    return new Money()
}

module.exports.Money = Money;

function Money() {
    if (!(this instanceof Money)) return new Money()

    this.loaded = false;
    console.log("money work constructed");
}

Money.prototype.init = function (opts, stage, container) {

    var self = this;

    console.log("Money work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "money";
    this.container = container;

}

Money.prototype.clicked = function () {

    var self = this;

    console.log("Update account balance!");
    fetch('https://dl.dropboxusercontent.com/s/qawpeqy0v44agrz/balance.json?dl=1')
    .then(function(res) {
        return res.json(); 
    })
    .then(function(json) {
        self.container.find('#money-balance').text(json.balance + " EUR");
    })
}

Money.prototype.update = function() {
    
}


Money.prototype.getData = function() {
    return {
        name: "Money",
        description: []
    }
}


