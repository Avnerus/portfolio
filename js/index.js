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
    "assets/brain/speaker.png",
    "assets/brain/nospeaker.png",
    "assets/brain/kerokero.jpg",
    "assets/brain/tile_neurons.png",
    "assets/brain/displacement_map.png",
    //"assets/brain/talk_bubble.png",
    "assets/works/pulse.png",
    "assets/works/gamad.json",
    "assets/works/gamad2.json",
    "assets/works/train.png",
    "assets/works/question_block.png",
    "assets/works/Koala.json",
    "assets/works/headphones.png",
    "assets/works/lightning.png",
    "assets/works/lightning_f.png",
    "assets/works/dove.png",
    "assets/works/face.png",
    "assets/works/cog.png",
    "assets/works/keyhole.png",
    "assets/works/can.png",
    "assets/works/tripod.png",
    "assets/works/japan.png",
    "assets/works/bass.png",
    "assets/works/biology.png",
    "assets/works/bacteria.png"
]);

loader.onComplete = function() {
    assetsLoaded = true;
    console.log("Assets loaded!");
    gameOpts.scrollHeight = $('#main-container').height();

    if (videosLoaded) {
       start();
    }
    videoContoller.loadVideos($('#video-container'), gameOpts.scrollHeight, $('#neutral-container'));
};
loader.load();


function start() {
    brainController.init(gameOpts, container, ratio, renderer, $('#work-container'), $('#info-container'), $('#nav-row'));
    $('#loading-container').hide();
    videoContoller.playWaiting();
    renderer.view.id = "pixi-view";
    $('#pixi-container').append(renderer.view);
    setTimeout(showDownArrow, 5000);


    var FF = (typeof window.mozInnerScreenX != 'undefined');

    if (!FF) {
        parentScrollFix();
    }

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


function parentScrollFix() {
    // PARENT SCROLL FIX http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element
    $('.scrollable').on('DOMMouseScroll mousewheel', function(ev) {
        var $this = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = $this.height(),
            delta = ev.originalEvent.wheelDelta,
            up = delta > 0;

        var prevent = function() {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        }
        
        if (!up && -delta > scrollHeight - height - scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            $this.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
            // Scrolling up, but this will take us past the top.
            $this.scrollTop(0);
            return prevent();
        }
    });
}


