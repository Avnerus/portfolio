// VIDEO PART
//
var VideoController = require('./video_controller');
var Popper = require('./popper');
var videoContoller = new VideoController();
var eventEmitter = require('./event_manager').getEmitter();

window.onload = function() {
    window.scroll(0, 0);
    videoContoller.loadVideos($('#video-container'),$('#main-container').height());
}

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


var loader = new PIXI.AssetLoader(["assets/pops/amit.png"]);
loader.onComplete = function() {
    assetsLoaded = true;
    console.log("Assets loaded!");
    if (videosLoaded) {
        start();
    }
};
loader.load();


function start() {
   $('#loading-container').hide();
   videoContoller.playWaiting();
}

/*
function loop() {
    videoContoller.loop();
    requestAnimationFrame(loop);
}

loop();*/


// GAME PART

var gameOpts = {
    stageWidth: 1280,
    stageHeight: 720,
}
var stage = new PIXI.Stage(0xFFFFFF);
var popper = new Popper(stage, gameOpts);
var renderer = new PIXI.autoDetectRenderer(gameOpts.stageWidth, gameOpts.stageHeight, null, true);
document.body.appendChild(renderer.view);


function animate() {
    popper.update();
    renderer.render(stage);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
