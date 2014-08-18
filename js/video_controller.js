"use strict"

module.exports = function(opts) {
    return new VideoController(opts)
}

module.exports.VideoController = VideoController;


function VideoController(opts) {
    if (!(this instanceof VideoController)) return new VideoController(opts)

    console.log("Video Controller started");
}

VideoController.prototype.loadVideos = function (container) {

    this.VIDEOS = {
        waiting: { 
            'd': { path :'stubs/d.webm' },
            'blink': {path: 'stubs/blink.webm'} 
        }   
    }
    
    this.eventEmitter = require('./event_manager').getEmitter();


    console.log("Preloading all videos into ", container);
    var keys = Object.keys(this.VIDEOS.waiting);

    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        this.loadVideo(id, this.VIDEOS.waiting[id], container);
    }
}

VideoController.prototype.loadVideo = function (id, video, container) {
    video.loaded = false;
    console.log("Loading " + video.path);

    var videoElement = document.createElement("VIDEO"); 
    videoElement.src = 'videos/' + video.path;
    videoElement.id = id;
    videoElement.style.display = "none";

    var self = this;

    videoElement.oncanplaythrough = function(event) {
        console.log("Video can play through!", event.target);
        self.VIDEOS.waiting[event.target.id].loaded = true;
        self.checkLoaded();
    }

    container.append(videoElement);

}


VideoController.prototype.checkLoaded = function() {
    var allLoaded = true;
    var keys = Object.keys(this.VIDEOS.waiting);

    for (var i = 0; i < keys.length && allLoaded; i++) {
        var id = keys[i];
        allLoaded = this.VIDEOS.waiting[id].loaded;
    }
    if (allLoaded) {
        console.log("All videos are loaded!");
        this.eventEmitter.emit('videos_loaded');
    }
}

VideoController.prototype.playWaiting = function() {

}

