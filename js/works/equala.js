"use strict"

module.exports = function() {
    return new EQuala()
}

module.exports.EQuala = EQuala;

function EQuala() {
    if (!(this instanceof EQuala)) return new EQuala()

    this.loaded = false;
    console.log("EQuala work constructed");
}

EQuala.prototype.init = function (opts, stage, clickHandler) {

    console.log("EQuala work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


EQuala.prototype.loadSprite = function() {
    var self = this;
    var headphones = new PIXI.Sprite.fromFrame("assets/works/headphones.png");
    headphones.anchor.x = 0.5;
    headphones.anchor.y = 0.5;
    headphones.position.x =  455;
    headphones.position.y = 405;
    headphones.scale = {x: 0.5, y: 0.5};

    headphones.buttonMode = true;
    headphones.setInteractive(true);

    var lightning1 = new PIXI.Sprite.fromFrame("assets/works/lightning.png");
    lightning1.anchor.x = 0.5;
    lightning1.anchor.y = 0.5;
    lightning1.position.x =  605;
    lightning1.position.y = 380;
    lightning1.scale = {x: 0.25, y: 0.25};

    lightning1.buttonMode = true;
    lightning1.setInteractive(true);

    var lightning2 = new PIXI.Sprite.fromFrame("assets/works/lightning_f.png");
    lightning2.anchor.x = 0.5;
    lightning2.anchor.y = 0.5;
    lightning2.position.x = 323; 
    lightning2.position.y = 380;
    lightning2.scale = {x: 0.25, y: 0.25};

    lightning2.buttonMode = true;
    lightning2.setInteractive(true);

    TweenMax.to(lightning1.scale, 0.25, {repeat: -1, yoyo: true, x: 0.35, y: 0.35, ease:Power0.easeInOut});
    TweenMax.to(lightning2.scale, 0.25, {repeat: -1, yoyo: true, x: 0.35, y: 0.35, ease:Power0.easeInOut});
    
    headphones.click = lightning1.click = lightning2.click  = function(mouseData){
      console.log("EQuala CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(headphones);
    this.stage.addChild(lightning1);
    this.stage.addChild(lightning2);
}
EQuala.prototype.update = function() {
    
}

EQuala.prototype.getData = function() {
    return {
        name: "EQuala & Feature.FM",
        description: [
            {
                text: "The industry: Music. The crew: A group of lovely people carefully selected by Lior Aharoni, my old co-worker from the IDF.",
                image: "images/works/equala1.png",
                imageBig: "images/works/equala1_big.png"
            },
            {
                text: 'EQuala.fm is a social radio app. We collect your friends\' listening habits, and tune them into a radio station controlled by our "Friends EQualizer". I wrote the iOS client and was involved in the product design.',
                image: "images/works/equala2.png",
                imageBig: "images/works/equala2_big.png"
            },
            {
                text: 'In Feature.fm we work with online music streaming services who are looking for a way to monetize. Instead of playing ads, they play targeted featured songs from rising musicians, provided by us. To the artists, we provide analytics, management and a community. I wrote and designed a large part of the system, from the low database tier, to the server logic and the web client.',
                image: "images/works/equala3.png",
                imageBig: "images/works/equala3_big.png"
            }
        ],
        links: [
            {
                url: "https://www.equala.fm",
                description: "EQuala Official Page"
            },
            {
                url: "https://www.feature.fm",
                description: "Feature.FM Official Page"
            }
        ]
    }
}

