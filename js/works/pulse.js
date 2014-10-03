"use strict"

module.exports = function() {
    return new BrainController()
}

module.exports.BrainController = BrainController;

var TWEEN = require('tween.js');

function BrainController() {
    if (!(this instanceof BrainController)) return new BrainController(videoController)

    this.videoController = videoController;

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (opts) {

    console.log("Brain Controller initializing with opts", opts);
}

BrainController.prototype.update = function () {
    if (this.loaded) {

    }
}

