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
                text: "After facing the harsh reality of over-heating robots and uncanny movement, I discovered the world of Soft. My first serious involvement with the field was the Soft Robotics workshop I organized in Aalto University with my colleague Kilian Kottmeier",
                vimeo: "https://player.vimeo.com/video/210919628?api=1&player_id=player_1"
            },
            {
                text: "During a semester in Japan in 2017 I was able to meet the pioneers of Soft Robotics and research the uses for Telepresence.",
                youtube: "https://www.youtube.com/embed/Am_UXkqsaZ8"
            },
            {
                text: "My Master's thesis in Aalto university focused on the fabircation of a soft robotic arm for my telepresence robot, Hitodama",
                youtube: "https://www.youtube.com/embed/EGhW1B1sjnU"
            },
            {
                youtube: "https://www.youtube.com/embed/ouPlm0X_K5Y"
            }
        ],
        links: [
            {
                url: "https://www.youtube.com/playlist?list=PL530jd0zZ9Epp9r5ZpmqXw8wshI9edvJq",
                description: "My Soft Robotics Youtube channel"
            },

            {
                url: "https://cloud.avner.us/index.php/s/cj1eDoS8bRHMFFc",
                description: "Paper - Soft Robotics for Telepresence and Human Interaction"
            },

            {
                url: "http://wiki.avner.us/doku.php?id=soft-robotics:start",
                description: "My Soft Robotics Wiki"
            },
            {
                url: "https://chat.avner.us/channel/soft-robotics",
                description: "My Soft Robotics Chat Server"
            },
        ]
    }
}

