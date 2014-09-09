"use strict"

module.exports = function(opts) {
    return new VideoController(opts)
}

module.exports.VideoController = VideoController;


function VideoController(opts) {
    if (!(this instanceof VideoController)) return new VideoController(opts)

    this.scrollHeight = opts.scrollHeight;
    this.zoomHeight = opts.zoomHeight;
    this.stageWidth = opts.stageWidth;
    this.stageHeight = opts.stageHeight;

    console.log("Video Controller started");
}

VideoController.prototype.loadVideos = function (container, scrollHeight) {

    this.VIDEOS = {
        waiting: { 
            'd': { paths : ['stubs/d.webm'] },
            'blink': {paths: ['stubs/blink.webm']},
            'e': {paths: [ 'stubs/e.webm' ]} 
        },
        enter: {
           // paths: ['stubs/hat.webm'], 
            frames: {
                path: 'stubs/hat',
                count: 138
            },
            duration: 6.76 
        }
    }

    this.eventEmitter = require('./event_manager').getEmitter();
    this.scrollHeight = scrollHeight;

    console.log("Preloading all videos into ", container , " scroll height: " + this.scrollHeight, " zoom height: " , this.zoomHeight);
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

    var self = this;

    if (video.frames) {
        console.log("Loading " + video.id + "(Regular video element)");
        video.frames.images = [];
        video.frames.loaded = 0;
        for (var i = 1; i <= video.frames.count; i++) {
            var image = new Image();
            image.src = "videos/" + video.frames.path + "/frame_" + MathUtil.pad(i,4) + ".jpg";
            console.log("Loading image: " + image.src);
            image.addEventListener("load",function(event) {self.videoFrameLoaded(event.target)}, false);
            image.name = video.id;
            video.frames.images.push(image);
        }
        // Place holder image
        var placeholderImage = new Image();
        placeholderImage.src ="images/blank.jpg";
        placeholderImage.id = video.id;
        placeholderImage.style.position = "relative";
        container.append(placeholderImage);
        video.element = placeholderImage;
        video.frames.current = 0;
    } else {
        console.log("Loading " + video.id + "(Regular video element)");
        var videoElement = document.createElement("VIDEO"); 
        videoElement.id = id;
        videoElement.style.display = "none";
        video.element = videoElement;

        for (var i = 0; i < video.paths.length; i++) {
            var sourceElement = document.createElement("SOURCE"); 
            sourceElement.src = 'videos/' + video.paths[i];
            videoElement.appendChild(sourceElement);
        }


        /*videoElement.oncanplaythrough = function(event) {
            self.videoCanPlayThrough(event.target);
        }*/

        videoElement.addEventListener("canplaythrough",function(event) {self.videoCanPlayThrough(event.target)}, false);
        videoElement.addEventListener("ended",function(event) {self.videoEnded(event.target)}, false);

        container.append(videoElement);
        videoElement.preload = "auto";
        videoElement.load();
    }
}

VideoController.prototype.videoFrameLoaded = function(image) {
    var video = this.VIDEOS[image.name];
    video.frames.loaded++;
    console.log("Video frame loaded!", image, "Now loaded " + video.frames.loaded + " images");
    if (video.frames.count == video.frames.loaded && !video.loaded) {
        video.loaded = true;
        this.checkLoaded();
    }
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
    console.log("Loaded metadata");
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

VideoController.prototype.loop = function() {
    if (!this.VIDEOS) {
        return;
    }
    var offset = window.pageYOffset;
    var zoomStart = this.scrollHeight - this.zoomHeight;

    if (offset > 0 && offset <= zoomStart) {
      
       this.zoomVideo(1);
       this.showVideoAt(this.VIDEOS.enter, (offset / zoomStart)); 
    } 
    else if (offset > zoomStart) {
        // Zoom
        var zoomMultiplyer = 1 + ((offset - zoomStart) / this.zoomHeight  * 7);
        this.zoomVideo(zoomMultiplyer);
    }
    else {
        if (this.nowPlaying && this.nowPlaying.id == this.VIDEOS.enter.id) {
            this.playRandomWaiting();
        }
    }
}

VideoController.prototype.zoomVideo = function(zoomMultiplyer) {
    var video = this.nowPlaying;
    video.element.style.height = this.stageHeight * zoomMultiplyer + "px";
    video.element.style.width  = this.stageWidth * zoomMultiplyer + "px";
    video.element.style.bottom = (-this.stageHeight / 2 + this.stageHeight * zoomMultiplyer / 2) + "px";
    video.element.style.right = (-this.stageWidth / 2 + this.stageWidth * zoomMultiplyer / 2) + "px";
}

VideoController.prototype.showVideoAt = function(video, offsetPercentage) {
    if (this.nowPlaying && this.nowPlaying.id != video.id) {
        this.hideVideo(this.nowPlaying);
        this.showVideo(video);
        this.nowPlaying = video;
    }
    var time;
    if (video.frames) {
        // It's a frames video - show the appropiate frame
        var frameNumber =  Math.min(Math.max( Math.round( offsetPercentage * video.frames.count), 1),video.frames.count);
        if (frameNumber != video.frames.current) {
            video.element.src = video.frames.images[frameNumber - 1].src;
            video.element.style.width = this.stageWidth;
            video.element.style.height = this.stageHeight;
            video.frames.current = frameNumber;
        }
    } else {
        // It's a real video - set currentTime
        time = offsetPercentage * this.VIDEOS.enter.duration;
        this.VIDEOS.enter.element.currentTime = time;
    }
}


VideoController.prototype.hideVideo = function (video) {
  video.element.style.display = "none";
}
VideoController.prototype.showVideo = function (video) {
  video.element.style.display = "block";  
}
