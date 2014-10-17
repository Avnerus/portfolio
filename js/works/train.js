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

    this.train1 = PIXI.Sprite.fromFrame("assets/works/train.png");
    this.train1.position.x = 0;
    this.train1.position.y = 632;
    this.train1.anchor.x = 0.5;
    this.train1.anchor.y = 0.5;
    this.train1.scale.x = 0.7;
    this.train1.scale.y = 0.7;
    this.stage.addChild(this.train1);

    this.train2 = PIXI.Sprite.fromFrame("assets/works/train.png");
    this.train2.position.x = 0 - this.train1.width;
    this.train2.position.y = 632;
    this.train2.anchor.x = 0.5;
    this.train2.anchor.y = 0.5;
    this.train2.scale.x = 0.7;
    this.train2.scale.y = 0.7;
    this.stage.addChild(this.train2);

    this.run();
}


Train.prototype.update = function() {
    
}

Train.prototype.run = function() {
    var self = this;

    var trainSpeed = 230;

    var t1 = new TimelineMax({repeat: -1});
    t1.to(this.train1.position, 780 / trainSpeed, {x: 780, ease: Linear.easeNone});
    t1.to(this.train1.position,1, {x: 868, y:540, ease: Linear.easeNone});
    t1.to(this.train1, 1 ,{ease: Power2.easeOut, rotation: MathUtil.toRadians(-55)} , "-=1");
    t1.to(this.train1.position , 7.5 , {ease: Linear.easeNone, bezier:{curviness:1.5, values:[{x:1010, y:425}, {x:1215, y:450}, {x: 1450, y: 900}]}});
    t1.to(this.train1, 6.8 ,{ease: Linear.easeNone, rotation: MathUtil.toRadians(128)} , "-=7.3");
    //t1.to(this.train1.position,2, {x: 1370, y:560, ease: Power2.easeIn});
   // t1.to(this.train1, 2 ,{ease: Power2.easeOut, rotation: MathUtil.toRadians(45)} , "-=1.5");
   /* t1.to(this.train1.position , 2 , {ease: Linear.easeNone, bezier:{curviness:1.5, values:[{x:1100, y:400}]}});
    /*t1.to(this.train1, 0.75 ,{ease: Power2.easeIn, rotation: MathUtil.toRadians(0)} , "-=2");

    /*var t2 = new TimelineMax({repeat: -1});
    t2.to(this.train2.position, (780 + this.train1.width) / trainSpeed, {x: 780, ease: Linear.easeNone});
    t2.to(this.train2.position , 3, {ease: Linear.easeNone, bezier:{curviness:0.5, values:[{x:900, y:500}, {x:930, y:470}]}});
    t2.to(this.train2, 3,{ease: Power2.easeOut, rotation: MathUtil.toRadians(-40)} , "-=3");

    t2.play();*/

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

