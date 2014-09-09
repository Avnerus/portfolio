var gameOpts = {
    stageWidth: 1280,
    stageHeight: 720,
    zoomHeight: 1500
}

gameOpts.scrollHeight = console.log(gameOpts);


// GAME PART


var BrainController = require('./brain_controller');
var brainController = new BrainController(gameOpts);

var gameOpts = {
    stageWidth: 1280,
    stageHeight: 720,
}
var stage = new PIXI.Stage(0xFFFFFF);
var renderer = new PIXI.autoDetectRenderer(gameOpts.stageWidth, gameOpts.stageHeight, null, true);
renderer.view.style.position = "absolute"
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
document.body.appendChild(renderer.view);


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
  "assets/brain/displacement_map.png"
]);
loader.onComplete = function() {
    assetsLoaded = true;
    console.log("Assets loaded!");

    brainController.init(stage);

    if (videosLoaded) {
        start();
    }
};
loader.load();


function start() {
   $('#loading-container').hide();
   videoContoller.playWaiting();
}


function animate() {
    brainController.update();
    videoContoller.loop();
    renderer.render(stage);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
