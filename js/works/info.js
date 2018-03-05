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

    this.updateMoney();

    this.questionBlock.click = function(mouseData){
          self.eventEmitter.emit('info_clicked', self);
          self.updateMoney();
    }

    TweenMax.to(this.questionBlock.position , 1, {ease: Power2.easeIn, repeat: -1, yoyo: true, y: 504});

    this.hashURL = "info";

    this.stage.addChild(this.questionBlock);

}


Info.prototype.update = function() {
    
}

Info.prototype.updateMoney = function() {
    console.log("Update account balance!");
    fetch('https://cloud.avner.us/index.php/s/kidGLOyro0YTh7Q/download',{compress: false})
      .then(function(res) {
          return res.json(); 
      })
      .then(function(json) {
          $('#money-balance').text(json.balance + " EUR");
      })
}

Info.prototype.getData = function() {
    return {
        name: "Info",
        description: []
    }
}


