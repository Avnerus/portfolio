"use strict"

module.exports = function() {
    return new Cantenna()
}

module.exports.Cantenna = Cantenna;

function Cantenna() {
    if (!(this instanceof Cantenna)) return new Cantenna()

    this.loaded = false;
    console.log("Cantenna work constructed");
}

Cantenna.prototype.init = function (opts, stage, clickHandler) {

    console.log("Cantenna work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Cantenna.prototype.loadSprite = function() {
    var self = this;


    var tripod = new PIXI.Sprite.fromFrame("assets/works/tripod.png");
    tripod.anchor.x = 0.5;
    tripod.anchor.y = 0.5;
    tripod.position.x = 50;
    tripod.position.y = 355;
    tripod.rotation = MathUtil.toRadians(18);
    tripod.scale = {x: 0.3, y: 0.3};

    tripod.buttonMode = true;
    tripod.setInteractive(true);

    var can = new PIXI.Sprite.fromFrame("assets/works/can.png");
    can.anchor.x = 0.5;
    can.anchor.y = 0.5;
    can.position.x = 65;
    can.position.y = 285;
    can.rotation = MathUtil.toRadians(-115);
    can.scale = {x: 0.5, y: 0.5};

    can.buttonMode = true;
    can.setInteractive(true);

    TweenMax.to(can, 3, {ease: Linear.easeNone, repeat: -1, yoyo: true, rotation: MathUtil.toRadians(-90)});

    tripod.click  = can.click = function(mouseData){
      console.log("Cantenna CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(tripod);
    this.stage.addChild(can);
}
Cantenna.prototype.update = function() {
    
}

Cantenna.prototype.getData = function() {
    return {
        name: "Cantenna Mesh",
        description: ["This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "]
    }
}

