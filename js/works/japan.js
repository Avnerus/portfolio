"use strict"

module.exports = function() {
    return new Japan()
}

module.exports.Japan = Japan;

function Japan() {
    if (!(this instanceof Japan)) return new Japan()

    this.loaded = false;
    console.log("Japan work constructed");
}

Japan.prototype.init = function (opts, stage, clickHandler) {

    console.log("Japan work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "japan";

    this.loadSprite();
}


Japan.prototype.loadSprite = function() {
    var self = this;


    var japan = new PIXI.Sprite.fromFrame("assets/works/japan.png");
    japan.anchor.x = 0.5;
    japan.anchor.y = 0.5;
    japan.position.x = 905;
    japan.position.y = 300;
    japan.scale = {x: 0.4, y: 0.4};

    japan.buttonMode = true;
    japan.setInteractive(true);

    japan.click = function(mouseData){
      console.log("Japan CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(japan);
}
Japan.prototype.update = function() {
    
}

Japan.prototype.getData = function() {
    return {
        name: "Japan",
        description: [
            {
                text: "Japan has a place in my soul since early childhood. It started with Okinawa Goju Karate at the age of 12, moved on to being an anime otaku in highschool and at the age of 24, after being discharged from the army, I went on a 4 month cross country trip. 2.5 months of that trip were spent in Okinawa. I studied Karate with the Higaona Sensei, the Goju Ryu master and learned to play the Sanshin. I also went diving in the islands on weekends.",
                image: "images/works/japan1.jpg",
                imageBig: "images/works/japan1_big.jpg"

            },
            {
                text: "Finally in 2010 I was ready to see what is it like to actually live in Japan. I was accepted to a student exchange program in Waseda university and lived in Japan for a full year.",
                image: "images/works/japan2.jpg",
                imageBig: "images/works/japan2_big.jpg"

            },
            {
                text: "Now I can speak the language and Japan still resides in my mind. It is apparent in everying aspect of my life and character.",
                image: "images/works/japan3.jpg",
                imageBig: "images/works/japan3_big.jpg"

            },
            {
                youtube: "http://www.youtube.com/embed/7TrUsnLMt1k"
            }
        ],
        links: []
    }
}

