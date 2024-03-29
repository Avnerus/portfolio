"use strict"

module.exports = function() {
    return new Peace()
}

module.exports.Peace = Peace;

function Peace() {
    if (!(this instanceof Peace)) return new Peace()

    this.loaded = false;
    console.log("Peace work constructed");
}

Peace.prototype.init = function (opts, stage, clickHandler) {

    console.log("Peace work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "peace";

    this.loadSprite();
}


Peace.prototype.loadSprite = function() {
    var self = this;


    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, 0xFFFFFF);
    graphics.moveTo(905, 0);
    graphics.lineTo(905, 145);
    graphics.endFill();
   
    this.stage.addChild(graphics);

    var dove = new PIXI.Sprite.fromFrame("assets/works/dove.png");
    dove.anchor.x = 0.5;
    dove.anchor.y = 0.5;
    dove.position.x =  905;
    dove.position.y = 125;
    dove.scale = {x: 0.8, y: 0.8};

    dove.buttonMode = true;
    dove.setInteractive(true);

    TweenMax.to(dove.position , 2, {ease: Linear.easeNone, repeat: -1, yoyo: true, y: 100});
    TweenMax.to(graphics.position , 2, {ease: Linear.easeNone, repeat: -1, yoyo: true, y: -20});
    
    dove.click  = function(mouseData){
      console.log("Peace CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(dove);
}
Peace.prototype.update = function() {
    
}

Peace.prototype.getData = function() {
    return {
        name: "The Conflict",
        description:  [ 
            {
                text: 'In 2012 I attened the "Vacation from War" seminar for Israelis and Palestinians that took place in Walberberg, Germany. Ever since, I try to give as much as I can for the resolution of our conflict. I believe this should be the main concern in Israel, and solved before anything else.',
                image: "images/works/peace1.jpg",
                imageBig: "images/works/peace1_big.jpg"
            },
            {
                text: "In Aalto University I am trying to use my knowledge in science and technology to do something meaningful for my home country.", 
                vimeo: "https://player.vimeo.com/video/370821209?api=1&player_id=player_1"
            },
            {
                image: "images/works/peace2.jpg",
                imageBig: "images/works/peace2_big.jpg"
            },
            {
                image: "images/works/peace3.jpg",
                imageBig: "images/works/peace3_big.jpg"
            },
            {
                image: "images/works/peace4.jpg",
                imageBig: "images/works/peace4_big.jpg"
            }
        ],
        links: []
    }
}

