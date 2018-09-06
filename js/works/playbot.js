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

    this.hashURL = "telerobots";

    this.loadSprite();
}


Playbot.prototype.loadSprite = function() {
    var self = this;


    var playbot = new PIXI.Sprite.fromFrame("assets/works/playbot.png");
    playbot.anchor.x = 0.5;
    playbot.anchor.y = 0.5;
    playbot.position.x = 190;
//    playbot.position.x = 1090;
//    playbot.position.y = 205;
    playbot.position.y = 260;
    playbot.scale = {x: 0.5, y: 0.5};

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
        name: "Telepresence Robots",
        description:  [ 
            {
                text: 'Telepresence robots, or "Re-Embodiments" can be a form of civic action against prejudice and fearmongering. I am using them to create physical cross-border encounters. They serve as the foundation of my thesis work.',
                image: "images/works/playbots2.jpg",
                imageBig: "images/works/playbots2_big.jpg"
            },
            {
                text: "I started protoyping at the Israeli Burning Man Festival, where I remotely danced with the festival participants from my desert control tent.",
                image: "images/works/playbots4.jpg",
                imageBig: "images/works/playbots4_big.jpg"
            },
            {
                text: 'At the "Screen Reality for Dreams" festival I gave some life counselling through the telerobot.',
                image: "images/works/playbots5.jpg",
                imageBig: "images/works/playbots5_big.png"
            },
            {
                text: "In Aalto University I experimented with puppeteering a (Muslim) Nao robot using the Kinect Depth Sensor.",
                image: "images/works/nao_kafia.jpg",
                imageBig: "images/works/nao_kafia_big.jpg"
            },
            {
                youtube: "https://www.youtube.com/embed/3aWOL2dsPxY"
            },
            {
                text: "In Kyushu university I started working on my Soft Telepresence, Hitodama; soon to be presented in my final thesis.",
                youtube: "https://www.youtube.com/embed/fKkyfRtSTFA"
            },
            {
                text: "This is a concept drawing for an Israel-Gaza remote beach playbot (Drawing by Noa Simhoni).",
                image: "images/works/playbots.png",
                imageBig: "images/works/playbots_big.png"
            }
        ],
        links: [
            {
                url: "https://elinorsalomon.net/Screen-Reality-For-Dreams",
                description: "Screen Reality for Dreams"
            },

        ]
    }
}

