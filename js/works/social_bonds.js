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
                text: "How would Facebook make use of emerging technologies that combine businesses with modern science?  It is widely known that Facebook is collecting and analyzing our online behavior in order to optimize the website’s experience, which in turn increases exposure to ads and generates profit. Corporate use of NeuroImaging devices enabled “Neuromarketing”, the measuring of our brain’s activity in response to ads and web content.",
                image: "images/works/social_bonds.png",
            },
            {
                text: "We therefore speculate on what’s happening behind closed doors at Facebook’s lab, with access to the latest brain imaging devices. Cooperating with ABL – Aalto’s Neuro-Behavioral Lab, we conducted an experiment, measuring a subject’s brain activity and eye tracking during a 45 minute long Facebook session. We then ran this data through a common algorithm that analyzes emotional regulation activity, namely LPP analysis.The result is a glimpse of a probable scenario, in which Facebook directly derives financial bonds from our emotional investment in social media.",
                vimeo: "https://player.vimeo.com/video/250355484?api=1&player_id=player_1"
            }
        ],
        links: [
            {
                url: "http://socialbonds.org",
                description: "Social Bonds website"
            },
            {
                url: "http://we-make-money-not-art.com/open-fields-big-and-small-data-reinvented-by-flies-weeds-and-kisses/",
                description: "RIXC Open Fields exhibition"
            },

        ]
    }
}

