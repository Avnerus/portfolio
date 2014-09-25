var gameOpts = {
    stageWidth: 1280,
    stageHeight: 720,
    zoomHeight: 2500
}


// 
// VIDEO PART
//
var VideoController = require('./video_controller');
var videoContoller = new VideoController(gameOpts);
var eventEmitter = require('./event_manager').getEmitter();

window.onload = function() {
    window.scroll(0, 0);
    videoContoller.loadVideos($('#video-container'), $('#main-container').height());
}

// GAME PART

var TWEEN = require('tween.js');
var BrainController = require('./brain_controller');
var brainController = new BrainController(gameOpts, videoContoller);

var stage = new PIXI.Stage(0xFFFFFF);
var renderer = new PIXI.autoDetectRenderer(gameOpts.stageWidth, gameOpts.stageHeight, null, true);
//renderer.resize(window.innerWidth, window.innerHeight)
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";

var container = new PIXI.DisplayObjectContainer();

var ratio = { x: window.innerWidth / gameOpts.stageWidth, y : window.innerHeight / gameOpts.stageHeight};

stage.addChild(container);


/*window.onscroll = function(event) {
    videoContoller.pageScroll(window.pageYOffset);
};*/

var videosLoaded = false
var assetsLoaded = false;

eventEmitter.on('videos_loaded', function() {
    console.log("Videos loaded!");
    videosLoaded = true;
    if (assetsLoaded) {
        start();
    }

});


var loader = new PIXI.AssetLoader([
    "assets/brain/bg.jpg",
    "assets/brain/tile_neurons.png",
    "assets/brain/displacement_map.png",
    "works/pulse.png"
]);
loader.onComplete = function() {
    assetsLoaded = true;
    console.log("Assets loaded!");

    if (videosLoaded) {
        start();
    }
};
loader.load();


function start() {
   brainController.init(container, ratio);
   $('#loading-container').hide();
   $('#pixi-container').append(renderer.view);
   videoContoller.playWaiting();
   requestAnimationFrame(animate);
}


function animate() {
    brainController.update();
    TWEEN.update();
    videoContoller.loop();
    renderer.render(stage);
    requestAnimationFrame(animate);
}
