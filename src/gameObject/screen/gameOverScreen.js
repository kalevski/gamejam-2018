import Phaser from '../../phaser';
import InfoText from '../infoText';

class GameOverScreen extends Phaser.Group {

    onExit = new Phaser.Signal();

    constructor(game, winner) {
        super(game, game.world, 'gameOverScreen');
        this.text = new InfoText(game, '', 60, true);
        if (winner) {
            this.text.text = "YOU WIN!";
        } else {
            this.text.text = "YOU LOSE!";
        }
        this.text.anchor.set(.5);
        this.text.position.set(game.world.centerX, game.world.centerY);
        setTimeout(() => {
            this.onExit.dispatch();
        }, 3000);
    }

    destroy() {
        super.destroy();
    }
}

export default GameOverScreen;