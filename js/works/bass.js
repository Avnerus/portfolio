"use strict"

module.exports = function() {
    return new Bass()
}

module.exports.Bass = Bass;

function Bass() {
    if (!(this instanceof Bass)) return new Bass()

    this.loaded = false;
    console.log("Bass work constructed");
}

Bass.prototype.init = function (opts, stage, clickHandler) {

    console.log("Bass work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Bass.prototype.loadSprite = function() {
    var self = this;


    var bass = new PIXI.Sprite.fromFrame("assets/works/bass.png");
    bass.anchor.x = 0.5;
    bass.anchor.y = 0.5;
    bass.position.x = 780;
    bass.position.y = 491;
    bass.rotation = MathUtil.toRadians(-43);

    bass.buttonMode = true;
    bass.setInteractive(true);

    bass.click = function(mouseData){
      console.log("Bass CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(bass);
}
Bass.prototype.update = function() {
    
}

Bass.prototype.getData = function() {
    return {
        name: "Bass",
        description:  [ 
            {
                text: "Bass project"
            }
        ]
    }
}

