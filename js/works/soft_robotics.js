"use strict"

module.exports = function() {
    return new SoftRobotics()
}

module.exports.SoftRobotics = SoftRobotics;

function SoftRobotics() {
    if (!(this instanceof SoftRobotics)) return new SoftRobotics()

    this.loaded = false;
    console.log("SoftRobotics work constructed");
}

SoftRobotics.prototype.init = function (opts, stage, clickHandler) {

    console.log("SoftRobotics work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "soft-robotics";

    this.loadSprite();
}


SoftRobotics.prototype.loadSprite = function() {
    var self = this;


    var handle= new PIXI.Sprite.fromFrame("assets/works/soft_robotics_2.png");
    handle.anchor.x = 0.5;
    handle.anchor.y = 0.5;
    handle.position.x = 284;
    handle.position.y = 554;
    handle.scale = {x: 0.3, y: 0.3};

    var pump = new PIXI.Sprite.fromFrame("assets/works/soft_robotics_1.png");
    pump.anchor.x = 0.5;
    pump.anchor.y = 0.5;
    pump.position.x = 351;
    pump.position.y = 564;
    pump.scale = {x: 0.3, y: 0.3};

    pump.buttonMode = true;
    pump.setInteractive(true);

    pump.click  = function(mouseData){
      console.log("SoftRobotics CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    var actuator = new PIXI.Sprite.fromFrame("assets/works/soft_robotics_3.png");
    actuator.anchor.x = 0.5;
    actuator.anchor.y = 0.5;
    actuator.position.x = 355;
    actuator.position.y = -23;
    actuator.scale = {x: 1, y: 1};

    this.stage.addChild(handle);
    this.stage.addChild(pump);
    pump.addChild(actuator);

    TweenMax.to(handle.position , 2, {ease: Power2.easeIn, repeat: -1, yoyo: true, x: 291});
    TweenMax.to(actuator.scale , 2, {ease: Power4.easeIn, repeat: -1, yoyo: true, x: 1.1, y: 1.1});

        /*
    this.opts.util.localize("Handle", handle);
    this.opts.util.localize("pump", pump);
    this.opts.util.localize("actuator", actuator); */

}
SoftRobotics.prototype.update = function() {
}

SoftRobotics.prototype.getData = function() {
    return {
        name: "Soft Robotics",
        description:  [ 
            {
                text: "In Tel Aviv university's \"Consciousness Studies\" course, we tried to solve 'the hard problem of consciousness'. In the picture: \"Mary's Room\" - a famous thought experiment by Frank Jacskson (1982).",
                image: "images/works/brain1.jpg",
            }
        ],
        links: [
            {
                url: "http://socialbonds.org",
                description: "Social Bonds website"
            },

        ]
    }
}

