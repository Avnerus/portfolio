"use strict"

module.exports = function() {
    return new Pulse()
}

module.exports.Pulse = Pulse;

function Pulse() {
    if (!(this instanceof Pulse)) return new Pulse()

    this.loaded = false;
    console.log("Pulse work constructed");
}

Pulse.prototype.init = function (opts, stage) {

    console.log("Pulse work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;

    this.sprite1 = PIXI.Sprite.fromFrame("assets/works/pulse.png");
    this.sprite1.position.x = this.opts.stageWidth / 2 + 200;
    this.sprite1.position.y = 100 
    this.sprite1.anchor.x = 0.5;
    this.sprite1.anchor.y = 0.5;
    this.sprite1.scale.y = 0.5;
    this.sprite1.scale.x = 0.5;
    this.sprite1.buttonMode = true;

    this.sprite2 = PIXI.Sprite.fromFrame("assets/works/pulse.png");
    this.sprite2.position.x = this.opts.stageWidth / 2 - 200;
    this.sprite2.position.y = 100 
    this.sprite2.anchor.x = 0.5;
    this.sprite2.anchor.y = 0.5;
    this.sprite2.scale.y = 0.5;
    this.sprite2.scale.x = 0.5;
    this.counter = 0;
    this.sprite2.buttonMode = true;


    this.sprite2.setInteractive(true);
    this.sprite1.setInteractive(true);

    this.sprite2.tint = 0xEECC55;

    this.sprite2.click = this.sprite1.click = function(mouseData){
       console.log("CLICK");
    }
    this.stage.addChild(this.sprite1);
    this.stage.addChild(this.sprite2);
    this.loaded = true;


    this.fly();
}


Pulse.prototype.fly = function() {
    var self = this;

    TweenMax.to(this.sprite1.position, 5, {repeat: -1, yoyo: true, x:(this.opts.stageWidth / 2 - 200), ease:Power0.easeInOut});
    TweenMax.to(this.sprite2.position, 5, {repeat: -1, yoyo: true, x:(this.opts.stageWidth / 2 + 200), ease:Power0.easeInOut});
}

Pulse.prototype.update = function () {
    if (this.loaded) {
        this.sprite1.rotation += 0.05;
        this.sprite2.rotation += 0.05;
    }
}

