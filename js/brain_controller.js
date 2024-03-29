"use strict"

module.exports = function(videoController) {
    return new BrainController(videoController)
}

module.exports.BrainController = BrainController;

var TWEEN = require('tween.js');
var eventEmitter = require('./event_manager').getEmitter();
var Vue = require('vue');
//var gui = new dat.GUI();

var self;

function BrainController(videoController) {
    if (!(this instanceof BrainController)) return new BrainController(videoController)

    this.videoController = videoController;
    this.works = [];

    console.log("Brain Controller started");

    self = this;
}

BrainController.prototype.localize = function (name, object) {

    console.log("GUI Localize object!", object);
    var folder = gui.addFolder(name);
    folder.add(object.position, 'x', -250, self.opts.stageWidth);
    folder.add(object.position, 'y', -250, self.opts.stageHeight);
    folder.add(object.scale, 'x', 0, 2);
    folder.add(object.scale, 'y', 0, 2);
    folder.open();
}


BrainController.prototype.init = function (opts, stage, ratio, renderer, workContainer, infoContainer, moneyContainer, navRow) {

    console.log("Brain Controller initializing with opts", opts);

    this.stage = stage;
    this.ratio = ratio; 
    this.opts = opts;
    this.workContainer = workContainer;
    this.infoContainer = infoContainer;
    this.moneyContainer = moneyContainer;
    this.navRow = navRow;

	this.bgContainer = new PIXI.DisplayObjectContainer();
    this.showingWork = false;
    this.showingInfo = false;
    this.showingMoney = false;

    this.renderer = renderer;

	stage.addChild(this.bgContainer);


	var bg = PIXI.Sprite.fromFrame("assets/brain/bg.jpg");
	this.bgContainer.addChild(bg);

	this.overlay = new PIXI.TilingSprite(PIXI.Texture.fromFrame("assets/brain/tile_neurons.png"), this.opts.stageWidth, this.opts.stageHeight / 2);
	this.overlay.alpha = 0.4;
    this.overlay.tilePosition.y = - 120;
	this.bgContainer.addChild(this.overlay);

	var displacementTexture = PIXI.Texture.fromFrame("assets/brain/displacement_map.png");
	this.displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
    this.displacementFilter.scale.x = 50;
    this.displacementFilter.scale.y = 50;


	this.twistFilter = new PIXI.TwistFilter();
    this.twistFilter.angle = 10; 
    this.twistFilter.radius = 0.5;
    this.twistFilter.offset.x = 0.5;
    this.twistFilter.offset.y = 0.25;

    this.updateMaskbyVideoSize(1);
    this.maskUpdated = true;

    this.bgContainer.visible = true;

    this.bgContainer.filters = [
       this.twistFilter
       //this.displacementFilter
    ];

    this.counter = 0;

    this.opts.util = {
        localize: this.localize
    }
    this.initWorks();
    this.initMusic();

    this.loaded = true;

    var self = this;

    eventEmitter.on('work_clicked', function(work) {
        self.workClicked(work);
    });

    eventEmitter.on('info_clicked', function() {
        self.infoClicked();
    });

    eventEmitter.on('money_clicked', function() {
        self.moneyClicked();
    });

    // Detect ESC
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
            if (self.showingWork) {
                self.hideWork();
            }
            if (self.showingInfo) {
                self.hideInfo();
            }
            if (self.showingMoney) {
                self.hideMoney();
            }
        }   
    });
}


BrainController.prototype.workClicked = function(work) {
    console.log("Work clicked!", work);
    this.vm.$data = work.getData();
    this.vm.$data.currentIndex = 0;
    $('#work-media').addClass('flexslider');
    var self = this;
    Vue.nextTick(function() {
        $('.magnify-image').magnificPopup({type:'image', closeOnContentClick: true});
    })
    this.currentWorkIndex = _.indexOf(this.works, work);
    window.location.hash = "#" + work.hashURL;
    this.showWork();
}


BrainController.prototype.showWork = function() {
    this.workContainer.css("height", "100%");
    this.workContainer.css("opacity", 1);
    this.navRow.css("height", "auto");
    this.showingWork = true;
}

BrainController.prototype.hideWork = function() {
    this.workContainer.css("opacity", 0);
    this.navRow.css("height", "0px");
    this.showingWork = false;
    history.replaceState({}, document.title, "/");
    
}
BrainController.prototype.nextWork = function() {
    console.log("NEXT WORK! Current Index", this.currentWorkIndex);
    this.currentWorkIndex++;
    if (this.currentWorkIndex > this.works.length -1) {
        this.currentWorkIndex = 0;
    }
    this.resetSlider();
    this.workClicked(this.works[this.currentWorkIndex]);
}

BrainController.prototype.resetSlider = function() {
/*    if($('#work-media').hasClass('flexslider')){
        console.log("Remove and destroy flexslider!!");
        $('#work-media').removeClass('flexslider')
            .flexslider('destroy');
    }*/
}

BrainController.prototype.prevWork = function() {
    console.log("PREV WORK!");
    this.currentWorkIndex--;
    if (this.currentWorkIndex < 0) {
        this.currentWorkIndex = this.works.length - 1;
    }
    this.resetSlider();
    this.workClicked(this.works[this.currentWorkIndex]);
}
BrainController.prototype.infoClicked = function() {
    console.log("Info clicked!");
    this.showInfo();
}
BrainController.prototype.moneyClicked = function() {
    console.log("Money clicked!");
    this.money.clicked();
    this.showMoney();
}
BrainController.prototype.showInfo = function() {
    this.infoContainer.css("height", "620px");
    this.infoContainer.css("opacity", 1);
    this.showingInfo = true;
}

BrainController.prototype.showMoney = function() {
    this.moneyContainer.css("height", "620px");
    this.moneyContainer.css("opacity", 1);
    this.showingMoney = true;
}

BrainController.prototype.hideInfo = function() {
    this.infoContainer.css("opacity", 0);
    this.showingInfo = false;
}
BrainController.prototype.hideMoney = function() {
    this.moneyContainer.css("opacity", 0);
    this.showingMoney = false;
}


BrainController.prototype.initWorks = function() {
    
    var self = this;

    this.vm = new Vue({
        el: '#main-container',
        data: {currentIndex: 0, description: ""},
        methods: {
            containerClick: function(e) {
                console.log("BOO");
                if (e.target == e.currentTarget) {
                    self.hideWork();
                }
            },
            closeWork: function(e) {
                self.hideWork();
            },
            closeInfo: function(e) {
                self.hideInfo();
            },
            closeMoney: function(e) {
                self.hideMoney();
            },
            prevWork: function(e) {
                self.prevWork();
            },
            nextWork: function(e) {
                self.nextWork();
            }
        }
    });

    $("#work-container").on($.support.transition.end,
    function() {
        if (self.workContainer.css("opacity") == 0) {
            self.workContainer.css("height", "0px");
            self.resetSlider();
        }
    });

    $("#info-container").on($.support.transition.end,
    function() {
        if (self.infoContainer.css("opacity") == 0) {
            self.infoContainer.css("height", "0px");
        }
    });
    $("#money-container").on($.support.transition.end,
    function() {
        if (self.moneyContainer.css("opacity") == 0) {
            self.moneyContainer.css("height", "0px");
        }
    });

    this.info = require('./works/info')();
    this.info.init(this.opts, this.bgContainer);

    this.money = require('./works/money')();
    this.money.init(this.opts, this.bgContainer, $("#money-container"));

    this.workHashes = {};

    this.works = [
        new (require('./works/pulse'))(),
        new (require('./works/gamad'))(),
        new (require('./works/train'))(),
        new (require('./works/koala'))(),
        new (require('./works/equala'))(),
        new (require('./works/peace'))(),
        new (require('./works/brain'))(),
        new (require('./works/security'))(),
        new (require('./works/wallsim'))(),
        new (require('./works/cantenna'))(),
        new (require('./works/japan'))(),
        new (require('./works/bass'))(),
        new (require('./works/biology'))(),
        new (require('./works/social_bonds'))(),
        new (require('./works/soft_robotics'))(),
        new (require('./works/stir'))(),
        new (require('./works/drone'))(),
        new (require('./works/playbot'))(),
        new (require('./works/tpv'))(),
        new (require('./works/tzina'))(),
        new (require('./works/freedom_cat'))(),
        new (require('./works/jewish_roots'))(),
        new (require('./works/moduland'))(),
        new (require('./works/marrow'))()
    ]


    for (var i = 0; i < this.works.length; i++) {
        var work = this.works[i];
        work.init(this.opts, this.bgContainer);
        this.workHashes[work.hashURL] = work;
    }
    this.workHashes["money"] = {};
    this.workHashes["info"] = {};
}


BrainController.prototype.initMusic = function() {
    var speaker = new PIXI.Sprite.fromFrame("assets/brain/speaker.png");
    speaker.anchor.x = 0.5;
    speaker.anchor.y = 0.5;
    speaker.position.x = 50;
    speaker.position.y = 691;
    speaker.scale = {x: 0.2, y: 0.2};

    speaker.buttonMode = true;
    speaker.setInteractive(true);
    speaker.visible = false;

    this.bgContainer.addChild(speaker);

    var nospeaker = new PIXI.Sprite.fromFrame("assets/brain/nospeaker.png");
    nospeaker.anchor.x = 0.5;
    nospeaker.anchor.y = 0.5;
    nospeaker.position.x = 50;
    nospeaker.position.y = 691;
    nospeaker.scale = {x: 0.2, y: 0.2};

    nospeaker.buttonMode = true;
    nospeaker.setInteractive(true);
    nospeaker.visible = true;

    this.bgContainer.addChild(nospeaker);

    this.speaker = speaker;
    this.nospeaker = nospeaker;

    var kerokero = new PIXI.Sprite.fromFrame("assets/brain/kerokero.jpg");
    kerokero.anchor.x = 0.5;
    kerokero.anchor.y = 0.5;
    kerokero.position.x = 120;
    kerokero.position.y = 693;
    kerokero.scale = {x: 0.35, y: 0.35};

    kerokero.buttonMode = true;
    kerokero.setInteractive(true);
    kerokero.visible = false;


    this.kerokero = kerokero;

    this.bgContainer.addChild(kerokero);

    this.speaker = speaker;
    this.nospeaker = nospeaker;
    var widgetIframe = document.getElementById('sc-widget');
    this.widget = SC.Widget(widgetIframe);
    this.soundsLength = 15;
    var self = this;
    this.firstPlay = true;
    speaker.click  = function(mouseData){
        self.widget.pause();
        self.speaker.visible = self.kerokero.visible = false;
        self.nospeaker.visible = true;
    }
    nospeaker.click  = function(mouseData){
        //self.widget.play();
        self.nospeaker.visible = false;
        self.speaker.visible = self.kerokero.visible = true;
        var index = MathUtil.rndIntRange(0, self.soundsLength - 1);
        console.log("Skip index", index);
        if (self.firstPlay) {
            self.firstPlay = false;
            self.widget.skip(index);
        }
        setTimeout(function() {
            self.widget.play();
        },0);
    }

    kerokero.click = function(mouseData) {
        window.open("https://soundcloud.com/kerokerobonito", "kerokerosc");
    }
}

BrainController.prototype.update = function () {
    if (this.loaded) {

        this.setMaskByOffset();

        this.counter += 0.1;
        this.overlay.tilePosition.x = this.counter * -3;
    
        this.works[7].update(); // Security
        this.works[8].update(); // WallSim
        this.works[23].update(); // Marrow
    }
}


BrainController.prototype.pageScroll = function (offset) {
    if (!this.opts) {
        return;
    }
    if (offset >= this.opts.scrollHeight - window.innerHeight) {
        this.spawnWork();
    }
}

BrainController.prototype.updateMaskbyVideoSize = function(multi) {
    var width = Math.min(window.innerWidth, this.opts.stageWidth * multi * 0.7);
    this.renderer.view.style.width = width + "px";
    this.renderer.view.style.marginLeft = (width / -2) + "px";
    var height = Math.min(window.innerHeight, this.opts.stageHeight * multi * 0.7);
    this.renderer.view.style.height = height + "px";
}

BrainController.prototype.setMaskByOffset = function() {
    var offset = window.pageYOffset;
    var currentFrame = this.videoController.VIDEOS.enter.frames.current;
    var multi = this.videoController.zoomMultiplyer;
    if (multi > 1) {
        this.maskUpdated = true;
        this.updateMaskbyVideoSize(multi);      
        this.setTwist(multi);
    } else if (this.maskUpdated) {
        this.updateMaskbyVideoSize(1);
        this.setTwist(1);
        this.maskUpdated = false;
    }
    if (multi < 7) {
        if(this.showingWork) {
            this.hideWork();
        }
        if (this.showingInfo) {
            this.hideInfo();
        }
        if (this.showingMoney) {
            this.hideMoney();
        }
    }
}


BrainController.prototype.setTwist = function(multi) {
    this.twistFilter.angle = Math.max(0,10 - multi  * 2 );
}
    


BrainController.prototype.spawnWork = function () {
    
}
