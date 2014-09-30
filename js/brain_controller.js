"use strict"

module.exports = function(videoController) {
    return new BrainController(videoController)
}

module.exports.BrainController = BrainController;

var WORKS = require('./works');
var TWEEN = require('tween.js');

function BrainController(videoController) {
    if (!(this instanceof BrainController)) return new BrainController(videoController)

    this.videoController = videoController;

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (opts, stage, ratio, renderer) {

    console.log("Brain Controller initializing with opts", opts);

    this.stage = stage;
    this.ratio = ratio; 
    this.opts = opts;

	this.bgContainer = new PIXI.DisplayObjectContainer();
    this.maskContainer = new PIXI.DisplayObjectContainer();
    this.maskContainer.addChild(this.bgContainer);

    this.renderer = renderer;

	stage.addChild(this.maskContainer);


	var bg = PIXI.Sprite.fromFrame("assets/brain/bg.jpg");
	this.bgContainer.addChild(bg);

	this.overlay = new PIXI.TilingSprite(PIXI.Texture.fromFrame("assets/brain/neurons_tile.png"), this.opts.stageWidth, this.opts.stageHeight);
	this.overlay.alpha = 0.1;
//	this.bgContainer.addChild(this.overlay);

	var displacementTexture = PIXI.Texture.fromFrame("assets/brain/displacement_map.png");
	this.displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;


	this.twistFilter = new PIXI.TwistFilter();
    this.twistFilter.angle = 10; 
    this.twistFilter.radius = 0.5;
    this.twistFilter.offset.x = 0.5;
    this.twistFilter.offset.y = 0.25;




    this.mask = new PIXI.Graphics();
    this.updateMaskbyVideoSize(1);
//    this.maskContainer.mask = this.mask;
    this.maskUpdated = true;

    this.bgContainer.visible = true;

    this.bgContainer.filters = [
       this.twistFilter
       //this.displacementFilter
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


BrainController.prototype.pageScroll = function (offset) {
    if (!this.opts) {
        return;
    }
    if (offset >= this.opts.scrollHeight - window.innerHeight) {
        this.spawnWork();
    }
}

BrainController.prototype.updateMaskbyVideoSize = function(multi) {
    var width = Math.min(window.innerWidth, this.opts.stageWidth * multi * 0.7);
    this.renderer.view.style.width = width + "px";
    this.renderer.view.style.marginLeft = (width / -2) + "px";
    var height = Math.min(window.innerHeight, this.opts.stageHeight * multi * 0.7);
    this.renderer.view.style.height = height + "px";
}

BrainController.prototype.setMaskByOffset = function() {
    var offset = window.pageYOffset;
    var currentFrame = this.videoController.VIDEOS.enter.frames.current;
    var multi = this.videoController.zoomMultiplyer;
    if (multi > 1) {
        this.maskUpdated = true;
        this.updateMaskbyVideoSize(multi);      
        this.setTwist(multi);
    } else if (this.maskUpdated) {
        this.updateMaskbyVideoSize(1);
        this.setTwist(1);
        this.maskUpdated = false;
    }
}


BrainController.prototype.setTwist = function(multi) {
    this.twistFilter.angle = Math.max(0,10 - multi  * 2 );
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
