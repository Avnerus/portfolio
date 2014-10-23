"use strict"

module.exports = function() {
    return new Koala()
}

module.exports.Koala = Koala;

function Koala() {
    if (!(this instanceof Koala)) return new Koala()

    this.loaded = false;
    console.log("Koala work constructed");
}

Koala.prototype.init = function (opts, stage, clickHandler) {

    console.log("Koala work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadAnimations();
}


Koala.prototype.loadAnimations = function(name, frames) {
    var frameSequence = [];

    // Walk left
    for (var i = 0; i < 12; i++) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaLeft" + num + ".png");
        frameSequence.push(texture);
    }
    this.walkLeft = new PIXI.MovieClip(frameSequence);
    this.walkLeft.anchor.x = 0.5;
    this.walkLeft.anchor.y = 0.5;
    this.walkLeft.position.x =  1100;
    this.walkLeft.position.y = 570;
    //dance.scale = {x: 0.25, y: 0.25};
    this.walkLeft.loop = true;
    this.walkLeft.animationSpeed = 0.25;

    this.walkLeft.buttonMode = true;
    this.walkLeft.setInteractive(true);

    this.walkLeft.play();


    var self = this;

    /*dance.click  = function(mouseData){
      console.log("GAMAD CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    dance.play();*/
    this.stage.addChild(this.walkLeft);
}
Koala.prototype.update = function() {
    
}

Koala.prototype.getData = function() {
    return {
        name: "Koala",
        description: "This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "
    }
}

