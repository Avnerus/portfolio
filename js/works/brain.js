"use strict"

module.exports = function() {
    return new Brain()
}

module.exports.Brain = Brain;

function Brain() {
    if (!(this instanceof Brain)) return new Brain()

    this.loaded = false;
    console.log("Brain work constructed");
}

Brain.prototype.init = function (opts, stage, clickHandler) {

    console.log("Brain work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Brain.prototype.loadSprite = function() {
    var self = this;


    var face = new PIXI.Sprite.fromFrame("assets/works/face.png");
    face.anchor.x = 0.5;
    face.anchor.y = 0.5;
    face.position.x = 1185;
    face.position.y = 228;
    face.scale = {x: 0.5, y: 0.5};

    face.buttonMode = true;
    face.setInteractive(true);

    
    var cog = new PIXI.Sprite.fromFrame("assets/works/cog.png");
    cog.anchor.x = 0.5;
    cog.anchor.y = 0.5;
    cog.position.x = 30;
    cog.position.y = -12;
    cog.scale = {x: 0.9, y: 0.9};

    var cog2 = new PIXI.Sprite.fromFrame("assets/works/cog.png");
    cog2.anchor.x = 0.5;
    cog2.anchor.y = 0.5;
    cog2.position.x = -17;
    cog2.position.y = -33;
    cog2.scale = {x: 0.9, y: 0.9};

    TweenMax.to(cog , 3, {ease: Linear.easeNone, repeat: -1, rotation: MathUtil.toRadians(360)});
    TweenMax.to(cog2 , 3, {ease: Linear.easeNone, repeat: -1, rotation: MathUtil.toRadians(360)});

    face.click  = function(mouseData){
      console.log("Brain CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(face);
    face.addChild(cog);
    face.addChild(cog2);
}
Brain.prototype.update = function() {
    
}

Brain.prototype.getData = function() {
    return {
        name: "The Problem of Consciousness",
        description:  [ 
            {
                text: "In Tel Aviv university's \"Consciousness Studies\" course, we tried to solve 'the hard problem of consciousness'. In the picture: \"Mary's Room\" - a famous thought experiment by Frank Jacskson (1982).",
                image: "images/works/brain1.jpg",
            }
        ],
        links: [
            {
                url: "/docs/creation_of_meaning.pdf",
                description: "Creation of Meaning - From our Brain to Society: Final paper for Prof. Hiroshi Sakurai, Waseda University."
            },

        ]
    }
}

