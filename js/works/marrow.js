"use strict"

module.exports = function() {
    return new Marrow()
}

module.exports.Marrow = Marrow;

function Marrow() {
    if (!(this instanceof Marrow)) return new Marrow()

    this.loaded = false;
    console.log("Marrow work constructed");
}

Marrow.prototype.init = function (opts, stage, clickHandler) {

    console.log("Marrow work initializing with opts", opts);
    this.stage = stage;
    this.opts = opts;
    this.eventEmitter = require('../event_manager').getEmitter();

    this.hashURL = "marrow";


    this.pause = false;

    this.loadAnim("shadows", 47, 1);
}


Marrow.prototype.loadAnim = function(name, frames, skip) {
    var marrow_seq = [];
    for (var i = 0; i <= frames; i+=skip) {
        var num = MathUtil.pad(i,2);
        var texture = new PIXI.Texture.fromFrame('frame_' + num + "_delay-0.1s.png");
        marrow_seq.push(texture);
    }
    console.log("marrow seq", marrow_seq);
    var shadows = new PIXI.MovieClip(marrow_seq);
    shadows.anchor.x = 0.5;
    shadows.anchor.y = 0.5;
    shadows.position.x =  125;
    shadows.position.y = 565;
    shadows.scale = {x: 0.5, y: 0.5};
    shadows.loop = true;
    shadows.visible = true;
    shadows.animationSpeed = 0.5;

    shadows.buttonMode = true;
    shadows.setInteractive(true);

    this.shadows = shadows;


    var self = this;

    shadows.click  = function(mouseData){
      console.log("MARROW CLICK");
      self.eventEmitter.emit('work_clicked', self);
    }

    shadows.play();
    this.stage.addChild(shadows);
    this.clickMe = shadows;

}
Marrow.prototype.update = function() {
  if (this.shadows) {
    if (this.shadows.currentFrame > 0 && this.shadows.currentFrame < 47.0) {
      this.pause = false;
    }
    if (this.shadows.currentFrame == 47.0 && !this.pause) {
      this.pause = true;
      this.shadows.gotoAndStop(47.0);
      setTimeout(() => {
        this.shadows.animationSpeed = -0.5;
        this.shadows.play();
      },1000)
    }
    else if (this.shadows.currentFrame == 0 && !this.pause) {
      this.pause = true;
      this.shadows.stop();
      setTimeout(() => {
        this.shadows.animationSpeed = 0.5;
        this.shadows.play();
      },1000)
    }
  }
}

Marrow.prototype.getData = function() {
    return {
        name: "Marrow",
        description:[ 
            {
                text: 'If an AI could achieve the level of complexity required for mental states, could it also undergo mental illness? Marrow is an immersive, interactive installation, as well a machine-learning research project in collaboration with shirin anlen. Marrow highlights glitches found in machine learning models to reflect on the possibility of mental disorder in AI, and on the social constructs that lead to those glitches, offering new paths for social thinking. ',
                youtube: "https://www.youtube.com/embed/d-rOgniW26A"
            },
            {
                text: 'In September 2019, we started the development phase under the co-production of the National Film Board of Canada and Atlas V with: Philippe Lambert (sound design) and Paloma Dawkins (animations). Focusing on GAN models, we created an interactive experience in which the participants act in a family dinner scene while being linked, intervened and controlled by machine learning models that try to make sense of the concept of "family".',
                image: "images/works/marrow1_big.png",
                imageBig: "images/works/marrow1_big.png"
            },
            {
              text: 'In one of our most technologically rich and complex artistic achivements to date, we built an elborate real-time environment that orchestrated the collborative interplay of human and machine. The performance was accompanied by a wide range of software and hardware including: TouchDesigner, Unity3D, Raspberry Pis, speech recognition, a Python engine, GAN Text-to-image, Custom-trained StyleGAN, GauGAN, DeepLab object recognition, and AI voice cloning. All of those brought together into a 15 minute experience.',
                image: "images/works/marrow2.jpg",
                imageBig: "images/works/marrow2_big.jpg"
            }
        ],
        links: [
          {
              url: "https://shirin.works/Marrow-dev-phase-Machine-learning-immersive-theater-WIP",
              description: "Marrow @ shirin anlen."
          },
          {
              url: "https://www.nfb.ca/interactive/marrow/",
              description: "Marrow @ NFB."
          },
          {
              url: "https://atlasv.io/",
              description: "Atlas V."
          },
          {
              url: "https://www.facebook.com/philippel/",
              description: "Philippe Lambert (sound design)."
          },
          {
              url: "https://palomadawkins.com/",
              description: "Paloma Dawkins (animations)."
          },
          {
              url: "https://towardsdatascience.com/small-family-small-dataset-7f7db708f06d",
              description: "'Towards Data Science' post #1: Small family small dataset." 
          },
          {
              url: "https://towardsdatascience.com/a-tool-for-collaborating-over-gans-latent-space-b7ea92ad63d8",
              description: "'Towards Data Science' post #2: Collaborating over GAN's latent space."
          },
          {
              url: "https://towardsdatascience.com/a-tool-for-collaborating-over-gans-latent-space-b7ea92ad63d8",
              description: "'Towards Data Science' post #3: ‘Drawing’ the inner world of a story using GauGAN."
          }
        ]
    }
}

