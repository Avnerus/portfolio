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
            'blink': {path: 'stubs/blink.webm'},
            'e': {path: 'stubs/e.webm'} 
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
    video.element = videoElement;

    var self = this;

    videoElement.oncanplaythrough = function(event) {
        self.videoCanPlayThrough(event.target);
    }

    videoElement.onended = function(event) {
        self.videoEnded(event.target);
    }

    container.append(videoElement);

}

VideoController.prototype.videoCanPlayThrough = function(video) {
    if (!this.VIDEOS.waiting[video.id].loaded) {
        console.log("Video can play through!", video);
        this.VIDEOS.waiting[video.id].loaded = true;
        this.checkLoaded();
    }
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
    this.playRandomWaiting();

}

VideoController.prototype.playRandomWaiting = function() {
    var keys = Object.keys(this.VIDEOS.waiting);
    var index = Math.floor(Math.random() * (keys.length)); 
    var video = this.VIDEOS.waiting[keys[index]];
    console.log("Playing ", video);
    video.element.style.display = "block";
    video.element.play();
}

VideoController.prototype.videoEnded = function(video) {
   video.style.display = "none";
   this.playRandomWaiting();
}
