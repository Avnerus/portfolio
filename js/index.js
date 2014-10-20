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
}

// GAME PART

var TWEEN = require('tween.js');
var BrainController = require('./brain_controller');
var brainController = new BrainController(videoContoller);

var stage = new PIXI.Stage(0xFFFFFF, true);
var renderer = new PIXI.autoDetectRenderer(gameOpts.stageWidth, gameOpts.stageHeight, null, true);
//renderer.resize(window.innerWidth, window.innerHeight)
//renderer.view.style.width = window.innerWidth + "px";
//renderer.view.style.height = window.innerHeight + "px";

var container = new PIXI.DisplayObjectContainer();

var ratio = { x: window.innerWidth / gameOpts.stageWidth, y : window.innerHeight / gameOpts.stageHeight};
var wasScrolled = false;

stage.addChild(container);


window.onscroll = function(event) {
    brainController.pageScroll(window.pageYOffset);
    if (window.pageYOffset > 200 && !wasScrolled) {
        wasScrolled = true;
        hideDownArrow();
    }
}

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
    "assets/works/pulse.png",
    "assets/works/gamad.json",
    "assets/works/gamad2.json",
    "assets/works/train.png",
    "assets/works/question_block.png"
]);
loader.onComplete = function() {
    assetsLoaded = true;
    console.log("Assets loaded!");
    gameOpts.scrollHeight = $('#main-container').height();

    if (videosLoaded) {
       start();
    }
    videoContoller.loadVideos($('#video-container'), gameOpts.scrollHeight);
};
loader.load();


function start() {
   brainController.init(gameOpts, container, ratio, renderer, $('#work-container'), $('#info-container'));
   $('#loading-container').hide();
   videoContoller.playWaiting();
   $('#pixi-container').append(renderer.view);
   setTimeout(showDownArrow, 5000);

   requestAnimationFrame(animate);
}

function showDownArrow() {
    if (!wasScrolled) {
        $('#arrow-container').css('opacity', 1);
    }
}

function hideDownArrow() {
    console.log("Hide down arrow!");
    $('#arrow-container').hide();
}


function animate() {
    videoContoller.loop();
    brainController.update();
    renderer.render(stage);
    requestAnimationFrame(animate);
}
