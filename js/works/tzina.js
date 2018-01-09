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
        name: "Tzina : Symphony of Longing",
        description:[ 
            {
                text: 'Tzina : Symphony of Longing is a WebVR documentary for the HTC Vive. I was the lead developer of this project, directed by Shirin Anlen. It premiered at IDFA Doclab of 2016 and was later on featured in plenty of other international festivals.',
                image: "images/works/Tzina_poster_docaviv_web4_670.jpg"
            },
            {
                text: 'In January 2017, Tzina Dizengoff square, one of Tel Aviv’s emblematic sites, was demolished. The square became a home for the lonely and marginalized characters of the area. This project tells the story of the people who gravitated toward the square and spent their days in it. In this interactive webVR documentary, they talk about their lives and the square. Together, they form a poetic musing on lost loves and things that have passed. TZINA invites you to physically explore the virtual square, combining elements of fantasy, while experiencing the square in different times of the day.',
                image: "images/works/Tzina-symphony-of-longing.jpg"
            },
            {
                youtube: "https://www.youtube.com/embed/tkLO9YHtnUo"
            }
        ],
        links: [
            {
                url: "http://tzina.space",
                description: "Launch the experience"
            }
        ]
    }
}

