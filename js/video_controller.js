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
    this.zoomMultiplyer = 1;
    this.previousZoomMultiplyer = 1;
    this.frameCounter = 0;

    console.log("Video Controller started", opts);

    this.FF = (typeof window.mozInnerScreenX != 'undefined');
    this.SAFARI = (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0);
}

VideoController.prototype.loadVideos = function (container, scrollHeight, neutralContainer) {

    this.container = container;
    this.neutralContainer = neutralContainer;

    this.VIDEOS = {
        waiting: { 
            'tired_blink': { paths : ['final/tired_blink.webm','final/tired_blink.mp4'] },
            'shrink_lip': {paths: ['final/shrink_lip.webm', 'final/shrink_lip.mp4']},
            'rollingEyes_openMouth': {paths: [ 'final/rollingEyes_openMouth.webm', 'final/rollingEyes_openMouth.mp4'  ]},
            'rollingEyes_blink': {paths: [ 'final/rollingEyes_blink.webm', 'final/rollingEyes_blink.mp4'  ]},
            'open_mouth': {paths: [ 'final/open_mouth.webm', 'final/open_mouth.mp4'  ]},
            'neutral': {paths: [ 'final/neutral.webm', 'final/neutral.mp4'  ]},
            //'blink02': {paths: [ 'final/blink02.webm', 'final/blink02.mp4'  ]},
            'blink01': {paths: [ 'final/blink01.webm', 'final/blink01.mp4'  ]}
        },
        enter: {
            frames: {
                path: 'final/enter',
                count: 43
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
        for (var i = 0; i < video.frames.count; i++) {
            var image = new Image();
            image.src = "./videos/" + video.frames.path + "/avner_bevel_" + MathUtil.pad(i + 268,5) + "-fs8.png";
            console.log("Loading image: " + image.src);
            image.addEventListener("load",function(event) {self.videoFrameLoaded(event.target)}, false);
            image.name = video.id + "_" + i;
            image.id = video.id + "_" + i;
            image.style.position = "fixed";
            if (this.FF) {
                image.style.left = "-75em";
                image.style.display = "block !important";
            } else {
                image.style.display = "none";
            }
            image.style.zIndex = 0;
            video.frames.images.push(image);
            container.parent().append(image);
        }


        // Place holder image
        var placeholderImage = new Image();
        //placeholderImage.src ="images/blank.jpg";
        placeholderImage.src = video.frames.images[0].src;
        placeholderImage.alt = "";
        placeholderImage.id = video.id;
        placeholderImage.name = video.id;
        placeholderImage.style.position = "relative";
        placeholderImage.style.display = "none";
//        placeholderImage.style.top = "0px";
  //      placeholderImage.style.bottom = "0px";
        container.append(placeholderImage);
        video.element = placeholderImage;
        video.frames.current = 0;
        video.rect = {
            width: this.stageWidth,
            height: this.stageHeight
        }
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


        videoElement.addEventListener("canplaythrough",function(event) {self.videoCanPlayThrough(event.target)}, false);
        videoElement.addEventListener("ended",function(event) {self.videoEnded(event.target)}, false);

        container.append(videoElement);
        videoElement.preload = "auto";
        videoElement.load();
    }
}

VideoController.prototype.videoFrameLoaded = function(image) {
    var video = this.VIDEOS.enter; //hack
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
        if (this.SAFARI) {
            this.neutralContainer.show();
        }
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
    if (video.loaded) {

        console.log("Playing ", video);
        
        this.showVideo(video);

        if (this.nowPlaying && video.id != this.nowPlaying.id) {
            this.hideVideo(this.nowPlaying);
        }

        video.element.pause();
        video.element.currentTime = 0;
        video.element.play();

        this.nowPlaying = video;
    }

}

VideoController.prototype.videoEnded = function(video) {
    console.log("Video ended!");
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
      
       this.zoomMultiplyer = 1;
       this.showVideoAt(this.VIDEOS.enter, (offset / zoomStart)); 
    } 
    else if (offset > zoomStart) {
        // Zoom
        this.zoomMultiplyer = 1 + ((offset - zoomStart) / this.zoomHeight  * 15);
    }
    else {
        if (this.SAFARI) {
            this.neutralContainer.show();
        }
        if (this.nowPlaying && this.nowPlaying.id == this.VIDEOS.enter.id) {
            this.playRandomWaiting();
        }
        this.zoomMultiplyer = 1;
        this.VIDEOS.enter.frames.current = 0;
    }
    if (this.zoomMultiplyer != this.previousZoomMultiplyer) {
        this.zoomVideo(this.zoomMultiplyer);
    }
    this.previousZoomMultiplyer = this.zoomMultiplyer;
}

VideoController.prototype.zoomVideo = function(zoomMultiplyer) {
    var video = this.nowPlaying;
    //console.log("Zoom : " + zoomMultiplyer);
    video.rect = {
        width: this.stageWidth * zoomMultiplyer ,
        height: this.stageHeight * zoomMultiplyer
    }
    if (zoomMultiplyer > 1) {
        video.rect.bottom = ((this.stageHeight / 2 - (this.stageHeight) * zoomMultiplyer / 2) + 15 *  zoomMultiplyer * zoomMultiplyer - 20);
        video.rect.left = (this.stageWidth / 2 - this.stageWidth * zoomMultiplyer / 2);
    } else {
        video.rect.bottom = 0;
        video.rect.left = 0;
    }

    video.element.style.height = video.rect.height + "px";
    video.element.style.width = video.rect.width + "px";
    video.element.style.left = video.rect.left + "px";
    video.element.style.bottom = video.rect.bottom + "px";

    if (zoomMultiplyer > 8) {
        this.container.css("display","none");
    } else {
        this.container.css("display","block");
    }
}

VideoController.prototype.showVideoAt = function(video, offsetPercentage) {
    this.container.css("height", "auto");
    if (this.nowPlaying && this.nowPlaying.id != video.id) {
        this.showVideo(video);
        this.hideVideo(this.nowPlaying);
        if (this.SAFARI) {
            this.neutralContainer.hide();
        }
        this.nowPlaying = video;
    }
    var time;
    if (video.frames) {
        // It's a frames video - show the appropiate frame
        var frameNumber =  Math.min(Math.max( Math.round( offsetPercentage * video.frames.count), 1),video.frames.count);
        if (frameNumber != video.frames.current && (!this.SAFARI || frameNumber >= 2)) {
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
