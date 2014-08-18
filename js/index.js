var VideoController = require('./video_controller');

var videoContoller = new VideoController();
var eventEmitter = require('./event_manager').getEmitter();

window.onload = function() {
    videoContoller.loadVideos($('#video-container'));
}

eventEmitter.on('videos_loaded', function() {
    $('#loading-container').hide();
    videoContoller.playWaiting();
});
