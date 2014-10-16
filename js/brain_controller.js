"use strict"

module.exports = function(videoController) {
    return new BrainController(videoController)
}

module.exports.BrainController = BrainController;

var TWEEN = require('tween.js');
var eventEmitter = require('./event_manager').getEmitter();
var Vue = require('vue');


function BrainController(videoController) {
    if (!(this instanceof BrainController)) return new BrainController(videoController)

    this.videoController = videoController;
    this.works = [];

    console.log("Brain Controller started");
}

BrainController.prototype.init = function (opts, stage, ratio, renderer, workContainer) {

    console.log("Brain Controller initializing with opts", opts);

    this.stage = stage;
    this.ratio = ratio; 
    this.opts = opts;
    this.workContainer = workContainer;

	this.bgContainer = new PIXI.DisplayObjectContainer();
    this.showingWork = false;

    this.renderer = renderer;

	stage.addChild(this.bgContainer);


	var bg = PIXI.Sprite.fromFrame("assets/brain/bg.jpg");
	this.bgContainer.addChild(bg);

	this.overlay = new PIXI.TilingSprite(PIXI.Texture.fromFrame("assets/brain/tile_neurons.png"), this.opts.stageWidth, this.opts.stageHeight / 2);
	this.overlay.alpha = 0.4;
    this.overlay.tilePosition.y = - 120;
	this.bgContainer.addChild(this.overlay);

	var displacementTexture = PIXI.Texture.fromFrame("assets/brain/displacement_map.png");
	this.displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;


	this.twistFilter = new PIXI.TwistFilter();
    this.twistFilter.angle = 10; 
    this.twistFilter.radius = 0.5;
    this.twistFilter.offset.x = 0.5;
    this.twistFilter.offset.y = 0.25;

    this.updateMaskbyVideoSize(1);
    this.maskUpdated = true;

    this.bgContainer.visible = true;

    this.bgContainer.filters = [
       this.twistFilter
       //this.displacementFilter
    ];

    this.counter = 0;


    this.initWorks();

    this.loaded = true;

    var self = this;

    eventEmitter.on('work_clicked', function(work) {
        self.workClicked(work);
    });
}


BrainController.prototype.workClicked = function(work) {
    console.log("Work clicked!", work);
    this.vm.$data = work.getData();
    this.showWork();
}


BrainController.prototype.showWork = function() {
    this.workContainer.css("height", "600px");
    this.workContainer.css("opacity", 1);
    this.showingWork = true;
}

BrainController.prototype.hideWork = function() {
    this.workContainer.css("opacity", 0);
    this.showingWork = false;
}

BrainController.prototype.initWorks = function() {
    
    var self = this;

    this.vm = new Vue({
        el: '#work-container',
        data: {},
        methods: {
            closeWork: function(e) {
                self.hideWork();
            }
        }
    });

    $("#work-container").on($.support.transition.end,
    function() {
        console.log("Transition done!", self.workContainer.css("opacity"))
        if (self.workContainer.css("opacity") == 0) {
            self.workContainer.css("height", "0px");
        }
    });

    this.works = [
        new (require('./works/pulse'))(),
        new (require('./works/gamad'))(),
        new (require('./works/train'))()
    ]

     $('.flexslider').flexslider();

    for (var i = 0; i < this.works.length; i++) {
        var work = this.works[i];
        work.init(this.opts, this.bgContainer, this.workClicked);
    }
}

BrainController.prototype.update = function () {
    if (this.loaded) {

        this.setMaskByOffset();

        this.counter += 0.1;
        this.overlay.tilePosition.x = this.counter * -3;
//        this.overlay.tilePosition.y = this.counter * -10;
    /*	this.displacementFilter.offset.x = this.counter * 10;
        this.displacementFilter.offset.y = this.counter * 10;*/

        for (var i = 0; i < this.works.length; i++) {
            var work = this.works[i];
            work.update();
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
    if (multi < 8 && this.showingWork) {
        this.hideWork();
    }
}


BrainController.prototype.setTwist = function(multi) {
    this.twistFilter.angle = Math.max(0,10 - multi  * 2 );
}
    


BrainController.prototype.spawnWork = function () {
    
}
