"use strict"

module.exports = function(opts) {
    return new BrainController(opts)
}

module.exports.BrainController = BrainController;


function BrainController(opts) {
    if (!(this instanceof BrainController)) return new BrainController(opts)

    this.opts = opts;

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (stage) {

    console.log("Brain Controller initializing");

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

    bgContainer.filters = [this.displacementFilter];

    this.counter = 0;
}

BrainController.prototype.update = function () {
    this.counter += 0.1;
    this.overlay.tilePosition.x = this.counter * -5;
    this.overlay.tilePosition.y = this.counter * -5;
	this.displacementFilter.offset.x = this.counter * 10;
	this.displacementFilter.offset.y = this.counter * 10;
}
