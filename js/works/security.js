"use strict"

module.exports = function() {
    return new Security()
}

module.exports.Security = Security;

function Security() {
    if (!(this instanceof Security)) return new Security()

    this.loaded = false;
    console.log("Security work constructed");
}

Security.prototype.init = function (opts, stage, clickHandler) {

    console.log("Security work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Security.prototype.loadSprite = function() {
    var self = this;


    var keyhole = new PIXI.Sprite.fromFrame("assets/works/keyhole.png");
    keyhole.anchor.x = 0.5;
    keyhole.anchor.y = 0.5;
    keyhole.position.x = 555;
    keyhole.position.y = 575;
    //keyhole.scale = {x: 0.5, y: 0.5};

    keyhole.buttonMode = true;
    keyhole.setInteractive(true);


    keyhole.click  = function(mouseData){
      console.log("Security CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.colorMatrix =
    [1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1];
    this.filter = new PIXI.ColorMatrixFilter();
    this.filter.matrix = this.colorMatrix;
    this.counter = 0;
    keyhole.filters = [this.filter];

    this.stage.addChild(keyhole);
}
Security.prototype.update = function() {
    this.counter += 0.01
    this.colorMatrix[3] = Math.min(0.8,Math.sin(this.counter * 2));
    this.colorMatrix[7] = Math.min(0.8,Math.sin(this.counter * 2));
    this.filter.matrix = this.colorMatrix;
}

Security.prototype.getData = function() {
    return {
        name: "IT Security",
        description:  [ 
            {
                text: "There is not much that I can disclose from 7 years of being a security researcher for the Israeli Army and government, but I know that \"hacking\", in the broad sense of the word, is a lifestyle that I will always maintain. Whether it\'s computers, the brain or life.",
                image: "images/works/security1.png",
            }
        ],
        links: [
            {
                url: "http://seclists.org/fulldisclosure/2005/Dec/659",
                description: "Another Checkpoint SecureClient NGX SCV Bypass - My report on Full-Disclosure mailing list"
            },

        ]
    }
}

