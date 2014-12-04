"use strict"

module.exports = function() {
    return new Japan()
}

module.exports.Japan = Japan;

function Japan() {
    if (!(this instanceof Japan)) return new Japan()

    this.loaded = false;
    console.log("Japan work constructed");
}

Japan.prototype.init = function (opts, stage, clickHandler) {

    console.log("Japan work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Japan.prototype.loadSprite = function() {
    var self = this;


    var japan = new PIXI.Sprite.fromFrame("assets/works/japan.png");
    japan.anchor.x = 0.5;
    japan.anchor.y = 0.5;
    japan.position.x = 905;
    japan.position.y = 300;
    japan.scale = {x: 0.4, y: 0.4};

    japan.buttonMode = true;
    japan.setInteractive(true);

    japan.click = function(mouseData){
      console.log("Japan CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(japan);
}
Japan.prototype.update = function() {
    
}

Japan.prototype.getData = function() {
    return {
        name: "Japan",
        description: [
            {
                text: "Japan!",
                image: "images/works/japan1.jpg"

            }
        ]
    }
}

