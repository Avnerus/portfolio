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
                text: "", 
                vimeo: "https://player.vimeo.com/video/370821209?api=1&player_id=player_1"
            },
            {
                text: 'Telepresence robots can be a form of civic action against prejudice and fearmongering. I am using them to create physical cross-border, intergroup contact. They serve as the foundation of my academic work.',
                image: "images/works/hitodama_interact2.gif",
                imageBig: "images/works/hitodama_interact2.gif"
            },
            {
                text: '',
                image: "images/works/hitodama_control.gif",
                imageBig: "images/works/hitodama_control.gif"
            },
            {
                text: "I started protoyping at the Israeli Burning Man Festival, where I remotely danced with the festival participants from my desert control tent.",
                image: "images/works/playbots2.jpg",
                imageBig: "images/works/playbots2_big.jpg"
            },
            {
                text: "", 
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
                text: "The work on the Soft Telepresence \"HITODAMA\" wwas started in Kyushu university and finished as my MA thesis in Aalto university.",
                youtube: "https://www.youtube.com/embed/ouPlm0X_K5Y"
            },
            {
                youtube: "https://www.youtube.com/embed/fKkyfRtSTFA"
            },
            {
                youtube: "https://www.youtube.com/embed/nQ5kCrI5pfU"
            },
        ],
        links: [
            {
                url: "https://aaltodoc.aalto.fi/handle/123456789/41408",
                description: "MA Thesis at Aalto University: Soft Robotic Incarnation"
            },
            {
                url: "https://elinorsalomon.net/Screen-Reality-For-Dreams",
                description: "Screen Reality for Dreams"
            }
        ]
    }
}

