"use strict"

module.exports = function() {
    return new Stir()
}

module.exports.Stir = Stir;

function Stir() {
    if (!(this instanceof Stir)) return new Stir()

    this.loaded = false;
    console.log("Stir work constructed");
}

Stir.prototype.init = function (opts, stage, clickHandler) {

    console.log("Stir work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "stir";

    this.loadSprite();
}


Stir.prototype.loadSprite = function() {
    var self = this;


    var bed= new PIXI.Sprite.fromFrame("assets/works/bed.png");
    bed.anchor.x = 0.5;
    bed.anchor.y = 0.5;
    bed.position.x = 720;
    bed.position.y = 526;
    bed.scale = {x: 0.4, y: 0.4};

    bed.buttonMode = true;
    bed.setInteractive(true);

    bed.click  = function(mouseData){
      console.log("Stir CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(bed);

    //this.opts.util.localize("Bed", bed);

}
Stir.prototype.update = function() {
}

Stir.prototype.getData = function() {
    return {
        name: "Stir",
        description:  [ 
            {
                text: "Stir is a personalized wake-up service that brings people gently into the new day. It was co-created by Rebecca Lieberman and Julia Irwin. It is part of the 'Veryveryshort' project of the National Film Bord Canada and premiered on IDFA Doclab 2017.",
                image: "images/works/stir.png",
            }
        ],
        links: [
            {
                url: "http://stir.veryveryshort.com",
                description: "Launch the mobile app"
            },

        ]
    }
}

