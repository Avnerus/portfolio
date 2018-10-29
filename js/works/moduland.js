"use strict"

module.exports = function() {
    return new Moduland()
}

module.exports.Moduland = Moduland;

function Moduland() {
    if (!(this instanceof Moduland)) return new Moduland()

    this.loaded = false;
    console.log("Moduland work constructed");
}

Moduland.prototype.init = function (opts, stage, clickHandler) {

    console.log("Moduland work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "moduland";

    this.loadSprite();
}


Moduland.prototype.loadSprite = function(name, frames, skip) {
    var moduland = new PIXI.Sprite.fromFrame("assets/works/moduland.png");
    var self = this;

    moduland.anchor.x = 0.5;
    moduland.anchor.y = 0.5;
    moduland.position.x = 464;
    moduland.position.y = 437;
    moduland.scale = {x: 0.4, y: 0.4};

    moduland.buttonMode = true;
    moduland.setInteractive(true);

    moduland.click  = function(mouseData){
      console.log("Moduland CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(moduland);

    //this.opts.util.localize("Moduland", fountain);
}
Moduland.prototype.update = function() {
    
}

Moduland.prototype.getData = function() {
    return {
        name: "Moduland",
        description:[ 
            {
                text: "MODULAND is an interactive project created at the MIT Media Lab Berlin – Signal & Noise prototyping workshop, within the track “Playful Machines that Make Music.",
                youtube: "https://www.youtube.com/embed/DhF9PZqpKBY"
            },
            {
                text: "With MODULAND, playgrounds become modular synthesizers to raise curiosity, exploration, and connection to electronic music making. By creating playful machines that use LEGO bricks, sensors, and microcontrollers, it creates an embodied and interactive music lesson in an urban space.",
                vimeo: "https://player.vimeo.com/video/285793556?api=1&player_id=player_1"
            }
        ],
        links: [
            {
                url: "https://medialabmoduland.wordpress.com",
                description: "Official website"
            }
        ]
    }
}

