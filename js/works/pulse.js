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

Pulse.prototype.init = function (opts, stage, clickHandler) {

    console.log("Pulse work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;

    this.sprite1 = PIXI.Sprite.fromFrame("assets/works/pulse.png");
    this.sprite1.position.x = 650;
    this.sprite1.position.y = 100
    this.sprite1.anchor.x = 0.5;
    this.sprite1.anchor.y = 0.5;
    this.sprite1.scale.y = 0.5;
    this.sprite1.scale.x = 0.5;
    this.sprite1.buttonMode = true;

    this.sprite2 = PIXI.Sprite.fromFrame("assets/works/pulse.png");
    this.sprite2.position.x = 650
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
    this.eventEmitter = require('../event_manager').getEmitter();

    var self = this;

    this.sprite2.click = this.sprite1.click = function(mouseData){
      console.log("PULSE CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }
    this.stage.addChild(this.sprite1);
    this.stage.addChild(this.sprite2);
    this.loaded = true;


    this.fly();
}


Pulse.prototype.fly = function() {
    var self = this;

//    TweenMax.to(this.sprite1.position, 20, {repeat: -1, yoyo: true, x:(this.opts.stageWidth + this.sprite1.width), ease:Power0.easeInOut});
  //  TweenMax.to(this.sprite2.position, 20, {repeat: -1, yoyo: true, x:(-this.sprite2.width), ease:Power0.easeInOut});
    TweenMax.to(this.sprite1.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:750, y:200}, {x:650, y:300}, {x:550, y:100}, {x:650, y: 100}]}});
    TweenMax.to(this.sprite2.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:550, y:200}, {x:650, y:300}, {x:750, y:100}, {x:650, y: 100}]}});
//TweenMax.to([div1,div2,div3], 2, {bezier:{curviness:1.5, values:[{x:100, y:100}, {x:0, y:200}, {x:-100, y:100}, {x:0, y:0}]}
}

Pulse.prototype.update = function () {
    if (this.loaded) {
        this.sprite1.rotation += 0.05;
        this.sprite2.rotation += 0.05;
    }
}

Pulse.prototype.getData = function() {
    return {
        name: "The Pulse Project",
        description: "This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "
    }
}

