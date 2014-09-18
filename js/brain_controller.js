"use strict"

module.exports = function(opts, videoContoller) {
    return new BrainController(opts, videoContoller)
}

module.exports.BrainController = BrainController;

var WORKS = require('./works');
var TWEEN = require('tween.js');

function BrainController(opts, videoContoller) {
    if (!(this instanceof BrainController)) return new BrainController(opts, videoContoller)

    this.opts = opts;
    this.videoContoller = videoContoller;

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (stage, ratio) {

    console.log("Brain Controller initializing");

    this.stage = stage;
    this.ratio = ratio;

	this.bgContainer = new PIXI.DisplayObjectContainer();
    this.maskContainer = new PIXI.DisplayObjectContainer();
    this.maskContainer.addChild(this.bgContainer);

	stage.addChild(this.maskContainer);


	var bg = PIXI.Sprite.fromFrame("assets/brain/bg.jpg");
	this.bgContainer.addChild(bg);

	this.overlay = new PIXI.TilingSprite(PIXI.Texture.fromFrame("assets/brain/tile_neurons.png"), this.opts.stageWidth, this.opts.stageHeight);
	this.overlay.alpha = 0.15;
	this.bgContainer.addChild(this.overlay);

	var displacementTexture = PIXI.Texture.fromFrame("assets/brain/displacement_map.png");
	this.displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;


	this.twistFilter = new PIXI.TwistFilter();
    this.twistFilter.angle = 5;
    this.twistFilter.radius = 0.5;
    this.twistFilter.offset.x = 0.5;
    this.twistFilter.offset.y = 0.5;


    this.mask = new PIXI.Graphics();
    this.mask.cacheAsBitmap = true;
    this.mask.beginFill();
    this.mask.drawEllipse(606, 208, 70, 30);
    this.mask.endFill();


//    this.maskContainer.mask = this.mask;

    this.bgContainer.visible = false;

    this.bgContainer.filters = [
        this.twistFilter
     //   this.displacementFilter
    ];

    this.counter = 0;


    this.loaded = true;

    var self = this;
    setTimeout(function() {
///        self.spawnWork();
    },3000);
}

BrainController.prototype.update = function () {
    if (this.loaded) {


        this.setMaskByOffset();

        this.counter += 0.1;
        this.overlay.tilePosition.x = this.counter * -10;
        this.overlay.tilePosition.y = this.counter * -10;
    /*	this.displacementFilter.offset.x = this.counter * 10;
        this.displacementFilter.offset.y = this.counter * 10;*/
        if (this.spawningSprite) {
            this.spawningSprite.rotation += 0.1;
        }
    }
}

BrainController.prototype.setMaskByOffset = function() {
    var offset = window.pageYOffset;
    var currentFrame = this.videoContoller.VIDEOS.enter.frames.current;
    console.log(currentFrame)
    if (currentFrame == 0) {
        this.bgContainer.visible = false;
    } else {
        this.bgContainer.visible = true;
/*        var values = MASK_VALUES[currentFrame - 1];
        this.mask.clear();
        this.mask.beginFill();
        this.mask.drawEllipse(values[0] * 1/this.ratio.x, values[1] * 1 / this.ratio.y, values[2] * 1/this.ratio.x, values[3] * 1/this.ratio.y);
        this.mask.endFill();*/
    }
}


BrainController.prototype.spawnWork = function () {
    // Choose a work to spawn
    var work = WORKS[MathUtil.rndIntRange(0, WORKS.length -1)];
    console.log("Spawning work ", work)

    var sprite = PIXI.Sprite.fromFrame("works/" + work.image);
    sprite.position.x = this.opts.stageWidth / 2;
    sprite.position.y = this.opts.stageHeight / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;


    var spawnTween = new TWEEN.Tween(sprite.scale)
        .to({x:1, y: 1} , 7000)
        .easing(TWEEN.Easing.Cubic.InOut)

    spawnTween.onComplete(function() {
    });
    spawnTween.start();

    this.spawningSprite = sprite;

    this.stage.addChild(sprite);


}
