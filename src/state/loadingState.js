import Phaser from '../phaser';

class LoadingState extends Phaser.State {
    init() {
        this.background = this.game.add.sprite(0, 0, 'loader-background');
        
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'game-logo');
        this.logo.anchor.setTo(.5);
        
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.height - 50, "0%");
        this.progress.anchor.setTo(0.5);
        this.progress.font = 'Oswald';
        this.progress.fontSize = 60;
    }
  
    preload() {
        this.game.load.image('map-background', 'assets/background-map.jpg');
        this.game.load.image('creature-head-example', 'assets/creature/head-example.png');
        this.game.load.image('creature-head-example2', 'assets/creature/head-example2.png');
        this.game.load.image('creature-head-example3', 'assets/creature/head-example3.png');
        this.game.load.image('creature-body-example', 'assets/creature/body-example.png');
        this.game.load.image('creature-body-example2', 'assets/creature/body-example2.png');
        this.game.load.image('creature-body-example3', 'assets/creature/body-example3.png');
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
    }

    fileComplete(progress) {
        this.progress.setText(progress + "%");
    }

    loadComplete() {
        this.game.state.start('lobby');   
    }

    shutdown() {
        this.background = null;
    }
  }
  
  export default LoadingState;
  