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
    this.routine();
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
    this.walkLeft.position.x =  1200;
    this.walkLeft.position.y = 570;
    //dance.scale = {x: 0.25, y: 0.25};
    this.walkLeft.loop = true;
    this.walkLeft.animationSpeed = 0.25;

    this.walkLeft.buttonMode = true;
    this.walkLeft.setInteractive(true);
    
    // Turn from left to write
    frameSequence = [];
    for (var i = 5; i >= 0; i--) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaO2L" + num + ".png");
        frameSequence.push(texture);
    }
    for (var i = 0; i <= 5; i++) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaO2R" + num + ".png");
        frameSequence.push(texture);
    }
    this.turnRight = new PIXI.MovieClip(frameSequence);
    this.turnRight.anchor.x = 0.5;
    this.turnRight.anchor.y = 0.5;
    this.turnRight.position.x =  900;
    this.turnRight.position.y = 570;
    this.turnRight.animationSpeed = 0.25;
    this.turnRight.buttonMode = true;
    this.turnRight.setInteractive(true);
    this.turnRight.loop = false;
    
    frameSequence = [];
    // Walk right
    for (var i = 0; i < 12; i++) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaRight" + num + ".png");
        frameSequence.push(texture);
    }
    this.walkRight = new PIXI.MovieClip(frameSequence);
    this.walkRight.anchor.x = 0.5;
    this.walkRight.anchor.y = 0.5;
    this.walkRight.position.x =  900;
    this.walkRight.position.y = 570;
    this.walkRight.loop = true;
    this.walkRight.animationSpeed = 0.25;

    this.walkRight.buttonMode = true;
    this.walkRight.setInteractive(true);

    // Turn from right to left
    frameSequence = [];
    for (var i = 5; i >= 0; i--) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaO2R" + num + ".png");
        frameSequence.push(texture);
    }
    for (var i = 0; i <= 5; i++) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame("KoalaO2L" + num + ".png");
        frameSequence.push(texture);
    }
    this.turnLeft = new PIXI.MovieClip(frameSequence);
    this.turnLeft.anchor.x = 0.5;
    this.turnLeft.anchor.y = 0.5;
    this.turnLeft.position.x =  1200;
    this.turnLeft.position.y = 570;
    this.turnLeft.animationSpeed = 0.25;
    this.turnLeft.buttonMode = true;
    this.turnLeft.setInteractive(true);
    this.turnLeft.loop = false;


    this.walkLeft.click = this.turnRight.click = this.walkRight.click = this.turnLeft.click = function(mouseData){
      console.log("KOALA CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    var self = this;

}


Koala.prototype.routine = function() {
    var self = this;
    var t1 = new TimelineMax({repeat: -1});
    // Walk left
    t1.call(function() {
        self.stage.addChild(self.walkLeft);
        self.walkLeft.play();
    });
    t1.to(this.walkLeft.position, 5, {ease: Linear.easeNone, x:900});
    t1.call(function() {
        self.stage.removeChild(self.walkLeft);
        self.stage.addChild(self.turnRight);
        self.turnRight.gotoAndPlay(0);
    });
    t1.to(this.walkLeft.position, 1.5, {ease: Linear.easeNone}); // Do nothing for 1.5 seconds
    t1.call(function() {
        self.stage.removeChild(self.turnRight);        
        self.stage.addChild(self.walkRight);
        self.walkRight.play();
    });
    t1.to(this.walkRight.position, 5, {ease: Linear.easeNone, x:1200});
    t1.call(function() {
        self.stage.removeChild(self.walkRight);        
        self.stage.addChild(self.turnLeft);
        self.turnLeft.gotoAndPlay(0);
    });
    t1.to(this.walkRight.position, 1.5, {ease: Linear.easeNone}); // Do nothing for 1.5 seconds
    t1.call(function() {
       self.stage.removeChild(self.turnLeft); 
    });
}
Koala.prototype.update = function() {
    
}

Koala.prototype.getData = function() {
    return {
        name: "Koala",
        description: "This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project. This is a very nice project.  "
    }
}

