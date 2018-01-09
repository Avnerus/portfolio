"use strict"

module.exports = function() {
    return new JewishRoots()
}

module.exports.JewishRoots = JewishRoots;

function JewishRoots() {
    if (!(this instanceof JewishRoots)) return new JewishRoots()

    this.loaded = false;
    console.log("JewishRoots work constructed");
}

JewishRoots.prototype.init = function (opts, stage, clickHandler) {

    console.log("JewishRoots work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "jewish-roots";

    this.loadSprite();
}


JewishRoots.prototype.loadSprite = function() {
    var self = this;


    var rutabaga= new PIXI.Sprite.fromFrame("assets/works/rutabaga.png");
    rutabaga.anchor.x = 0.5;
    rutabaga.anchor.y = 0.5;
    rutabaga.position.x = 905;
    rutabaga.position.y = 396;
    rutabaga.scale = {x: 0.3, y: 0.3};

    rutabaga.buttonMode = true;
    rutabaga.setInteractive(true);

    rutabaga.click  = function(mouseData){
      console.log("JewishRoots CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(rutabaga);

    //this.opts.util.localize("JewishRoots", rutabaga);

}
JewishRoots.prototype.update = function() {
}

JewishRoots.prototype.getData = function() {
    return {
        name: "Jewish Roots (WIP)",
        description:  [ 
            {
                text: 'For this project I intend to extract my most "Jewish" genes, based on the research by Harry Ostrer, and inject them using gene splicing methods into the seeds of root vegetables. I will thus be able to grow my "Jewish Roots".',
                image: "images/works/rutabaga.png",
            },
            {
                image: "images/works/legacy.jpg",
            }
        ],
        links: [
            {
                url: "/docs/jewish_genes.txt",
                description: "Download the list of Jewish Genes"
            },

        ]
    }
}

