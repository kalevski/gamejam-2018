import Phaser from '../phaser';

class BootState extends Phaser.State {
    init() {

    }

    preload() {
      window.WebFontConfig = {
          ready: false,
          active: function () {
              this.ready = true;
          }, google: {families: ['Oswald']}
      };
      this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      this.game.load.image('ui-loading-state-bg', 'assets/ui/loading-state-bg.jpg');
      this.game.load.image('ui-logo', 'assets/ui/logo.png');
    }

    create() {
        this.game.time.advancedTiming = true;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(0, 0, 1640, 1080);
        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    }

    enterIncorrectOrientation() {

    }

    leaveIncorrectOrientation() {
        
    }

    update() {
        if (window.WebFontConfig.ready) {
            window.WebFontConfig.ready = false;
          this.game.state.start('loading');
        }
    }
}

export default BootState;