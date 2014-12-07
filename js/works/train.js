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

    var self = this;

    console.log("Train work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.train1 = PIXI.Sprite.fromFrame("assets/works/train.png");
    this.train1.buttonMode = true;
    this.train1.setInteractive(true);

    this.train1.anchor.x = 0.5;
    this.train1.anchor.y = 0.5;
    this.train1.scale.x = 0.7;
    this.train1.scale.y = 0.7;
    this.stage.addChild(this.train1);

    this.train2 = PIXI.Sprite.fromFrame("assets/works/train.png");
    this.train2.anchor.x = 0.5;
    this.train2.anchor.y = 0.5;
    this.train2.scale.x = 0.7;
    this.train2.scale.y = 0.7;
    this.train2.buttonMode = true;
    this.train2.setInteractive(true);

    this.train2.click = this.train1.click = function(mouseData){
      console.log("TRAIN CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(this.train2);

    this.run();
}


Train.prototype.update = function() {
    
}

Train.prototype.run = function() {
    var self = this;

    var trainSpeed = 150;

    this.train2.position.x = 0 - this.train1.width;
    this.train2.position.y = 632;
    this.train1.position.x = 0;
    this.train1.position.y = 632;
    this.train1.rotation = 0;
    this.train2.rotation = 0;

    var t1 = new TimelineMax();
    t1.to(this.train1.position, 780 / trainSpeed, {x: 780, ease: Linear.easeNone});
    t1.to(this.train1.position,1, {x: 868, y:540, ease: Linear.easeNone});
    t1.to(this.train1, 1 ,{ease: Power2.easeOut, rotation: MathUtil.toRadians(-55)} , "-=1");
    t1.to(this.train1.position , 7.5 , {ease: Linear.easeNone, bezier:{curviness:1.5, values:[{x:1010, y:425}, {x:1215, y:450}, {x: 1450, y: 900}]}});
    t1.to(this.train1, 6.8 ,{ease: Linear.easeNone, rotation: MathUtil.toRadians(128)} , "-=7.3");
    t1.to(this.train1.position,0.15, {x: 1500, y:0, ease: Linear.easeNone});


    var t2 = new TimelineMax({onComplete: function() {
        console.log("Timeline2 complete!!");
        self.run();
    }});
    t2.to(this.train2.position, 780 / trainSpeed, {x: 780 - this.train1.width, ease: Linear.easeNone});
    t2.to(this.train2.position, this.train1.width / trainSpeed, {x: 780, ease: Linear.easeNone}, "+=0.15");
    t2.to(this.train2.position,1, {x: 868, y:540, ease: Linear.easeNone});
    t2.to(this.train2, 1 ,{ease: Power2.easeOut, rotation: MathUtil.toRadians(-55)} , "-=1");
    t2.to(this.train2.position , 7.5 , {ease: Linear.easeNone, bezier:{curviness:1.5, values:[{x:1010, y:425}, {x:1215, y:450}, {x: 1450, y: 900}]}});
    t2.to(this.train2, 6.8 ,{ease: Linear.easeNone, rotation: MathUtil.toRadians(128)} , "-=7.3");


    t2.play();

    t1.play();


    //TweenMax.to(this.sprite1.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:750, y:200}, {x:650, y:300}, {x:550, y:100}, {x:650, y: 100}]}});

   // TweenMax.to(this.sprite1.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:750, y:200}, {x:650, y:300}, {x:550, y:100}, {x:650, y: 100}]}});
//    TweenMax.to(this.sprite2.position , 9, {ease: Linear.easeNone, repeat: -1, bezier:{curviness:1.5, values:[{x:550, y:200}, {x:650, y:300}, {x:750, y:100}, {x:650, y: 100}]}});
}

Train.prototype.getData = function() {
    return {
        name: "Railroad Island",
        description: [
            {
                text: "I railroad simulation mobile game, co-developed with two Austrlians, for a Tokyo based publisher. I have developed the train and railroad components using Unity game engine",
                image: "images/works/train1.jpg",
            }, 
            {
              image: "images/works/train2.png"
            }
        ],
        links: [
            {
                url: "https://play.google.com/store/apps/details?id=jp.colopl.entrain",
                description: "Google Play Store"
            },
            {
                url: "https://itunes.apple.com/us/app/railroad-island!/id647758295?mt=8",
                description: "iTunes App Store"
            }
        ]
    }
}

