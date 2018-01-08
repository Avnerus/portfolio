"use strict"

module.exports = function() {
    return new SocialBonds()
}

module.exports.SocialBonds = SocialBonds;

function SocialBonds() {
    if (!(this instanceof SocialBonds)) return new SocialBonds()

    this.loaded = false;
    console.log("SocialBonds work constructed");
}

SocialBonds.prototype.init = function (opts, stage, clickHandler) {

    console.log("SocialBonds work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "social-bonds";

    this.loadSprite();
}


SocialBonds.prototype.loadSprite = function() {
    var self = this;


    var facebook= new PIXI.Sprite.fromFrame("assets/works/facebook.png");
    facebook.anchor.x = 0.5;
    facebook.anchor.y = 0.5;
    facebook.position.x = -136;
    facebook.position.y = -129;
    facebook.scale = {x: 1, y: 1};

    facebook.buttonMode = true;
    facebook.setInteractive(true);

    facebook.click  = function(mouseData){
      console.log("SocialBonds CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    var electrode = new PIXI.Sprite.fromFrame("assets/works/electrode.png");
    electrode.anchor.x = 0.5;
    electrode.anchor.y = 0.5;
    electrode.position.x = 1149;
    electrode.position.y = 176;
    electrode.scale = {x: 0.5, y: 0.5};

    this.stage.addChild(electrode);
    electrode.addChild(facebook);

        /*
    this.opts.util.localize("Electrode", electrode);
    this.opts.util.localize("Facebook", facebook);
    */
}
SocialBonds.prototype.update = function() {
}

SocialBonds.prototype.getData = function() {
    return {
        name: "Social Bonds",
        description:  [ 
            {
                text: "In Tel Aviv university's \"Consciousness Studies\" course, we tried to solve 'the hard problem of consciousness'. In the picture: \"Mary's Room\" - a famous thought experiment by Frank Jacskson (1982).",
                image: "images/works/brain1.jpg",
            }
        ],
        links: [
            {
                url: "http://socialbonds.org",
                description: "Social Bonds website"
            },

        ]
    }
}

