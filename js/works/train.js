"use strict"

module.exports = function() {
    return new Train()
}

module.exports.Train = Train;

function Train() {
    if (!(this instanceof Train)) return new Train()

    this.loaded = false;
    console.log("Train work constructed");
}

Train.prototype.init = function (opts, stage, clickHandler) {

    console.log("Train work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.train = PIXI.Sprite.fromFrame("assets/works/train.png");
    this.train.position.x = 0;
    this.train.position.y = 632;
    this.train.anchor.x = 0.5;
    this.train.anchor.y = 0.5;
    this.train.scale.x = 0.75;
    this.train.scale.y = 0.75;
    this.stage.addChild(this.train);

    this.run();
}


Train.prototype.update = function() {
    
}

Train.prototype.run = function() {
    var self = this;

    var t1 = new TimelineMax({repeat: -1});
    t1.to(this.train.position, 5, {x: 600, ease: Linear.easeNone});
    t1.play();


    //TweenMax.to(this.sprite1.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:750, y:200}, {x:650, y:300}, {x:550, y:100}, {x:650, y: 100}]}});

   // TweenMax.to(this.sprite1.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:750, y:200}, {x:650, y:300}, {x:550, y:100}, {x:650, y: 100}]}});
//    TweenMax.to(this.sprite2.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:550, y:200}, {x:650, y:300}, {x:750, y:100}, {x:650, y: 100}]}});
}

Train.prototype.getData = function() {
    return {
        name: "Train",
        description: "This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "
    }
}

