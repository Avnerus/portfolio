"use strict"

module.exports = function() {
    return new WallSim()
}

module.exports.WallSim = WallSim;

function WallSim() {
    if (!(this instanceof WallSim)) return new WallSim()

    this.loaded = false;
    console.log("WallSim work constructed");
}

WallSim.prototype.init = function (opts, stage, clickHandler) {

    console.log("WallSim work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "jewish-roots";

    this.frameCount = 0;
    this.reds = [];

    this.loadSprite();
}


WallSim.prototype.loadSprite = function() {
    var self = this;
    var container = new PIXI.DisplayObjectContainer();
    container.position.x = 1051;
    container.position.y = 585;

    this.matrix = [];
    for (var i = 0; i < 6; i++) {
        var row = [];
        for (var j = 0; j < 6; j++) {
            var cell = new PIXI.Graphics();
            this.drawRect(i, j, cell,0xabacad);
            row.push(cell);
            container.addChild(cell);
        }
        this.matrix.push(row);
    }
    container.buttonMode = true;
    container.setInteractive(true);
    container.hitArea = new PIXI.Rectangle(0,0,60, 60);

    container.click  = function(mouseData){
      console.log("WallSim CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }


    this.stage.addChild(container);;

    //this.opts.util.localize("WallSim", container);;
}

WallSim.prototype.drawRect = function(row, col, gfx, fill) {
    gfx.clear();
    gfx.beginFill(fill);
    gfx.lineStyle(1,0x000000);
    gfx.drawRect(col * 10, row * 10, 10, 10);
}

WallSim.prototype.update = function() {
    this.frameCount += 1;
    if (this.frameCount == 5) {
        this.frameCount = 0;
        if (this.reds.length == 3) {
            var old = this.reds.shift();
            this.drawRect(old.row, old.col, old.cell, 0xabacad);
        }
        var row = Math.floor(Math.random() * 6);
        var col =  Math.floor(Math.random() * 6);
        var cell = this.matrix[row][col];
        this.drawRect(row, col, cell, 0xFF0000);
        this.reds.push({row: row, col: col, cell: cell});
    }
}

WallSim.prototype.getData = function() {
    return {
        name: "Dynamics of the Israeli-Palestinian Separation Barrier – Greed and Violence",
        description:  [ 
            {
                text: 'A simulation that uses “Agent Based Modeling” - a computational model that is widely used in social studies research, to model the construction of the Israeli-Palestinian separation barrier that runs through the “Green Line”.',
                image: "images/works/wallsim.png"
            },
            {
                text: "A common criticism regarding the construction of the barrier is that it does not strictly address the security concerns of the region, and instead it is manipulated to claim new territory for the perceived future border between Israel and Palestine. The simulation models the behavior of Israeli settlers and Palestinian citizens on two sides of the border, and computes whether the level of “greediness” in the construction of the barrier, that is – the size of the area that is “reserved” to Israel when placing the wall, has any affect on the level of violence in the region.",
                vimeo: "https://player.vimeo.com/video/250362369?api=1&player_id=player_1"
            }
        ],
        links: [
            {
                url: "/docs/Final_Project_Separation_Barrier_Greed_And_Violence_Avner_Peled.pdf",
                description: "Result paper"
            }
        ]
    }
}

