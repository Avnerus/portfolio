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


Popper.prototype.init = function() {    
    this.amit_seq = [];

    for (var i = 1; i <= 12; i++) {
        var texture = new PIXI.Texture.fromFrame("amit" + i + ".png");
        this.amit_seq.push(texture);
    }
}

Popper.prototype.pop = function() {
    console.log("Popper popping!");

    var popper = new PIXI.MovieClip(this.amit_seq); 
    popper.loop = true;
    popper.anchor.x = popper.anchor.y = 0.5;
    popper.position.x = MathUtil.rndRange(0, this.opts.stageWidth);
    popper.position.y = MathUtil.rndRange(0, this.opts.stageHeight);
    popper.gotoAndPlay(MathUtil.rndRange(0, 11));
    popper.animationSpeed = 0.02;
    this.stage.addChild(popper);

    this.pops.push(popper);
}

Popper.prototype.update = function() {
    /*for (var i = 0; i < this.pops.length; i++) {
        var pop = this.pops[i];
        pop.rotation += 0.1;
    }*/
}
