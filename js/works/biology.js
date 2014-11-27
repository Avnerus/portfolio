"use strict"

module.exports = function() {
    return new Biology()
}

module.exports.Biology = Biology;

function Biology() {
    if (!(this instanceof Biology)) return new Biology()

    this.loaded = false;
    console.log("Biology work constructed");
}

Biology.prototype.init = function (opts, stage, clickHandler) {

    console.log("Biology work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Biology.prototype.loadSprite = function() {
    var self = this;


    var biology = new PIXI.Sprite.fromFrame("assets/works/biology.png");
    biology.anchor.x = 0.5;
    biology.anchor.y = 0.5;
    biology.position.x = 1140;
    biology.position.y = 330;
    biology.scale = {x: 0.5, y: 0.5};

    biology.buttonMode = true;
    biology.setInteractive(true);

    biology.click = function(mouseData){
      console.log("Biology CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(biology);
}
Biology.prototype.update = function() {
    
}

Biology.prototype.getData = function() {
    return {
        name: "Biology",
        description: ["This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "]
    }
}

