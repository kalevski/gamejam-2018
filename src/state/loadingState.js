import Phaser from '../phaser';
import UserData from '../helper/userData';

class LoadingState extends Phaser.State {
    init() {
        this.background = this.game.add.sprite(0, 0, 'ui-loading-state-bg');
        
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ui-logo');
        this.logo.anchor.setTo(.5);
        
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.height - 50, "0%");
        this.progress.anchor.setTo(0.5);
        this.progress.font = 'Oswald';
        this.progress.fontSize = 60;
    }
  
    preload() {
        this.game.load.image('ui-customize-state-bg', 'assets/ui/customize-state-bg.jpg');
        this.game.load.image('ui-customize-play', 'assets/ui/customize-play.png');
        this.game.load.image('ui-customize-color', 'assets/ui/customize/color.png');
        this.game.load.image('ui-customize-body-0', 'assets/ui/customize/body-0.png');
        this.game.load.image('ui-customize-body-1', 'assets/ui/customize/body-1.png');
        this.game.load.image('ui-customize-body-2', 'assets/ui/customize/body-2.png');
        this.game.load.image('ui-customize-body-3', 'assets/ui/customize/body-3.png');
        this.game.load.image('ui-customize-head-0', 'assets/ui/customize/head-0.png');
        this.game.load.image('ui-customize-head-1', 'assets/ui/customize/head-1.png');
        this.game.load.image('ui-customize-head-2', 'assets/ui/customize/head-2.png');
        this.game.load.image('ui-customize-head-3', 'assets/ui/customize/head-3.png');

        this.game.load.image('ui-ability-0', 'assets/ui/ability/ability-0.png');
        this.game.load.image('ui-ability-1', 'assets/ui/ability/ability-1.png');
        this.game.load.image('ui-ability-2', 'assets/ui/ability/ability-2.png');
        this.game.load.image('ui-ability-3', 'assets/ui/ability/ability-3.png');
        this.game.load.image('ui-ability-counter', 'assets/ui/ability/counter.png');

        this.game.load.image('ui-lobby-state-bg', 'assets/ui/lobby-state-bg.jpg');
        this.game.load.image('ui-lobby-play', 'assets/ui/lobby-play.png');

        this.game.load.image('ui-action-bar-bg', 'assets/ui/action-bar-bg.png');
        this.game.load.image('ui-arena-grid', 'assets/ui/arena-grid.png');
        this.game.load.image('ui-pixel', 'assets/ui/pixel.png');

        this.game.load.image('ui-world-state-waiting-bg', 'assets/ui/world-state-waiting-bg.png');
        this.game.load.image('ui-world-0', 'assets/ui/world/world-0.jpg');
        this.game.load.image('ui-world-1', 'assets/ui/world/world-1.jpg');

        this.game.load.image('creature-body-0-core', 'assets/creature/body-0-core.png');
        this.game.load.image('creature-body-0-decorator', 'assets/creature/body-0-decorator.png');
        this.game.load.image('creature-body-1-core', 'assets/creature/body-1-core.png');
        this.game.load.image('creature-body-1-decorator', 'assets/creature/body-1-decorator.png');
        this.game.load.image('creature-body-2-core', 'assets/creature/body-2-core.png');
        this.game.load.image('creature-body-2-decorator', 'assets/creature/body-2-decorator.png');
        this.game.load.image('creature-body-3-core', 'assets/creature/body-3-core.png');
        this.game.load.image('creature-body-3-decorator', 'assets/creature/body-3-decorator.png');
        this.game.load.image('creature-head-0', 'assets/creature/head-0.png');
        this.game.load.image('creature-head-1', 'assets/creature/head-1.png');
        this.game.load.image('creature-head-2', 'assets/creature/head-2.png');
        this.game.load.image('creature-head-3', 'assets/creature/head-3.png');
        
        this.game.load.image('ui-object-antena', 'assets/ui/object/antena.png');
        this.game.load.image('ui-object-diamond', 'assets/ui/object/diamond.png');
        this.game.load.image('ui-object-mine', 'assets/ui/object/mine.png');
        this.game.load.image('ui-object-rock', 'assets/ui/object/rock.png');
        this.game.load.image('ui-object-trap', 'assets/ui/object/trap.png');


        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
    }

    fileComplete(progress) {
        this.progress.setText(progress + "%");
    }

    loadComplete() {
        var userData = UserData.getInstance();
        if (userData.built) {
            this.game.state.start('lobby');
        } else {
            this.game.state.start('customize');
        }   
    }

    shutdown() {
        this.background = null;
    }
  }
  
  export default LoadingState;
  