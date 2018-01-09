"use strict"

module.exports = function() {
    return new FreedomCat()
}

module.exports.FreedomCat = FreedomCat;

function FreedomCat() {
    if (!(this instanceof FreedomCat)) return new FreedomCat()

    this.loaded = false;
    console.log("FreedomCat work constructed");
}

FreedomCat.prototype.init = function (opts, stage, clickHandler) {

    console.log("FreedomCat work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "freedom-cat";

    this.loadAnim("good-luck-cat", 2, 1);
}


FreedomCat.prototype.loadAnim = function(name, frames, skip) {
    var cat_seq = [];
    for (var i = 1; i <= frames; i+=skip) {
        var texture = new PIXI.Texture.fromFrame(name + "-" + i + ".png");
        cat_seq.push(texture);
    }
    var luckycat = new PIXI.MovieClip(cat_seq);
    luckycat.anchor.x = 0.5;
    luckycat.anchor.y = 0.5;
    luckycat.position.x =  735;
    luckycat.position.y = 600;
    luckycat.scale = {x: 0.4, y: 0.4};
    luckycat.loop = true;
    luckycat.visible = true;
    luckycat.animationSpeed = 0.1;

    luckycat.buttonMode = true;
    luckycat.setInteractive(true);


    var self = this;

    luckycat.click  = function(mouseData){
      console.log("Freedom cat CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    luckycat.play();
    this.stage.addChild(luckycat);
    this.clickMe = luckycat;

    //this.opts.util.localize("FreedomCat", luckycat);
}
FreedomCat.prototype.update = function() {
    
}

FreedomCat.prototype.getData = function() {
    return {
        name: "Freedom Cat",
        description:[ 
            {
                text: 'The Freedom Cat is a speculative design I made with my colleagues Soujanyaa Boruah and Yuzhou Wang. It aims to make the anonymous TOR network more accessible to any citizen of China by encapsulating it in a user friendly "Lucky Cat" design.',
                image: "images/works/freedom_cat_1.png",
                imageBig: "images/works/freedom_cat_1_big.png"
            },
            {
                text: 'The Cat is in fact a WiFi access point that connects you to the TOR network. Once your are connected, you can bypass the government censorship and remain anonymous.',
                image: "images/works/freedom_cat_2.png",
                imageBig: "images/works/freedom_cat_2_big.png"
            }
        ],
        links: [
            {
                url: "https://www.torproject.org/",
                description: "TOR Project"
            }
        ]
    }
}

