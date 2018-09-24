"use strict"

module.exports = function() {
    return new Drone()
}

module.exports.Drone = Drone;

function Drone() {
    if (!(this instanceof Drone)) return new Drone()

    this.loaded = false;
    console.log("Drone work constructed");
}

Drone.prototype.init = function (opts, stage, clickHandler) {

    console.log("Drone work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "drone";

    this.loadSprite();
}


Drone.prototype.loadSprite = function() {
    var self = this;

    var drone = new PIXI.Sprite.fromFrame("assets/works/drone.png");
    drone.anchor.x = 0.5;
    drone.anchor.y = 0.5;
    drone.position.x = 1380;
    drone.position.y = 80;
    drone.scale = {x: 0.8, y: 0.8};

    drone.buttonMode = true;
    drone.setInteractive(true);

    TweenMax.to(drone.position , 15 , {ease: Linear.easeNone, repeat: -1, x: -100});
    
    drone.click  = function(mouseData){
      console.log("Drone CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(drone);
}
Drone.prototype.update = function() {
    
}

Drone.prototype.getData = function() {
    return {
        name: "Democratic Drone (Speculative Design)",
        description:  [ 
            {
                text: "How would war look like in a technolog based direct democracy system? Can the citizens be collectively and individually accountable for drone strikes? This democratic drone is fully automatic. It is connected to an online voting system where the citizens get to read about the target and the risks of collateral damage, so they can decide whether to launch the attack or not. As an added bonus, the target gets to see the results in real time.",
                image: "images/works/democratic_drone.png"
            }
        ],
        links: []
    }
}

