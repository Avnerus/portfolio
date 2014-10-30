"use strict"

module.exports = function() {
    return new Gamad()
}

module.exports.Gamad = Gamad;

function Gamad() {
    if (!(this instanceof Gamad)) return new Gamad()

    this.loaded = false;
    console.log("Gamad work constructed");
}

Gamad.prototype.init = function (opts, stage, clickHandler) {

    console.log("Gamad work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadAnim("gnome_dance", 23);
}


Gamad.prototype.loadAnim = function(name, frames) {
    var dance_seq = [];
    var gnome = this;
    for (var i = 1; i <= frames; i++) {
        var num = MathUtil.pad(i,4);
        var texture = new PIXI.Texture.fromFrame(name + num + ".png");
        dance_seq.push(texture);
    }
    var dance = new PIXI.MovieClip(dance_seq);
    dance.anchor.x = 0.5;
    dance.anchor.y = 0.5;
    dance.position.x =  700;
    dance.position.y = 392;
    dance.scale = {x: 0.25, y: 0.25};
    dance.loop = true;
    dance.visible = true;
    dance.animationSpeed = 0.5;



    dance.buttonMode = true;
    dance.setInteractive(true);


    var self = this;

    dance.click  = function(mouseData){
      console.log("GAMAD CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    dance.play();
    this.stage.addChild(dance);
    this.clickMe = dance;
}
Gamad.prototype.update = function() {
    
}

Gamad.prototype.getData = function() {
    return {
        name: "Gamad Anak",
        description: 'Hebrew for "Gnome-Giant": a gift-giving game traditionaly held in Israel during Purim holiday. In my gift I came up with a new way to share music - using a "Mixtape Game". Press Space-Bar along with the beat, to match the Hamman ears in their place - and crazy things start happening.'
    }
}

