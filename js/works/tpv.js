"use strict"

module.exports = function() {
    return new TPV()
}

module.exports.TPV = TPV;

function TPV() {
    if (!(this instanceof TPV)) return new TPV()

    this.loaded = false;
    console.log("TPV work constructed");
}

TPV.prototype.init = function (opts, stage, clickHandler) {

    console.log("TPV work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "tpv";

    this.loadSprite();
}


TPV.prototype.loadSprite = function() {
    var self = this;


    var blackHole = new PIXI.Sprite.fromFrame("assets/works/black_hole.png");
    blackHole.anchor.x = 0.5;
    blackHole.anchor.y = 0.5;
    blackHole.position.x = 1085;
    blackHole.position.y = 490;
    blackHole.scale = {x: 0.7, y: 0.7};

    blackHole.buttonMode = true;
    blackHole.setInteractive(true);

    blackHole.click = function(mouseData){
      console.log("TPV CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(blackHole);
}
TPV.prototype.update = function() {
    
}

TPV.prototype.getData = function() {
    return {
        name: "Total Perspective Vortex",
        description: [
            {
                text: 'Admission project for Media Lab Helsinki - In my take on the Hitchiker\'s guide to the Galaxy Total Perspective Vortex, I try to visualize the Quantum Mechanical interpretation of the creation of the universe, as also suggested by Stephen Hawking. This interpretation sought to deal with the theological argument that claims there must be some kind of organizing force behind the starting conditions of the big bang, otherwise how did the universe evolve so perfectly? The proposed answer to that question is that there is in fact an infinite number of configurations for the physical structure of the universe, or an infinite number of universes - We just happen to be living and perceiving in one configuration that "worked".',
                image: "images/works/tpv.png",
                imageBig: "images/works/tpv_big.png"

            },
        ],
        links: [
            {
                url: "http://avnerus.github.io/tpv",
                description: "Enter the vortex (For Google Cardboard)"
            },
            {
                url: "https://github.com/Avnerus/mlabhelsinki",
                description: "View the source code"
            }
        ]
    }
}

