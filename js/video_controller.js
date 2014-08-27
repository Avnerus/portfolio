"use strict"

module.exports = function(opts) {
    return new VideoController(opts)
}

module.exports.VideoController = VideoController;


function VideoController(opts) {
    if (!(this instanceof VideoController)) return new VideoController(opts)

    console.log("Video Controller started");
}

VideoController.prototype.loadVideos = function (container, scrollHeight) {

    this.VIDEOS = {
        waiting: { 
    //        'd': { path :'stubs/d.webm' },
      //      'blink': {path: 'stubs/blink.webm'},
        //    'e': {path: 'stubs/e.webm'} 
            'facebook' : {path: 'fun/facebook.webm'}
        },
        enter: {path: 'stubs/hat.webm', duration: 6.76 }
    }

    this.eventEmitter = require('./event_manager').getEmitter();

    this.scrollHeight = scrollHeight;

    console.log("Preloading all videos into ", container , " scroll height: " + scrollHeight);
    var keys = Object.keys(this.VIDEOS.waiting);

    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        this.loadVideo(id, this.VIDEOS.waiting[id], container);
    }
    this.loadVideo('enter', this.VIDEOS.enter, container);

    this.nowPlaying = null;
}

VideoController.prototype.loadVideo = function (id, video, container) {
    video.loaded = false;
    video.id = id;
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

    videoElement.onloadedmetadata = function(event) {
        self.videoLoadedMetadata(event.target);
    }

    container.append(videoElement);
    videoElement.preload = "auto";

}

VideoController.prototype.videoCanPlayThrough = function(video) {
    var videoData;
    if (video.id == 'enter') {
        videoData = this.VIDEOS.enter;
    } else {
        videoData = this.VIDEOS.waiting[video.id];
    }
    if (!videoData.loaded) {
        console.log("Video can play through!", video);
        videoData.loaded = true;
        this.checkLoaded();
    }
}


VideoController.prototype.videoLoadedMetadata = function(video) {
}

VideoController.prototype.checkLoaded = function() {
    var allLoaded = true;
    var keys = Object.keys(this.VIDEOS.waiting);

    for (var i = 0; i < keys.length && allLoaded; i++) {
        var id = keys[i];
        allLoaded = this.VIDEOS.waiting[id].loaded;
    }
    if (allLoaded && this.VIDEOS.enter.loaded) {
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

    //console.log("Playing ", video);
    
    if (this.nowPlaying && video.id != this.nowPlaying.id) {
        this.hideVideo(this.nowPlaying);
    }

    this.showVideo(video);
    video.element.play();

    this.nowPlaying = video;
}

VideoController.prototype.videoEnded = function(video) {
    if (this.nowPlaying.id != 'enter') {
        this.eventEmitter.emit('video_ended');
        this.playRandomWaiting();
    }
}

VideoController.prototype.pageScroll = function(offset) {
    if (!this.VIDEOS) {
        return;
    }
    if (offset > 0) {
       console.log(offset, "-->",(offset / this.scrollHeight) * this.VIDEOS.enter.duration)
       this.showEnterAt((offset / this.scrollHeight) * this.VIDEOS.enter.duration); 
    } 
    else {
        this.playRandomWaiting();
    }
}

VideoController.prototype.loop = function() {
    if (!this.VIDEOS) {
        return;
    }
    var offset = window.pageYOffset;
    if (offset > 0) {
       this.showEnterAt((offset / this.scrollHeight) * this.VIDEOS.enter.duration); 
    } 
    else {
        if (this.nowPlaying && this.nowPlaying.id == this.VIDEOS.enter.id) {
            this.playRandomWaiting();
        }
    }
}

VideoController.prototype.showEnterAt = function(time) {
    if (this.nowPlaying && this.nowPlaying.id != 'enter') {
        this.hideVideo(this.nowPlaying);
        this.showVideo(this.VIDEOS.enter);
        this.nowPlaying = this.VIDEOS.enter;
    }
    this.VIDEOS.enter.element.currentTime = time;
}


VideoController.prototype.hideVideo = function (video) {
  video.element.style.display = "none";
}
VideoController.prototype.showVideo = function (video) {
  video.element.style.display = "block";  
}
