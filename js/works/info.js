"use strict"

module.exports = function() {
    return new Info()
}

module.exports.Info = Info;

function Info() {
    if (!(this instanceof Info)) return new Info()

    this.loaded = false;
    console.log("Info work constructed");
}

Info.prototype.init = function (opts, stage, clickHandler) {

    var self = this;

    console.log("Info work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.questionBlock = PIXI.Sprite.fromFrame("assets/works/question_block.png");
    this.questionBlock.position.x = 120
    this.questionBlock.position.y = 544 
    this.questionBlock.anchor.x = 0.5;
    this.questionBlock.anchor.y = 0.5;
    this.questionBlock.scale.x = 0.5;
    this.questionBlock.scale.y = 0.5;
    this.questionBlock.buttonMode = true;
    this.questionBlock.setInteractive(true);

    this.questionBlock.click = function(mouseData){
      console.log("INFO CLICK");
      self.eventEmitter.emit('info_clicked', self);
    }

    this.stage.addChild(this.questionBlock);

}


Info.prototype.update = function() {
    
}


Info.prototype.getData = function() {
    return {
        name: "Info",
        description: ""
    }
}


