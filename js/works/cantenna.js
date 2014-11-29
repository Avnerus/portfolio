"use strict"

module.exports = function() {
    return new Cantenna()
}

module.exports.Cantenna = Cantenna;

function Cantenna() {
    if (!(this instanceof Cantenna)) return new Cantenna()

    this.loaded = false;
    console.log("Cantenna work constructed");
}

Cantenna.prototype.init = function (opts, stage, clickHandler) {

    console.log("Cantenna work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.loadSprite();
}


Cantenna.prototype.loadSprite = function() {
    var self = this;


    var tripod = new PIXI.Sprite.fromFrame("assets/works/tripod.png");
    tripod.anchor.x = 0.5;
    tripod.anchor.y = 0.5;
    tripod.position.x = 50;
    tripod.position.y = 355;
    tripod.rotation = MathUtil.toRadians(18);
    tripod.scale = {x: 0.3, y: 0.3};

    tripod.buttonMode = true;
    tripod.setInteractive(true);

    var can = new PIXI.Sprite.fromFrame("assets/works/can.png");
    can.anchor.x = 0.5;
    can.anchor.y = 0.5;
    can.position.x = 65;
    can.position.y = 285;
    can.rotation = MathUtil.toRadians(-115);
    can.scale = {x: 0.5, y: 0.5};

    can.buttonMode = true;
    can.setInteractive(true);

    TweenMax.to(can, 3, {ease: Linear.easeNone, repeat: -1, yoyo: true, rotation: MathUtil.toRadians(-90)});

    tripod.click  = can.click = function(mouseData){
      console.log("Cantenna CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    this.stage.addChild(tripod);
    this.stage.addChild(can);
}
Cantenna.prototype.update = function() {
    
}

Cantenna.prototype.getData = function() {
    return {
        name: "Cantenna Mesh",
        description: [
            'I started out my volunteer in ASSAF\'s refugee youth center as a computer teacher. Later on, I was introduced to the TAMI hackerspace and the "Arig" mesh project. The idea is simple and is used all around the world: use cheap home equipment such as personal WiFi routers and tin cans, to form a community based WiFi network, that does not rely on any corporate or government infrastrucure. I saw the need for such a network in the refugee community of south Tel Aviv, because they don\'t get support from our government and are genrally unable to own a 3G internet connection. I also saw this as a great educational opportunity for the kids in ASSAF.',
            "Together we hack our routers, drill out tin cans and make them into antennas, and then climb roofs to install them all over south Tel Aviv. Here we are testing the signal strength from one roof to the next."
        ],
        links: [
            {
                url: "http://telavivmakers.org/index.php/Main_Page",
                description: "TAMI - Tel Aviv Makers Hackerspace"
            },
            {
                url: "http://arig.org.il",
                description: "ARIG - Israeli Mesh Project"
            }
        ],
        images: [
            {type: "image", path: "images/works/cantenna1.jpg"},
            {type: "image", path: "images/works/cantenna2.jpg"}
        ],
    }
}

