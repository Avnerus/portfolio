"use strict"

module.exports = function() {
    return new Biology()
}

module.exports.Biology = Biology;

function Biology() {
    if (!(this instanceof Biology)) return new Biology()

    this.loaded = false;
    console.log("Biology work constructed");
}

Biology.prototype.init = function (opts, stage, clickHandler) {

    console.log("Biology work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "biology";

    this.loadSprite();
}


Biology.prototype.loadSprite = function() {
    var self = this;


    var biology = new PIXI.Sprite.fromFrame("assets/works/biology.png");
    biology.anchor.x = 0.5;
    biology.anchor.y = 0.5;
    biology.position.x = 1140;
    biology.position.y = 330;
    biology.scale = {x: 0.5, y: 0.5};

    biology.buttonMode = true;
    biology.setInteractive(true);

    biology.click = function(mouseData){
      console.log("Biology CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    var bacteria = new PIXI.Sprite.fromFrame("assets/works/bacteria.png");
    bacteria.anchor.x = 0.5;
    bacteria.anchor.y = 0.5;
    bacteria.position.x = 20;
    bacteria.position.y = 40;
    bacteria.scale = {x: 0.75, y: 0.75};


    TweenMax.to(bacteria.scale, 1, {ease: Linear.easeNone, repeat: -1, yoyo: true, x: 1, y: 0.5});

    biology.addChild(bacteria);
    this.stage.addChild(biology);
}
Biology.prototype.update = function() {
    
}

Biology.prototype.getData = function() {
    return {
        name: "Biology - Cell Signal Simulation",
        description:  [ 
            {
                text: "For my final project in my biology B.Sc studies, I worked with Prof. Eshel Ben Jacob and Dr. Assaf Zaritsky to build a cell signaling simulation for cancer cells during wound healing.",
                image: "images/works/biology1.jpg",
                imageBig: "images/works/biology1_big.jpg"
            }
        ],
        links: []
    }
}

