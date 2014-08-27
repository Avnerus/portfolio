"use strict"

module.exports = function(stage, opts) {
    return new Popper(stage,opts)
}

module.exports.Popper = Popper;


function Popper(stage, opts) {
    if (!(this instanceof Popper)) return new Popper(stage, opts)

    this.eventEmitter = require('./event_manager').getEmitter();
    this.stage = stage;
    this.opts = opts;

    this.pops = [];

    console.log("Popper started", this.opts);

    var self = this;

    this.eventEmitter.on('video_ended', function() {
        self.pop();
    });
}


Popper.prototype.pop = function() {
    console.log("Popper popping!");

    var popper = new PIXI.Sprite(PIXI.Texture.fromFrame("assets/pops/amit.png")); 
    popper.anchor.x = popper.anchor.y = 0.5;
    popper.position.x = MathUtil.rndRange(0, this.opts.stageWidth);
    popper.position.y = MathUtil.rndRange(0, this.opts.stageHeight);
    this.stage.addChild(popper);

    this.pops.push(popper);
}

Popper.prototype.update = function() {
    for (var i = 0; i < this.pops.length; i++) {
        var pop = this.pops[i];
        pop.rotation += 0.1;
    }
}
