"use strict"

module.exports = function() {
    return new Playbot()
}

module.exports.Playbot = Playbot;

function Playbot() {
    if (!(this instanceof Playbot)) return new Playbot()

    this.loaded = false;
    console.log("Playbot work constructed");
}

Playbot.prototype.init = function (opts, stage, clickHandler) {

    console.log("Playbot work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "playbot";

    this.loadSprite();
}


Playbot.prototype.loadSprite = function() {
    var self = this;


    var playbot = new PIXI.Sprite.fromFrame("assets/works/playbot.png");
    playbot.anchor.x = 0.5;
    playbot.anchor.y = 0.5;
    playbot.position.x = 210;
//    playbot.position.x = 1090;
//    playbot.position.y = 205;
    playbot.position.y = 200;
    playbot.scale = {x: 0.8, y: 0.8};

    playbot.buttonMode = true;
    playbot.setInteractive(true);

    playbot.click  = function(mouseData){
      console.log("Playbot CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(playbot);
}
Playbot.prototype.update = function() {
    
}

Playbot.prototype.getData = function() {
    return {
        name: "Separation Wall-E (WIP)",
        description:  [ 
            {
                text: "Recently I've been thinking about ways to connect Israelis and Palestinians. I came up with a design for a robot that can be placed in the public space, and connect to our neighbors beyond the wall (3D Figures by Noa Simhoni). The robot will have a 'flexible' identiy, automatic translation and an option for arcade gameplay.",
                image: "images/works/playbots.png",
                imageBig: "images/works/playbots_big.png"
            },
            {
                text: "I've started protoyping using the Raspberry Pi2",
                image: "images/works/playbots2.jpg",
                imageBig: "images/works/playbots2_big.jpg"
            },
            {
                image: "images/works/playbots3.jpg",
                imageBig: "images/works/playbots3_big.jpg"
            }
        ],
        links: [
        ]
    }
}

