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
        name: "Drone Pigeon (WIP)",
        description:  [ 
            {
                text: "Will UAV's (Drones) ever become such an integral part of our life, that we'll be feeding them in the city square like pigeons? Recently I've been thinking about this concept for an installation.",
                image: "images/works/pigeon.png"
            }
        ],
        links: []
    }
}

