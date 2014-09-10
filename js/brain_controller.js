"use strict"

module.exports = function(opts) {
    return new BrainController(opts)
}

module.exports.BrainController = BrainController;

var WORKS = require('./works');


function BrainController(opts) {
    if (!(this instanceof BrainController)) return new BrainController(opts)

    this.opts = opts;

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (stage) {

    console.log("Brain Controller initializing");

    this.stage = stage;

	var bgContainer = new PIXI.DisplayObjectContainer();
	stage.addChild(bgContainer);


	var bg = PIXI.Sprite.fromFrame("assets/brain/bg.jpg");
	bgContainer.addChild(bg);

	this.overlay = new PIXI.TilingSprite(PIXI.Texture.fromFrame("assets/brain/tile_neurons.png"), this.opts.stageWidth, this.opts.stageHeight);
	this.overlay.alpha = 0.15;
	bgContainer.addChild(this.overlay);

	var displacementTexture = PIXI.Texture.fromFrame("assets/brain/displacement_map.png");
	this.displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;


	this.twistFilter = new PIXI.TwistFilter();
    this.twistFilter.angle = 5;
    this.twistFilter.radius = 0.5;
    this.twistFilter.offset.x = 0.5;
    this.twistFilter.offset.y = 0.5;

    bgContainer.filters = [this.twistFilter, this.displacementFilter];

    this.counter = 0;


    this.spawnWork();
}

BrainController.prototype.update = function () {
    this.counter += 0.1;
    this.overlay.tilePosition.x = this.counter * -5;
    this.overlay.tilePosition.y = this.counter * -5;
	this.displacementFilter.offset.x = this.counter * 10;
	this.displacementFilter.offset.y = this.counter * 10;
    this.pulse.rotation += 0.1;
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
    this.pulse = sprite;
    this.stage.addChild(sprite);

}
