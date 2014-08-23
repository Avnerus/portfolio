
var VideoController = require('./video_controller');

var videoContoller = new VideoController();
var eventEmitter = require('./event_manager').getEmitter();

window.onload = function() {
    window.scroll(0, 0);
    videoContoller.loadVideos($('#video-container'),$('#main-container').height());
}

window.onscroll = function(event) {
    videoContoller.pageScroll(window.pageYOffset);
};

eventEmitter.on('videos_loaded', function() {
    $('#loading-container').hide();
    videoContoller.playWaiting();
});
