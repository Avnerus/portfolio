"use strict"

module.exports = function() {
    return new Tzina()
}

module.exports.Tzina = Tzina;

function Tzina() {
    if (!(this instanceof Tzina)) return new Tzina()

    this.loaded = false;
    console.log("Tzina work constructed");
}

Tzina.prototype.init = function (opts, stage, clickHandler) {

    console.log("Tzina work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "tzina";

    this.loadAnim("tzina", 116, 4);
}


Tzina.prototype.loadAnim = function(name, frames, skip) {
    var tzina_seq = [];
    for (var i = 0; i <= frames; i+=skip) {
        var num = MathUtil.pad(i,4);
        var texture = new PIXI.Texture.fromFrame(num + ".png");
        tzina_seq.push(texture);
    }
    console.log("Tzina seq", tzina_seq);
    var fountain = new PIXI.MovieClip(tzina_seq);
    fountain.anchor.x = 0.5;
    fountain.anchor.y = 0.5;
    fountain.position.x =  461;
    fountain.position.y = 307;
    fountain.scale = {x: 0.4, y: 0.5};
    fountain.loop = true;
    fountain.visible = true;
    fountain.animationSpeed = 0.15;

    fountain.buttonMode = true;
    fountain.setInteractive(true);


    var self = this;

    fountain.click  = function(mouseData){
      console.log("TZINA CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    fountain.play();
    this.stage.addChild(fountain);
    this.clickMe = fountain;

    //this.opts.util.localize("Tzina", fountain);
}
Tzina.prototype.update = function() {
    
}

Tzina.prototype.getData = function() {
    return {
        name: "Tzina",
        description:[ 
            {
                text: 'A gift-giving game traditionaly held in Israel during Purim holiday. In my gift I came up with a new way to share music - using a "Mixtape Game". Press Space-Bar along with the beat, to match the Hamman ears in their place - and crazy things start happening.',
                image: "images/works/gamadanak1.png",

            },
            {
                image: "images/works/gamadanak3.png"
            }
        ],
        links: [
            {
                url: "http://tzina.space",
                description: "View the experience"
            }
        ]
    }
}

